document.addEventListener('DOMContentLoaded', function() {

  const dogBarDiv = document.querySelector('#dog-bar')
  const dogSummaryContainer = document.querySelector('#dog-summary-container')
  const dogInfoDiv = document.querySelector('#dog-info')
  const filterDiv = document.querySelector('#filter-div')
  const dogFilterButton = document.querySelector('#good-dog-filter')
  const pupCard = document.querySelector('.span')
  let allPupsArray = []

  fetchDogData = () => {
      fetch(`http://localhost:3000/pups`, { method: 'GET' })
        .then(response => response.json())
        .then(json => {
          console.table(json);
          addAllDogs(json)
          allPupsArray = json
        })
  }
  fetchDogData()

  addAllDogs = (pups) => {
    pups.forEach(function(pup) {
      addSingleDog(pup)
    })
  }

  addSingleDog = (pup) => {
    dogBarDiv.innerHTML += `<span class="span" id=${pup.id}>${pup.name}</span>`
  }

  dogBarDiv.addEventListener('click', function(event) {
    console.log(event.target.className)
    if (event.target.className = 'span') {
      let pupId = event.target.id
      let foundedPup = allPupsArray.find((pup) => pup.id == pupId)
      console.log(foundedPup);
      showSinglePupInfo(foundedPup, dogInfoDiv)
    }
  })

  showSinglePupInfo = (pup, dogInfoDiv) => {
    dogInfoDiv.innerHTML = ""
    dogInfoDiv.innerHTML += `
    <img src=${pup.image}>
    <h2>${pup.name}</h2>
    <button id="${pup.id}">${pup.isGoodDog ? "Good Dog" : "Bad Dog"}</button>`
  }

  dogInfoDiv.addEventListener('click', function(e){
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
})
