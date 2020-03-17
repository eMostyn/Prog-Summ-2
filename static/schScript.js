var toggleSwitch = document.getElementById("adminToggle")
var admin= false



function switchToggler(){
  if (!admin) {
    admin = true
    toggleSwitch.style.background = "Green"
  } else {
    admin = false
    toggleSwitch.style.background = "Red"
  }
}


function submitForm(){
  var titleVal = document.getElementById("titleBox").value;
  var descVal = document.getElementById("desc").value;
  var dateVal = document.getElementById("date").value;
  var beginsVal = document.getElementById("Begins").value;
  var endsVal = document.getElementById("Ends").value;
  var locationVal = document.getElementById("location").value;
  var nEvent = {Title: titleVal,
                Description: descVal,
                Date: dateVal,
                Begins: beginsVal,
                Ends: endsVal,
                Location: locationVal}
  createEventView(nEvent)
  jsonObj = JSON.stringify(nEvent)
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: jsonObj
  }
  fetch("http://127.0.0.1:8090/newEvent",options)
  .then(function(response) {
    if (response.ok) {
      return response.text();
    }
    else {
      return "Error in adding new event";
    }
  })
}


function createEventView(object){
  var eventDate = new Date(object.Date)

  var scheduleDiv = document.createElement("div")
  var link = document.createElement( "link" );
  link.href ="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css";
  link.rel = "stylesheet";
  scheduleDiv.appendChild(link)

  var container = document.createElement("div")
  container.className  = "container"

  var row = document.createElement("div")
  row.className  = "row row-striped"

  var col = document.createElement("div")
  col.className  = "col-2 text-right"

  var h1 = document.createElement("h1");
  h1.className = "display-4";
  var span = document.createElement("span");
  span.className = "badge badge-secondary"
  span.innerHTML = eventDate.getDate();
  h1.appendChild(span);
  col.appendChild(h1)

  var h2 = document.createElement("h2");
  var month = new Array();
  month[0] = "Jan";
  month[1] = "Feb";
  month[2] = "Mar";
  month[3] = "Apr";
  month[4] = "May";
  month[5] = "Jun";
  month[6] = "Jul";
  month[7] = "Aug";
  month[8] = "Sept";
  month[9] = "Oct";
  month[10] = "Nov";
  month[11] = "Dec";
  h2.innerHTML = month[eventDate.getMonth()]
  col.appendChild(h2)

  row.appendChild(col)
  var centerDiv = document.createElement("div");
  centerDiv.className  = "col-10"

  var title = document.createElement("h3");
  title.className  = "text-uppercase"
  var strong = document.createElement("strong")
  strong.innerHTML = object.Title
  title.appendChild(strong)
  centerDiv.appendChild(title)

  var ul = document.createElement("ul");
  ul.className  = "list-inline"


  dayLi = document.createElement("li")
  dayLi.className  = "list-inline-item"
  dayI = document.createElement("i");
  dayI.className  = "fa fa-calendar-o"

  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  dayI.innerText = weekday[eventDate.getDay()]
  dayLi.appendChild(dayI);
  ul.appendChild(dayLi)

  timeLi = document.createElement("li")
  timeLi.className  = "list-inline-item"
  timeI = document.createElement("i");
  timeI.className  = "fa fa-clock-o"
  timeI.innerHTML = object.Begins + " - " + object.Ends
  timeLi.appendChild(timeI)
  ul.appendChild(timeLi)

  locationLi = document.createElement("li");
  locationLi.className  = "list-inline-item"
  locationI = document.createElement("i");
  locationI.className  = "fa fa-location-arrow"
  locationI.innerHTML = object.Location
  locationLi.appendChild(locationI)
  ul.appendChild(locationLi)

  centerDiv.appendChild(ul)

  descPara = document.createElement("p")
  descPara.innerHTML = object.Description;
  centerDiv.appendChild(descPara)

  row.appendChild(centerDiv)
  container.appendChild(row)
  scheduleDiv.appendChild(container)
  document.body.appendChild(scheduleDiv)
}

function readFile(){

  fetch("http://127.0.0.1:8090/readEvents")
  .then(function(response) {
    if (response.ok) {
      return response.text();
    }
    else {
      return "Failure to read file";
    }
  })

  .then(body =>
    splitAndLoad(body))
   .catch(() => {
       console.error("Error");
      
   })

}
function splitAndLoad(data){
  console.log("data" + data)
  var lines = data.split("\n")
  console.log("Lines" + lines)
  for (line in lines){
    console.log(lines[line])
    createEventView((JSON.parse(lines[line])))
  }
}

//{"Title":"Collingwood","Description":"Game vs Collingwood","Date":"2020-03-20","Begins":"12:00","Ends":"13:00","Location":"Maiden Castle"}
