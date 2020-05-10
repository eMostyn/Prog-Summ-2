function generateOptions () {
  // Get the elements representing the dropdowns that allow the user to select a player
  var selects = document.getElementsByClassName('playerSelect');
  // GET request to get the contents of the file holding the players
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
    data = body;
    // Convert the output to a JSON object
    obj = JSON.parse(data);
    var i;
    // For each of the selects on the screen
    for (i = 0; i < selects.length; i++) {
      // Set the variable to the current dropdown 'i'
      var dropdown = selects[i];
      // Clear all the options currently in the dropdown
      dropdown.innerHTML = '';
      // For each individual object (player) in obj
      for (object in obj) {
        // Create a new option
        var option = document.createElement('option');
        // Set the text of the option to the name of this object (name)
        option.text = obj[object].Name;
        // Add the option to the dropdown
        dropdown.add(option);
      }
      // Call these two functions to generate the apps/goals for the currently selected player on load
      getApps();
      getGoals();
    }
  });
}

function incrementApps () {
  // Get the appearances + button
  var button = document.getElementById('aplusButt');
  // Use the stepup method to increase the value in the appearances box by one
  document.getElementById('appsNum').stepUp();
}
function decrementApps () {
  // Get the appearances - button
  var button = document.getElementById('aminusButt');
  // Use the stepdown function to decrease the value in the appearances box by one
  document.getElementById('appsNum').stepDown();
}

function getApps () {
  // Get the value of the player select to obtain which player the find the appearances of.
  var toFind = document.getElementById('aPlayersSelect').value;
  // GET request to get the value of the player file
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
    var data = body;
    // Convert the output to a JSON object
    obj = JSON.parse(data);
    // For each individual object
    for (object in obj) {
      // If the name of the object is equal to the name we are trying to find
      if (obj[object].Name === toFind) {
        // Set the value of the appearances number box to the appearances of the object
        document.getElementById('appsNum').value = obj[object].Apps;
      }
    }
  });
}

function submitApps () {
  // Get the value of the select and appearances num box
  var name = document.getElementById('aPlayersSelect').value;
  var val = document.getElementById('appsNum').value;
  // Create a JSON to send the new data
  var toSend = {
Name: name,
                Apps: val
};
  // Convert that to a JSON string
  var jsonObj = JSON.stringify(toSend);
  // Create the options for the POST request
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: jsonObj
  };
  // POST request to update the appearances
  fetch('http://127.0.0.1:8090/amendApps', options)
  .catch((error) => alert('The server has disconnected.'))
  .then(function (response) {
    if (response.ok) {
      // IF the response is OK then alert the user that its been updated
      window.alert('Appearances Updated!');
      return response.text();
    }
    // If the response code is 403 then the action was forbidden
    if (response.status === 403) {
      window.alert('Enable Admin mode to edit appearances.');
    }
  });
}

function getGoals () {
  // Get the element of the goals players select
  var toFind = document.getElementById('gPlayersSelect').value;
  // Fetch request to get the contents of the player file
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
    var data = body;
    // Convert the data to a JSON object
    obj = JSON.parse(data);
    // For each individual object
    for (object in obj) {
      // If the name of the object is the one we're trying to find
      if (obj[object].Name === toFind) {
        // Set the value of the number box to that objects goal attribute
        document.getElementById('goalsNum').value = obj[object].Goals;
      }
    }
  });
}
function incrementGoals () {
  // Get the goals + button
  var button = document.getElementById('gplusButt');
  // Use the stepup method to increase the value in the goals box by one
  document.getElementById('goalsNum').stepUp();
}
function decrementGoals () {
  // Get the goals "-"" button
  var button = document.getElementById('gminusButt');
  // Use the stepup method to decrease the value in the goals box by one
  document.getElementById('goalsNum').stepDown();
}
function submitGoals () {
  // Get the elements of the player select and goals num box
  var name = document.getElementById('gPlayersSelect').value;
  var val = document.getElementById('goalsNum').value;
  // Create a JSON object to send that represents the name the player and the goals value
  var toSend = {
Name: name,
                Goals: val
};
  var jsonObj = JSON.stringify(toSend);
  // Create the options of the POST request
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: jsonObj
  };
  // Send the POST request to update the goals value
  fetch('http://127.0.0.1:8090/amendGoals', options)
  .catch((error) => alert('The server has disconnected.'))
  .then(function (response) {
    if (response.ok) {
      // If the response is okay then tell the user it was succefull
      window.alert('Goals Updated!');
      return response.text();
    }
    // If 403 is returned then the action was forbidden
    if (response.status === 403) {
      window.alert('Enable Admin mode to edit goals.');
    }
  });
}

function createRow (data) {
  // Get the table element as well as the table body
  var table = document.getElementById('playersTable');
  var tbody = document.getElementById('tbody');
  // Create new elements for the row as well as the data of each column
  var row = document.createElement('tr');
  var name = document.createElement('td');
  var apps = document.createElement('td');
  var goals = document.createElement('td');

  // Set the text to be the corresponding data
  name.innerHTML = data.Name;
  apps.innerHTML = data.Apps;
  goals.innerHTML = data.Goals;

  // Add the data to the row
  row.appendChild(name);
  row.appendChild(apps);
  row.appendChild(goals);

  // Add the row to the body
  tbody.appendChild(row);
  // Add the row to the overall table
  table.appendChild(tbody);
}

function readPlayers () {
  // GET request to obtain the contains of the person file
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
    var data = body;
    // Convert the output to a JSON object
    obj = JSON.parse(data);
    // For each individual object
    for (object in obj) {
      // Create a new row of the table to represent that player's stats
      createRow(obj[object]);
    }
  });
}
