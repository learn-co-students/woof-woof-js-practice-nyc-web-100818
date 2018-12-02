document.addEventListener('DOMContentLoaded', (e) => {
  // DOM ELEMENTS
  const dogBar = document.getElementById('dog-bar')
  const dogInfo = document.getElementById('dog-info')
  const filterDiv = document.getElementById('filter-div')
  console.log(filterDiv);
  // VARIABLES
  const dogsURL = 'http://localhost:3000/pups'
  let dataStore = ''
  // FETCHES AND EVENT LISTENERS
  fetch(dogsURL, { method: 'GET' }) // GET is default
    .then(r => r.json())
    .then(arrayOfDogObjects => {
      dataStore = arrayOfDogObjects
      arrayOfDogObjects.forEach((dogObject) => {
        dogBar.innerHTML += `<span id="${dogObject.id}" class="dog-span">${dogObject.name}</span>`
        // i gave the span an id of the dog's id bc i have a feeling we'll need it
      })
    })

    dogBar.addEventListener('click', (e) => {
      if (e.target.className === 'dog-span') {
        let clickedDogId = e.target.id // use this ID to find the dog in the dataStore
        // alternatively, could have used the id to go to the dog's show page
        let clickedDog = dataStore.find((dogObject) => { return dogObject.id == clickedDogId })
        // use this clickedDog to now set the html of the div that pops up
        if (clickedDog.isGoodDog === true) {
          dogInfo.innerHTML = `<img src=${clickedDog.image}>
          <h2>${clickedDog.name}</h2>
          <button class="good-bad-btn" id=${clickedDog.id}>Good Dog!</button>`
        } else if (clickedDog.isGoodDog === false) {
          dogInfo.innerHTML = `<img src=${clickedDog.image}>
          <h2>${clickedDog.name}</h2>
          <button class="good-bad-btn" id=${clickedDog.id}>Bad Dog!</button>`
        }
      }
    })

  dogInfo.addEventListener('click', (e) => {
    let goodDog = ''
    if (e.target.className === 'good-bad-btn') {
      let clickedDogId = e.target.id
      let clickedDog = dataStore.find((dogObject) => { return dogObject.id == clickedDogId })
      if (e.target.innerText === 'Good Dog!') {
        e.target.innerText = 'Bad Dog!'
        clickedDog.isGoodDog = false // updating dataStore
        console.log(dataStore);
        goodDog = false // will use this in my patch
        fetch(`http://localhost:3000/pups/${clickedDogId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            "isGoodDog": goodDog
          })
        })
      } else if (e.target.innerText === 'Bad Dog!') {
        e.target.innerText = 'Good Dog!'
        clickedDog.isGoodDog = true // updating dataStore
        goodDog = true // use this in my patch
        fetch(`http://localhost:3000/pups/${clickedDogId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            "isGoodDog": goodDog
          })
        })
      }
    }

  }) // end event listener

  filterDiv.addEventListener('click', (e) => {
    if (e.target.id === 'good-dog-filter') {
      if (e.target.innerText === 'Filter good dogs: OFF') {
        e.target.innerText = 'Filter good dogs: ON'
        // show the good dogs aka dogs with isGoodDog set to true - filter out the good dogs first
        let goodDogs = dataStore.filter((dog) => { return dog.isGoodDog === true })
        dogBar.innerHTML = ''
        goodDogs.forEach((goodDog) => {
          dogBar.innerHTML += `<span id="${goodDog.id}" class="dog-span">${goodDog.name}</span>`
        })


      } else if (e.target.innerText === 'Filter good dogs: ON') {
        e.target.innerText = 'Filter good dogs: OFF'
        // render all dogs w the data store
        dataStore.forEach((dogObject) => {
          dogBar.innerHTML += `<span id="${dogObject.id}" class="dog-span">${dogObject.name}</span>`
        })
      }
    }
  })





  // HELPERS (IF U HAVE TIME)


}) // end of DOMContentLoaded
