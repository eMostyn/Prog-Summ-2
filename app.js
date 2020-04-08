/** @module "App.js" */
// Dependencies
const express = require('express');
const app = express();
var fs = require('fs');
app.use(express.static('static'));
var admin = false;
var formidable = require('formidable');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * @name /newEvent
 * @description POST request to create a new event, request body is JSON object of new event
 */
app.post('/newEvent', function (req, res) {
var data;
// If the user has enabled admin mode a new event can be created
if (admin === true) {
    // Use fs module to read the schedule file with output going to 'jsonString'
 fs.readFile('./schedule.json', 'utf8', (err, jsonString) => {
      if (err) {
          // If there is an error reading the file print the error message to server console
          console.log('Error reading file from disk:', err);
          return;
      }
      // Turn the output of the reader into a JSON file
      data = JSON.parse(jsonString);
      // If the file was empty
      if (jsonString === '[]') {
        // Add the new event
        data.push((req.body));
}
      // If the date of the new event is later than the latest currently in the schedule
      else if (data[data.length - 1].Date < req.body.Date) {
          // Add the new event at the end
          data.splice(data.length, 0, req.body);
}
      // File was not empty and the date is earlier than the last
      else {
        // For each item currently in the file
        for (item in data) {
          // If the event in the file at 'item' is later then add the new event in that position.
          // This keeps the json file in chronological order
          if (data[item].Date > req.body.Date) {
            data.splice(item, 0, req.body);
            break;
          }
        }
      }
      // Write the new appended json data to the schedule formidable
      fs.writeFile('schedule.json', JSON.stringify(data), (err) => {
        // If there is an error throw it
        if (err) throw err;
    });
    // If everything worked as intended send the appropriate status code
    res.sendStatus(200);
      // success case, the file was saved.
      console.log('Added new event to schedule');
    });
}
// If the user has not enabled admin mode, return 403 as the action is forbidden
else {
  res.sendStatus(403);
}
});

/**
 * @name /readEvents
 * @description GET request to get the current schedule
 */
app.get('/readEvents', function (req, res) {
  // Read the schedule file, putting output to jsonString
  fs.readFile('./schedule.json', 'utf8', (err, jsonString) => {
    // If there is an error display it
    if (err) {
        console.log('Error reading file from disk:', err);
        return;
    }
    // No error has occurred, return the contents of the file to the client
    res.send(JSON.parse(jsonString));
  });
});

/**
 * @name /delEvent
 * @description POST request to delete an event, the request body is the JSON holding the title of the event to be deleted.
 */
app.post('/delEvent', function (req, res) {
var data;
// If the user has enabled admin mode
if (admin === true) {
  // Read the schedule file, putting output to jsonString
  fs.readFile('./schedule.json', 'utf8', (err, jsonString) => {
    // If there is an error display it
    if (err) {
        console.log('Error reading file from disk:', err);
        return;
    }
    // Convert the output into a JSON object
    data = JSON.parse(jsonString);
    // Pos will indicate the position of the event to be deleted
    var pos;
    // For each object in data
    for (obj in data) {
      // If the titles match then the postiion is obj
      if (data[obj].Title === req.body.Title) {
        pos = obj;
        // Remove the object at the relevant position
        data.splice(pos, 1);
        break;
      }
    }
    // Write the appended data to the file
    fs.writeFile('schedule.json', JSON.stringify(data), (err) => {
      // throws an error, you could also catch it here
      if (err) throw err;
});
  // No errors have occurred, return the relevant status code
  res.sendStatus(200);
  // success case, the file was saved
  console.log('Removed event from schedule');
});
}
// If the user has not enabled admin mode, return 403 as the action is forbidden
else {
  res.sendStatus(403);
}
});

/**
 * @name /adminToggle
 * @description POST request to toggle the state of 'admin', request body is JSON holding new value of admin
 */
app.post('/adminToggle', function (req, res) {
  // Set the value of admin to the admin value of the body of the post request
  admin = req.body.Admin;
  res.sendStatus(200);
});

/**
 * @name /getAdmin
 * @description GET request to get the value of 'admin'
 */
app.get('/getAdmin', function (req, res) {
  // Returns the value of admin to the client
  res.send(admin);
});

/**
 * @name /newPerson
 * @description POST request to create a new person, request body is JSON of player to be added.
 */
app.post('/newPerson', function (req, res) {
  var data;
  // If the user has enabled admin mode
  if (admin === true) {
    // Read the squad file, putting output to jsonString
 fs.readFile('./squad.json', 'utf8', (err, jsonString) => {
        if (err) {
          // If there is an error display it
            console.log('Error reading file from disk:', err);
            return;
        }
        // Convert the output to as JSON object
        data = JSON.parse(jsonString);
        // Push the new data onto the array
        data.push((req.body));
        // Write the appended file to the file
        fs.writeFile('./squad.json', JSON.stringify(data), (err) => {
          // throws an error if one occurs
          if (err) throw err;
      });
      // No errors have occured so send the relevant status code
      res.sendStatus(200);
        // success case, the file was saved
        console.log('Added new player to squad');
      });
}
// If the user has not enabled admin mode, return 403 as the action is forbidden
  else {
    res.sendStatus(403);
  }
});

/**
 * @name /fileupload
 * @description POST request to upload image from client, request body is form with image path
 */
