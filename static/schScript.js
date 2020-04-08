function addEvent () {
  // Get the values of the form's boxes
  var titleVal = document.getElementById('titleBox').value;
  var descVal = document.getElementById('desc').value;
  var dateVal = document.getElementById('date').value;
  var beginsVal = document.getElementById('Begins').value;
  var endsVal = document.getElementById('Ends').value;
  var locationVal = document.getElementById('location').value;
  // If title is not empty
  if (titleVal !== '') {
    // Create the new event using the specified values
    var nEvent = {
Title: titleVal,
                  Description: descVal,
                  Date: dateVal,
                  Begins: beginsVal,
                  Ends: endsVal,
                  Location: locationVal
};
    // Convert object to a json string
    jsonObj = JSON.stringify(nEvent);
    // Create the options for the post method
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // Specify the body as the JSON string just created
      body: jsonObj
    };
    // Send the post request to the specified address using the options from above
    fetch('http://127.0.0.1:8090/newEvent', options)
    .catch((error) => alert('The server has disconnected.'))
    .then(function (response) {
      // If the response recieved from the server is ok
      if (response.ok) {
        // Clear the values of the form
        document.getElementById('titleBox').value = '';
        document.getElementById('desc').value = '';
        document.getElementById('date').value = '';
        document.getElementById('Begins').value = '';
        document.getElementById('Ends').value = '';
        document.getElementById('location').value = '';
        // Regenerate the dropdowns options so the new event is included
        generateOptions();
        return response.text();
      }
      // If the reponse code returned is 403
      if (response.status === 403) {
        // Alert the user to the issue
        window.alert('Enable Admin mode to add events.');
      }
 else if (response.status === 404) {
        window.alert('Server has turned off');
      }
 else {
        // If the code is not 403 then another error has occurred
        return 'Error in adding new event';
      }
    });
  }
  // Else the title box is empty so alert the user to that
  else {
    window.alert('Please enter a valid title');
  }
}
function createEventView (object) {
  // Get the overall schedule container
  var scheduleContainer = document.getElementById('scheduleContainer');
  // Create a new date using the value of the object passed
  var eventDate = new Date(object.Date);
  // Create a new div for this event
  var scheduleDiv = document.createElement('div');
  // Set the id of the div to a combination of the title and date
  scheduleDiv.id = object.Title + object.Date;
  // Create a link and relate the stylesheet
  var link = document.createElement('link');
  link.href = '//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css';
  link.rel = 'stylesheet';
  // Append the link to the div
  scheduleDiv.appendChild(link);

  // Create the container setting the class name
  var container = document.createElement('div');
  container.className = 'container';

  // Create the row div and set the class name
  var row = document.createElement('div');
  row.className = 'row row-striped';

  // Create the column div and set the class name
  var col = document.createElement('div');
  col.className = 'col-2 text-right';

  // Create the event title, setting the class name so the css works as intended
  var h1 = document.createElement('h1');
  h1.className = 'display-4';

  // Create the span, setting the class so the css works
  var span = document.createElement('span');
  span.className = 'badge badge-secondary';
  // Set the contents to the date value of the date
  span.innerHTML = eventDate.getDate();
  // Add the span to the title
  h1.appendChild(span);
  // Add the title to the column div
  col.appendChild(h1);

  // Create the h2 title
  var h2 = document.createElement('h2');
  // Create an array representing each month
  var month = [];
  month[0] = 'Jan';
  month[1] = 'Feb';
  month[2] = 'Mar';
  month[3] = 'Apr';
  month[4] = 'May';
  month[5] = 'Jun';
  month[6] = 'Jul';
  month[7] = 'Aug';
  month[8] = 'Sept';
  month[9] = 'Oct';
  month[10] = 'Nov';
  month[11] = 'Dec';
  // Set the value of the h2 title to the month of the data
  h2.innerHTML = month[eventDate.getMonth()];
  // Add this month to the column div
  col.appendChild(h2);

  // Add the column to the row div
  row.appendChild(col);
  // Create the center div
  var centerDiv = document.createElement('div');
  // Set the class of the div to apply css
  centerDiv.className = 'col-10';

  // Create the title for event
  var title = document.createElement('h3');
  // Set the class
  title.className = 'text-uppercase';
  // Create strong text within the titleBox
  var strong = document.createElement('strong');
  // Set the value of the text to the title of the event
  strong.innerHTML = object.Title;
  // Append the text to the title
  title.appendChild(strong);
  // Append the title to the div
  centerDiv.appendChild(title);

  // Create the unordered list
  var ul = document.createElement('ul');
  // Set the class name
  ul.className = 'list-inline';

  // Create the day list item and set the class
  dayLi = document.createElement('li');
  dayLi.className = 'list-inline-item';
  // Create the day text in italics and set the class
  dayI = document.createElement('i');
  dayI.className = 'fa fa-calendar-o';

  // Create an array of days
  var weekday = new Array(7);
  weekday[0] = 'Sunday';
  weekday[1] = 'Monday';
  weekday[2] = 'Tuesday';
  weekday[3] = 'Wednesday';
  weekday[4] = 'Thursday';
  weekday[5] = 'Friday';
  weekday[6] = 'Saturday';
  // Set the day text to the the weekday of the objects date
  // getDay() returns 0-6 which is used with the weekday array to get the day.
  dayI.innerText = weekday[eventDate.getDay()];
  // Add the text to the list item
  dayLi.appendChild(dayI);
  // Add the day item to the list
  ul.appendChild(dayLi);

  // Create a time list item, setting the class
  timeLi = document.createElement('li');
  timeLi.className = 'list-inline-item';
  // Create the time text as italics and set the class
  timeI = document.createElement('i');
  timeI.className = 'fa fa-clock-o';
  // Set the text to the object's begin and end time.
  timeI.innerHTML = object.Begins + ' - ' + object.Ends;
  // Append the text to the list item
  timeLi.appendChild(timeI);
  // Append the list item to the list
  ul.appendChild(timeLi);

  // Create the location list item, setting the class
  locationLi = document.createElement('li');
  locationLi.className = 'list-inline-item';
  // Create the italic text for the location,setting the class
  locationI = document.createElement('i');
  locationI.className = 'fa fa-location-arrow';
  // Set the value of the text to the location of the object
  locationI.innerHTML = object.Location;
  // Append the text to the list item
  locationLi.appendChild(locationI);
  // Append the list item to the list
  ul.appendChild(locationLi);

  // Append the list to the central div
  centerDiv.appendChild(ul);

  // Create the description paragraph
  descPara = document.createElement('p');
  // Set the text to the description of the object
  descPara.innerHTML = object.Description;
  // Append the paragraph to the central div
  centerDiv.appendChild(descPara);

  // Append the central div to the row div
  row.appendChild(centerDiv);
  // Append the row to container
  container.appendChild(row);
  // Append the container to this event's div
  scheduleDiv.appendChild(container);
  // Append this events div to the main schedule container
  scheduleContainer.appendChild(scheduleDiv);
}

