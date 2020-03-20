function setAdmin(){
  var adminButton = document.getElementById("adminButton");
  fetch("http://127.0.0.1:8090/getAdmin")
  .then(function(response) {
    if (response.ok) {
      return response.text();
    }
    else {
      return "Failure to retrieve admin state";
    }
  })
  .then(body =>{
      adminButton.checked = JSON.parse(body);
    })


}


function toggleAdmin(){
  fetch("http://127.0.0.1:8090/getAdmin")
  .then(function(response) {
    if (response.ok) {
      return response.text();
    }
    else {
      return "Failure to retrieve admin state";
    }
  })
  .then(body =>{
      var admin = JSON.parse(body);
      if (admin == true) {
        admin = false
        window.alert("Admin mode off.")
      } else {
        admin = true
        window.alert("Admin mode on.")
      }
      adminObj = JSON.stringify({Admin: admin})
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: adminObj
      }
      fetch("http://127.0.0.1:8090/adminToggle",options)
      .then(function(response) {
        if (response.ok) {
          return response.text();
        }
        else {
          return "Error in adding new event";
        }
      })
    })

}
