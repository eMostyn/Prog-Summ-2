document.getElementById("learnModal");
document.getElementById("moreButton").addEventListener("click", learnMore());

function learnMore(){
  console.log('here');
  fetch('http://127.0.0.1:8090/learnMore')
   .then(function(response) {
     if (response.ok) {
       return response.text();
     }
     else {
       return "shit the bed";
     }
   })
   .then(body =>
      learnModal.innerHTML = "SLAP A DESCRIPTION HERE")

    .catch(() => {
        console.error("Error");
    })
}