function readFile () {
  // GET request to the server to read the schedule file and return contents
  fetch('http://127.0.0.1:8090/readEvents')
  .catch((error) => alert('The server has disconnected.'))
  .then(function (response) {
    if (response.ok) {
      return response.text();
    }
 else {
      // If an error occurs return an error messgge
      return 'Failure to read file';
    }
  })

  .then(body => {
    // Convert the body into a json object
    obj = JSON.parse(body);
    // For each individual object in obj
    for (object in obj) {
      // Create an event view for that object (event)
      createEventView((obj[object]));
    }
  })
  // If there is an error put error to the console
   .catch(() => {
       console.error('Error');
   });
}

function generateOptions () {
  // GET request to get contents of schedule file
  fetch('http://127.0.0.1:8090/readEvents')
  .catch((error) => alert('The server has disconnected.'))
  .then(function (response) {
    if (response.ok) {
      return response.text();
    }
 else {
      // If an error occurs return an error messgge
      return 'Failure to read file';
    }
  })

  .then(body => {
    data = body;
    // Get the dropdown box element
    var dropdown = document.getElementById('deleteOptions');
    // Remove all present options
    dropdown.innerHTML = '';
    // Convert the data to a JSON object
    obj = JSON.parse(data);
    // For each individual object (event)
    for (object in obj) {
      // Create a new option
      var option = document.createElement('option');
      // Set the text of the option to the title of the event
      option.text = obj[object].Title;
      // Add this option to the dropdown
      dropdown.add(option);
    }
  })
   .catch(() => {
     // Catch an error if one occurs
       console.error('Error');
});
}

function deleteEvent () {
  // Get the dropdown box element
  var dropdown = document.getElementById('deleteOptions');
  // Find the current value of the dropdown
  toRemove = dropdown.value;
  // Create the json to send via POST
  toSend = { Title: toRemove };
  // Create the options of the POST request
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    // Set the body of the request to the JSON string of toSend
    body: JSON.stringify(toSend)
  };
  // Send the request
    fetch('http://127.0.0.1:8090/delEvent', options)
    .catch((error) => alert('The server has disconnected.'))
    .then(function (response) {
      if (response.ok) {
        // If the response comes back ok then regenerate the dropdown box options
        generateOptions();
        return response.text();
      }
      // If the response is a 403 then alert the user as to why
      if (response.status === 403) {
        window.alert('Enable admin mode to delete players');
      }
 else {
        // Return an error if one occurs
        return 'Error in adding new event';
      }
    });
  }

function searchEvents () {
  // Clear all current events being shown so that only the relevant ones are displayed.
  document.getElementById('scheduleContainer').innerHTML = '';
  // Get the value currently in the search bar
  var searchVal = document.getElementById('searchBar').value;
  // If there is a value to search by
  if (searchVal !== '') {
    // Make a GET request, querying the search value as title
    fetch('http://127.0.0.1:8090/searchEvents?Title=' + searchVal)
    .catch((error) => alert('The server has disconnected.'))
    .then(function (response) {
      if (response.ok) {
        return response.text();
      }
 else {
        // Return an error only if on the response is not returned OK.
        return 'Error in searching events';
      }
    })
    .then(body => {
      // Set data to the JSON object of body
      data = JSON.parse(body);
      // For each individual item that is returned from the search, create an event for it.
      for (item in data) {
        createEventView(data[item]);
      }
    });
  }
  // If the search box is empty we want all of the options to appear
  else {
    readFile();
  }
}
