function addPlayer(){
  var nameVal = document.getElementById("nameBox").value;
  var ageVal = document.getElementById("ageBox").value;
  var posVal = document.getElementById("posBox").value;
  var picVal = (document.getElementById("imgInput").value).toString();
  var splitPath = picVal.split('\\')
  var fileName = splitPath[2];
  if(nameVal != ""){
    var nPerson = {Name: nameVal,
                   Age: ageVal,
                   Position: posVal,
                   Picture: fileName}
    jsonObj = JSON.stringify(nPerson)
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: jsonObj
    }
    fetch("http://127.0.0.1:8090/newPerson",options)
    .then(function(response) {
      if (response.ok) {
        document.getElementById("nameBox").value = "";
        document.getElementById("ageBox").value = "";
        document.getElementById("posBox").value = "";
        document.getElementById("imgInput").value = "";
        generateOptions();
        return response.text();

      }
      if(response.text == 403){
        window.alert("Enable Admin mode to add events.")
      }
  })
  }
  else{
    window.alert("Please enter a valid title");
  }

  }
function uploadFile(){
 var formData = new FormData(document.querySelector('form'))
 const options = {
   method: 'POST',
   body: formData
 }
 fetch("http://127.0.0.1:8090/fileupload",options)
 .then(function(response) {
   if (response.ok) {
     return response.text();

   }
   if(response.text = 403){
     window.alert("Enable Admin mode to add events.")
   }
   else {
     return "Error in adding new event";
   }
 })
}

function createPlayerProf(data){
  var containerDiv = document.getElementById("playerContainerDiv")
  var playerDiv = document.createElement("div");
  playerDiv.className = "playerDiv"


  var image = document.createElement("img");
  image.src = data.Picture
  playerDiv.appendChild(image);

  var nameCap = document.createElement("span");
  nameCap.className = "caption"
  nameCap.innerHTML = data.Name;
  playerDiv.appendChild(nameCap);

  var ageCap = document.createElement("span");
  ageCap.className = "caption"
  ageCap.innerHTML = data.Age;
  playerDiv.appendChild(ageCap);

  var positionCap = document.createElement("span");
  positionCap.className = "caption"
  positionCap.innerHTML = data.Position;
  playerDiv.appendChild(positionCap);

  containerDiv.appendChild(playerDiv);
}

function readFile(){
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
    obj = JSON.parse(body)
    for (object in obj){
      createPlayerProf((obj[object]))
    }
  })
   .catch(() => {
       console.error("Error");

   })
}

function generateOptions(){
  var dropdown = document.getElementById("deleteOptions")
  dropdown.innerHTML = "";
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
    for (object in obj){
      var option = document.createElement("option")
      option.text = obj[object].Name
      dropdown.add(option)
    }
  })
}

function deletePlayer(){
  var dropdown = document.getElementById("deleteOptions")
  toRemove = dropdown.value;
  toSend = {Name: toRemove};
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toSend)
  }
  fetch("http://127.0.0.1:8090/delPlayer",options)
  .then(function(response) {
    if (response.ok) {
      return response.text();
    }
    if(response.text = 304){
      window.alert("Enable admin mode to delete players")
    }
    else {
      return "Error in adding new event";
    }
  })

}
