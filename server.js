const express = require('express')
const app = express()
app.use(express.static('static'));

var learnInfo = "Test"
app.get('learnMore', function (req, res) {
  res.send(learnInfo)
})
app.listen(8090)
