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
    var i;
    for (i = 0; i < selects.length; i++) {
      var dropdown = selects[i]
      dropdown.innerHTML = "";
      for (object in obj){
        var option = document.createElement("option")
        option.text = obj[object].Name
        dropdown.add(option)
      }
      getApps();
      getGoals();
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

function getGoals(){
  var toFind = document.getElementById("gPlayersSelect").value;
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
        document.getElementById("goalsNum").value = obj[object].Goals;
      }
    }
  })
}
function incrementGoals(){
  var button = document.getElementById("gplusButt");
  document.getElementById("goalsNum").stepUp();
}
function decrementGoals(){
  var button = document.getElementById("gminusButt");
  document.getElementById("goalsNum").stepDown();
}
function submitGoals(){
  var name = document.getElementById("gPlayersSelect").value;
  var val = document.getElementById("goalsNum").value;
  var toSend = {Name:name,
                Goals:val}
  var jsonObj = JSON.stringify(toSend);
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: jsonObj
  }
  fetch("http://127.0.0.1:8090/appendGoals",options)
  .then(function(response) {
    if (response.ok) {
      window.alert("Goals Updated!")
      return response.text();

    }
    if(response.statusCode = 403){
      window.alert("Enable Admin mode to edit goals.")
    }
  })

}

function createRow(data){
  console.log("here")
  var table = document.getElementById("playersTable");
  var tbody = document.getElementById("tbody")
  var row = document.createElement('tr');
  var name = document.createElement('td');
  var apps = document.createElement('td');
  var goals = document.createElement('td');

  name.innerHTML = data.Name;
  apps.innerHTML = data.Apps;
  goals.innerHTML = data.Goals;

  row.appendChild(name);
  row.appendChild(apps);
  row.appendChild(goals);

  tbody.appendChild(row)
  table.appendChild(tbody);
}

function readPlayers(){
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
      createRow(obj[object])
    }

  })
}
