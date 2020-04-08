function addPlayer () {
  // Get the values of the form inputs
  var nameVal = document.getElementById('nameBox').value;
  var ageVal = document.getElementById('ageBox').value;
  var posVal = document.getElementById('posBox').value;
  var picVal = (document.getElementById('imgInput').value).toString();
  // Split the file path by \
  var splitPath = picVal.split('\\');
  // Take the 3rd portion of this split fileName which will be the filename
  var fileName = splitPath[2];
  // If name box has text in it
  if (nameVal !== '') {
    // Create a new person using the values from the form
    var nPerson = {
Name: nameVal,
                   Age: ageVal,
                   Position: posVal,
                   Picture: fileName,
                   Apps: 0,
                   Goals: 0
};
    // Convert the new person to a JSON string
    jsonObj = JSON.stringify(nPerson);
    // Set options for the POST request, setting the body to the new json string
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: jsonObj
    };
    // POST request to add the new person to the server
    fetch('http://127.0.0.1:8090/newPerson', options)
    .catch((error) => alert('The server has disconnected.'))
    .then(function (response) {
      if (response.ok) {
        // If the response is okay clear the form's input
        document.getElementById('nameBox').value = '';
        document.getElementById('ageBox').value = '';
        document.getElementById('posBox').value = '';
        document.getElementById('imgInput').value = '';
        // Generate new options for the dropdown
        generateOptions();
        return response.text();
      }
      // If the response from the server is 403 then the action is forbidden.
      if (response.status === 403) {
        window.alert('Enable Admin mode to add events.');
      }
  });
  }
  // If the name box was empty tell the user to enter a name
  else {
    window.alert('Please enter a valid name');
  }
}

function uploadFile () {
// Convert the data held in the form into FormData
 var formData = new FormData(document.querySelector('form'));
 console.log(formData);
 // Create the options for the POST request
 const options = {
   method: 'POST',
   body: formData
 };
 // POST request to send the image to the server
 fetch('http://127.0.0.1:8090/fileupload', options)
 .catch((error) => alert('The server has disconnected.'))
 .then(function (response) {
   if (response.ok) {
     return response.text();
   }
   // If the response from the server is 403 the action is forbidden
   if (response.status === 403) {
     window.alert('Enable Admin mode to add events.');
   }
 else {
     // If an error occurs report it
     return 'Error in adding new event';
   }
 });
}

function createPlayerProf (data) {
  // Find the player container where all the player profiles sit.
  var containerDiv = document.getElementById('playerContainerDiv');
  // Create a new div for this player
  var playerDiv = document.createElement('div');
  playerDiv.className = 'playerDiv';

  var innerDiv = document.createElement('div')
  innerDiv.className = "innerDiv"
  //Create an image div
  var imgDiv = document.createElement('div')
  imgDiv.className = 'imgDiv';
  // Create the image
  var image = document.createElement('img');
  // Set the source of the image to the filename held in the data
  image.src = data.Picture;
  // Add the image to the div
  imgDiv.appendChild(image);
 innerDiv.appendChild(imgDiv);

  var capDiv = document.createElement('div')
  capDiv.className = 'capDiv'

  // Create the name caption using span
  var nameCap = document.createElement('span');
  // Set the class name so css can be applied
  nameCap.className = 'caption';
  // Set the text of the caption to the name of the player
  nameCap.innerHTML = data.Name;
  // Add the caption to the div
  capDiv.appendChild(nameCap);

  // Create the age caption using span
  var ageCap = document.createElement('span');
  // Set the class name so css can be applied
  ageCap.className = 'caption';
  // Set the text of the caption to the age of the player
  ageCap.innerHTML = data.Age;
  // Add the caption to the div
  capDiv.appendChild(ageCap);

  // Create the position caption using span
  var positionCap = document.createElement('span');
  // Set the class name so css can be applied
  positionCap.className = 'caption';
  // Set the text of the caption to the position of the player
  positionCap.innerHTML = data.Position;
    // Add the caption to the div
  capDiv.appendChild(positionCap);


  innerDiv.appendChild(capDiv);

  playerDiv.appendChild(innerDiv);
  // Add this player to the overall container
  containerDiv.appendChild(playerDiv);

}

function readFile () {
  // GET request to get the contents of the file storing the players
  fetch('http://127.0.0.1:8090/readPerson')
  .catch((error) => alert('The server has disconnected.'))
  .then(function (response) {
    if (response.ok) {
      return response.text();
    }
 else {
      // If there is an error report it
      return 'Failure to read file';
    }
  })

  .then(body => {
    // Convert the output to a JSON object
    obj = JSON.parse(body);
    // For each individual object
    for (object in obj) {
      // Create a player profile for that object (player)
      createPlayerProf((obj[object]));

    }
    equalizeDivs();

  })
   .catch(() => {
     // Catch an error if one occurs
       console.error('Error');
   });

}

function generateOptions () {
  // Get the dropdown element that we will be setting the options for
  var dropdown = document.getElementById('deleteOptions');
  // Clear all existing options
  dropdown.innerHTML = '';
  // GET request to get the contents of the players file
  fetch('http://127.0.0.1:8090/readPerson')
  .catch((error) => alert('The server has disconnected.'))
  .then(function (response) {
    if (response.ok) {
      return response.text();
    }
 else {
      // If there is an error, report it
      return 'Failure to read file';
    }
  })

  .then(body => {
    data = body;
    // Convert the output to a JSON object
    obj = JSON.parse(data);
    // For each individual object
    for (object in obj) {
      // Create a new option
      var option = document.createElement('option');
      // Set the text to the name of this object (player)
      option.text = obj[object].Name;
      // Add the new option to the dropdown
      dropdown.add(option);
    }
  });
}

function deletePlayer () {
  // Get the select element
  var dropdown = document.getElementById('deleteOptions');
  // Find the name of the player to be removed
  toRemove = dropdown.value;
  // Convert this to a JSON object to be sent by the POST request
  toSend = { Name: toRemove };
  // Create the options for the POST request
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    // The body will be a JSON string representing the name of the player to be removed
    body: JSON.stringify(toSend)
  };
  // POST request to delete the player
  fetch('http://127.0.0.1:8090/delPlayer', options)
  .catch((error) => alert('The server has disconnected.'))
  .then(function (response) {
    if (response.ok) {
      // If the response is OK then regenerate the options of the dropdown so it doesnt include deleted player
      generateOptions();
      return response.text();
    }
    // If the reponse is 403 then the action is forbidden
    if (response.status === 403) {
      window.alert('Enable admin mode to delete players');
    }
 else {
      // If there is an error report it
      return 'Error in deleting player';
    }
  });
}

function equalizeDivs(){
  // var maxHeight = 0;
  // var divs = document.getElementsByClassName('playerDiv');
  // console.log(divs.length)
  // var i;
  // for(var i = 0; i< divs.length; i++){
  //   console.log(divs[i].offsetHeight)
  //   if (divs[i].offsetHeight  > maxHeight){
  //     console.log("Here")
  //     maxHeight = divs[i].offsetHeight ;
  //   }
  // }
  // console.log(maxHeight)
  // for(var i = 0; i< divs.length; i++){
  //   console.log("end")
  //   const height = maxHeight + "mm"
  //   console.log(height)
  //   divs[i].style.height = height;
  // }
  }
// window.addEventListener('resize', equalizeDivs());