app.post('/fileupload', function (req, res) {
  // Initialise an incoming form using the formidable module
  var form = new formidable.IncomingForm();
  // Parse the request into form
   form.parse(req, function (err, fields, files) {
     // Get the oldpath of the file thats being uploaded
     var oldpath = files.filetoupload.path;
     // Generate a new file path in the static folder
     var newpath = './static/' + files.filetoupload.name;
     // Rename the file to move it to the relvant folder
     fs.rename(oldpath, newpath, function (err) {
       // Either throw an error or return the ok status code
       if (err) throw err;
       res.sendStatus(200);
     });
     // Log to console to record if the image has been uploaded successfully
    console.log('Image Uploaded');
});
});

/**
 * @name /readPerson
 * @description GET request to read the current squad file
 */
app.get('/readPerson', function (req, res) {
  // Read the squad file and put the output in jsonString
  fs.readFile('./squad.json', 'utf8', (err, jsonString) => {
      // If there is an error display it
    if (err) {
        console.log('Error reading file from disk:', err);
        return;
    }
    // Send the output to the client
    res.send(JSON.parse(jsonString));
  });
});

/**
 * @name /delPlayer
 * @description POST request to delete a player from the squad, JSON body is name of player to be deleted
 */
app.post('/delPlayer', function (req, res) {
  // If the user has enabled admin mode
  if (admin === true) {
    // Read the squad file, putting output to jsonString
    fs.readFile('./squad.json', 'utf8', (err, jsonString) => {
      // If there is an error display it
      if (err) {
          console.log('Error reading file from disk:', err);
          return;
      }
      // Convert the output to a json object
      data = JSON.parse(jsonString);
      // Pos will represent the position of the object in the array to be removed
      var pos;
      // For each individual object
      for (obj in data) {
        // If the names match then set the position to obj and break the loop
        if (data[obj].Name === req.body.Name) {
          pos = obj;
          // Remove the object at that position
          data.splice(pos, 1);
          break;
        }
      }
      // Write the ammended data to the file
      fs.writeFile('squad.json', JSON.stringify(data), (err) => {
        // throws an error if one occurs
        if (err) throw err;
  });
    // No error has occurred, send the OK status code
    res.sendStatus(200);
      // success case, the player was removed
      console.log('Removed player from squad');
  });
  }
  // If the user has not enabled admin mode, return 403 as the action is forbidden
  else {
    res.sendStatus(403);
  }
});

/**
 * @name /amendApps
 * @description POST request to ammend the appearances of a player, JSON body of request is name of player and new appearances
 */
app.post('/amendApps', function (req, res) {
  var data;
  // If the user has enabled admin mode
  if (admin === true) {
    // Read the squad file, putting output to jsonString
    fs.readFile('./squad.json', 'utf8', (err, jsonString) => {
      if (err) {
          // If there is an error display it
          console.log('Error reading file from disk:', err);
          return;
      }
      // Convert the output to a json object
      data = JSON.parse(jsonString);
      // For each individual object
      for (obj in data) {
        // If the two names match the set the apps of the data at object to apps in the req
        if (data[obj].Name === req.body.Name) {
          data[obj].Apps = req.body.Apps;
          // Write the ammended data to the file
          fs.writeFile('squad.json', JSON.stringify(data), (err) => {
            // throws an error if one occurs
            if (err) throw err;
          });
          // Break the loop
          break;
        }
      }
    });
    // No error has occurred, send the OK status code
    res.sendStatus(200);
  }
    // If the user has not enabled admin mode, return 403 as the action is forbidden
    else {
        res.sendStatus(403);
    }
});

/**
 * @name /amendGoals
 * @description POST request to ammend the goals of a player, JSON body of request is name of player and new goals
 */
app.post('/amendGoals', function (req, res) {
  var data;
  // If the user has enabled admin mode
  if (admin === true) {
    // Read the squad file, putting output to jsonString
    fs.readFile('./squad.json', 'utf8', (err, jsonString) => {
      if (err) {
          // If there is an error display it
          console.log('Error reading file from disk:', err);
          return;
      }
      // Convert the output to a json object
      data = JSON.parse(jsonString);
      // For each individual object
      for (obj in data) {
        // If the names match then we have the desired player.
        if (data[obj].Name === req.body.Name) {
          // Set the value of this player's goals to the goals in the request's body
          data[obj].Goals = req.body.Goals;
          // Write the ammended data to the file
          fs.writeFile('squad.json', JSON.stringify(data), (err) => {
            // throws an error if one occurs.-
            if (err) throw err;
          });
          break;
        }
      }
    });
  // No error has occurred, send the OK status code
    res.sendStatus(200);
  }
  // If the user has not enabled admin mode, return 403 as the action is forbidden
  else {
    res.sendStatus(403);
  }
});

/**
 * @name /searchEvents
 * @description GET request to find certain events, request query 'Title' is the search value
 */
app.get('/searchEvents', function (req, res) {
    // Relevant will hold the objects that fit the search criteria
    var relevant = [];
    // Get the title we are searching for and convert it to lower case.
    // This is so the search will not be case sensitive
    searchVal = req.query.Title.toLowerCase();
    // Read the file, putting the output in jsonString
    fs.readFile('./schedule.json', 'utf8', (err, jsonString) => {
      if (err) {
          // If there is an error, display it
          console.log('Error reading file from disk:', err);
          return;
      }
      // Convert the output to a JSON object
      data = JSON.parse(jsonString);
      // For each individual object
      for (obj in data) {
        // If the title of this object (in lower case) includes the search value
        if (data[obj].Title.toLowerCase().includes(searchVal)) {
          // Push that object to the relevant array
          relevant.push(data[obj]);
      }
      console.log(relevant);
      // Return the relevant array to the client to be displayed
      res.send(relevant);
    }
    });
});

module.exports = app;
