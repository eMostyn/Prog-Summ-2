function testStatus(){
  var nEvent = {Title: 1,
                Description: 2,
                Date: 3,
                Begins: 4,
                Ends: 5,
                Location: 6}
  //Convert object to a json string
  jsonObj = JSON.stringify(nEvent)
  //Create the options for the post method
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    //Specify the body as the JSON string just created
    body: jsonObj
  }
  //Send the post request to the specified address using the options from above
  fetch("http://127.0.0.1:8090/test",options)
  .then(function(response) {
    //If the response recieved from the server is ok
    if (response.ok) {
        console.log("beep")
    }
    if(response.status == 500){
      console.log("boop")
    }
  })
}
testStatus()
