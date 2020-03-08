const express = require('express')
const app = express()
app.use(express.static('static'));

var learnInfo = "Test"
app.get('/learnMore', function (req, res) {
  res.send(learnInfo)
})

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/newEvent$', function(req,res){
  console.log("test")
})
app.listen(8090)
