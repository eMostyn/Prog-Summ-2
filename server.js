const express = require('express')
const app = express()
var scheduleJs = require('./schedule.json');
var fs = require("fs");
var FileReader = require('filereader')
app.use(express.static('static'));
var learnInfo = "Test"
app.get('/learnMore', function (req, res) {
  res.send(learnInfo)
})

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.post('/newEvent', function(req,res){
var data;
  fs.readFile('./schedule.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("Error reading file from disk:", err)
        return
    }
    items = []
    data = JSON.parse(jsonString)
    console.log(data)
    data.push((req.body))
    console.log(data)
    fs.writeFile('schedule.json', JSON.stringify(data), (err) => {
      // throws an error, you could also catch it here
      if (err) throw err;
})

  res.sendStatus(200)


    // success case, the file was saved
    console.log("Added new event to schedule")
});
})

app.get('/readEvents',function(req,res){
  res.send('./schedule.json');
})



app.listen(8090)
