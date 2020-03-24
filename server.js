const express = require('express')
const app = express()
var scheduleJs = require('./schedule.json');
var fs = require("fs");
var FileReader = require('filereader')
app.use(express.static('static'));
var learnInfo = "Test"
var admin = false;
var formidable = require('formidable');
var squadJs = require('./squad.json');

app.get('/learnMore', function (req, res) {
  res.send(learnInfo)
})

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.post('/newEvent', function(req,res){
var data;
if(admin == true)
    {fs.readFile('./schedule.json', 'utf8', (err, jsonString) => {
      if (err) {
          console.log("Error reading file from disk:", err)
          return
      }
      items = []
      data = JSON.parse(jsonString)
      data.push((req.body))
      fs.writeFile('schedule.json', JSON.stringify(data), (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;
    })

    res.sendStatus(200)


      // success case, the file was saved
      console.log("Added new event to schedule")
    });}

else{
  res.sendStatus(403);
}
})

app.get('/readEvents',function(req,res){
  fs.readFile('./schedule.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("Error reading file from disk:", err)
        return
    }
    res.send(jsonString)
  })
})

app.post('/delEvent', function(req,res){
var data;
if (admin == true){
  fs.readFile('./schedule.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("Error reading file from disk:", err)
        return
    }
    data = JSON.parse(jsonString)
    var pos = data.indexOf(req.body)
    data.splice(pos,1)
    fs.writeFile('schedule.json', JSON.stringify(data), (err) => {
      // throws an error, you could also catch it here
      if (err) throw err;
})

  res.sendStatus(200)


    // success case, the file was saved
    console.log("Removed event from schedule")
});
}
else {
  res.sendStatus(304);
}
})

app.post('/adminToggle',function(req,res){
  admin = req.body.Admin
})

app.get('/getAdmin',function(req,res){
  console.log(admin)
  res.send(admin);
})

app.post('/newPerson', function(req,res){
  var data;
  if(admin == true)
      {fs.readFile('./squad.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("Error reading file from disk:", err)
            return
        }
        data = JSON.parse(jsonString)
        data.push((req.body))
        fs.writeFile('./squad.json', JSON.stringify(data), (err) => {
          // throws an error, you could also catch it here
          if (err) throw err;
      })

      res.sendStatus(200)


        // success case, the file was saved
        console.log("Added new player to squad")
      });}

  else{
    res.sendStatus(403);
  }
})

app.post('/fileupload',function(req,res){
  var form = new formidable.IncomingForm();
   form.parse(req, function (err, fields, files) {
     var oldpath = files.filetoupload.path;
     var newpath = './static/' + files.filetoupload.name;
     fs.rename(oldpath, newpath, function (err) {
       if (err) throw err;
       res.sendStatus(200);
     });
    console.log("Image Uploaded")
})
})

app.get('/readPerson',function(req,res){
  fs.readFile('./squad.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("Error reading file from disk:", err)
        return
    }
    res.send(jsonString)
  })
})

app.post('/delPlayer',function(req,res){
  if (admin == true){
    fs.readFile('./squad.json', 'utf8', (err, jsonString) => {
      if (err) {
          console.log("Error reading file from disk:", err)
          return
      }
      data = JSON.parse(jsonString)
      console.log(req.body)
      var pos;
      for (obj in data){
        if(data[obj].Name == req.body.Name){
          pos = obj;
          break;
        }
      }
      console.log(pos)
      data.splice(pos,1)
      fs.writeFile('squad.json', JSON.stringify(data), (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;
  })

    res.sendStatus(200)


      // success case, the file was saved
      console.log("Removed player from squad")
  });
  }
  else {
    res.sendStatus(304);
  }
})
app.listen(8090)
