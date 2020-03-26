function generateOptions(){
  var selects = document.getElementsByClassName("playerSelect")
  fetch("http://127.0.0.1:8090/readPerson")
  .then(function(response) {
    if (response.ok) {
      return response.text();
    }
    else {
      return "Failure to read file";
    }
  })

  .then(body =>{
    data = body;

    obj = JSON.parse(data)
    for(i in selects){
      var dropdown = selects[i]
      dropdown.innerHTML = "";
      for (object in obj){
        var option = document.createElement("option")
        option.text = obj[object].Name
        dropdown.add(option)
      }
      getApps();
    }

  })

}

function incrementApps(){
  var button = document.getElementById("aplusButt");
  document.getElementById("appsNum").stepUp();
}
function decrementApps(){
  var button = document.getElementById("aminusButt");
  document.getElementById("appsNum").stepDown();
}

function getApps(){
  var toFind = document.getElementById("aPlayersSelect").value;
  fetch("http://127.0.0.1:8090/readPerson")
  .then(function(response) {
    if (response.ok) {
      return response.text();
    }
    else {
      return "Failure to read file";
    }
  })

  .then(body =>{
    var data = body;
    obj = JSON.parse(data);
    for (object in obj){
      if(obj[object].Name == toFind){
        document.getElementById("appsNum").value = obj[object].Apps;
      }
    }
  })
}

function submitApps(){
  console.log("here")
  var name = document.getElementById("aPlayersSelect").value;
  var val = document.getElementById("appsNum").value;
  var toSend = {Name:name,
                Apps:val}
  var jsonObj = JSON.stringify(toSend);
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: jsonObj
  }
  fetch("http://127.0.0.1:8090/appendApps",options)
  .then(function(response) {
    if (response.ok) {
      window.alert("Appearances Updated!")
      return response.text();

    }
    if(response.statusCode = 403){
      window.alert("Enable Admin mode to edit appearances.")
    }
  })

}
