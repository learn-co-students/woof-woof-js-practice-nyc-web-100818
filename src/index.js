document.addEventListener('DOMContentLoaded', function(){

let allPups = []

//ref to dog bar
let pupBar = document.getElementById('dog-bar');

//ref to dog info
let pupInfo = document.getElementById('dog-info');

//fetch to GET info about dogs
fetch('http://localhost:3000/pups')
  .then(response => response.json())
  .then(pupDataJSON => {
  console.log(pupDataJSON);
    //render all Dogs on page by passig in Dog Data and the reference to the dog table body
    allPups = pupDataJSON;
    //renderAllPups(allPups, list)

    renderPupsBar(allPups, pupBar);
  //    debugger
  })

//show pup info when clicked on name
pupBar.addEventListener('click', function(event){

  if (event.target.className === 'dog-span'){
    let pupId = event.target.id
    pup = allPups.find((pupInstance) => pupInstance.id ==   pupId)
    //  debugger
    renderPupInfo(pup, pupInfo);
  }
})

//toggle good dog/bad dog and PATCH to change data on server
pupInfo.addEventListener('click', function(e){
  //debugger
  clickedPupId = e.target.id;
  if (e.target.nodeName === "BUTTON"){
    if (e.target.innerText == "Good Dog"){
      e.target.innerText = "Bad Dog"
      e.target.isGoodDog = false
      fetch(`http://localhost:3000/pups/${clickedPupId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
                      Accept: 'application/json'
                    },
            body: JSON.stringify({

                "isGoodDog": false

            })
          })
    } else {
      e.target.innerText = "Good Dog"
      e.target.isGoodDog = true
      fetch(`http://localhost:3000/pups/${clickedPupId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
                      Accept: 'application/json'
                    },
            body: JSON.stringify({

              "isGoodDog": true

            })
          })
    }
  }
})

//filter dog button event listener
document.getElementById('good-dog-filter').addEventListener('click', function(event){
  //debugger

  filteredPups = allPups.filter(pup => pup.isGoodDog == true);
  //debugger

  if (event.target.innerText === "Filter good dogs: OFF"){
    event.target.innerText = "Filter good dogs: ON"
    renderPupsBar(filteredPups, pupBar)
  } else {
    event.target.innerText = "Filter good dogs: OFF"
    renderPupsBar(allPups, pupBar)
  }
});


}); //end of DOMContentLoaded

//***************************
//*****HELPER**FUNCTIONS*****
//***************************


function renderSinglePup(pup){
  return `
    <span class="dog-span" id="${pup.id}">${pup.name}
    </span>
  `
}

function renderPupsBar(pupsArr, pupBar){
  pupBar.innerHTML = '';
  return pupsArr.map((pup) => {
    pupBar.innerHTML += renderSinglePup(pup)
  });
}

function renderPupInfo(pup, pupInfo){
  pupInfo.innerHTML = '';
  return pupInfo.innerHTML += `
  <img src=${pup.image}>
  <h2>${pup.name}</h2>
  <button id="${pup.id}">${pup.isGoodDog ? "Good Dog" : "Bad Dog"}</button>
  `
}
