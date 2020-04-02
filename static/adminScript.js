function setAdmin(){
  //Get the admin button element
  var adminButton = document.getElementById("adminButton");
  //GET request to obtain the current value of admin
  fetch("http://127.0.0.1:8090/getAdmin")
  .catch( (error) => alert("The server has disconnected."))
  .then(function(response) {
    if (response.ok) {
      return response.text();
    }
    else {
      //Return error if one occurs
      return "Failure to retrieve admin state";
    }
  })
  .then(body =>{
      //Check/Uncheck the button depending on the value of admin
      adminButton.checked = JSON.parse(body);
    })


}


function toggleAdmin(){
  //GET request to get the value of admin
  fetch("http://127.0.0.1:8090/getAdmin")
  .catch( (error) => alert("The server has disconnected."))
  .then(function(response) {
    if (response.ok) {
      return response.text();
    }
    else {
      //Report error if one occurs
      return "Failure to retrieve admin state";
    }
  })
  .then(body =>{
    //Get the value of admin from the response body
      var admin = JSON.parse(body);
      //If admin is currently true
      if (admin == true) {
        //Set it to false and alert the user
        admin = false
        window.alert("Admin mode off.")
      } else {
        //Set it to true and alert the user
        admin = true
        window.alert("Admin mode on.")
      }
      //Create a JSON holding the new value of admin
      adminObj = JSON.stringify({Admin: admin})
      console.log(adminObj)
      //Create options for POST request, setting body to new admin value
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: adminObj
      }
      //Send POST request to update admin value
      fetch("http://127.0.0.1:8090/adminToggle",options)
      .then(function(response) {
        if (response.ok) {
          return response.text();
        }
        else {
          //If an error occurs report it
          return "Error in updating admin value";
        }
      })
    })

}
