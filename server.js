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
  fs.appendFile('schedule.json', JSON.stringify(req.body)+"\r\n", (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log("Added new event to schedule")
});
  res.sendStatus(200)
})

app.get('/readEvents',function(req,res){
  res.send(scheduleJs);
})



app.listen(8090)
