var toggleSwitch = document.getElementById("adminToggle")
toggleSwitch.OnClick = switchToggler()
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
toggleSwitch.addEventListener("click", switchToggler());
