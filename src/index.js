document.addEventListener('DOMContentLoaded', () => {
  // ********* DOM Elements *************
  const dogBar = document.getElementById('dog-bar') // this is the element to which we're going to add the dogs
  const dogDiv = document.getElementById('dog-info')
  const filterDiv = document.getElementById('filter-div')
  // ********* Variables *************
  const allPupsUrl = 'http://localhost:3000/pups'
  let dataStore = [] // have to fill this in original fetch
  // ********* Fetches/Event Listeners *************
  // INITIAL FETCH (on page load) TO GET ALL DOG DATA
  fetchAndRenderAllPups()

  // click event on pup span, but listen for click on the PARENT - DOG-BAR
    // using event delegation
  dogBar.addEventListener('click', e => {
    let clickedDogId = e.target.id
    if (e.target.className === 'dog-span') {
      // use the clickedDogId to go to the show page to update the page w the additional info
      fetch(`http://localhost:3000/pups/${clickedDogId}`)
        .then(r => r.json())
        .then(pupObject => {
          // render on the dom by adding the info to the dog-info div
          if (pupObject.isGoodDog === true) { // if this attribute is true, then render this way
            dogDiv.innerHTML = `<img src=${pupObject.image}>
            <h2>${pupObject.name}</h2>
            <button id="${pupObject.id}" data-set="${pupObject.isGoodDog}">Good Dog!</button>`
          } else { // otherwise, render this way
            dogDiv.innerHTML = `<img src=${pupObject.image}>
            <h2>${pupObject.name}</h2>
            <button id="${pupObject.id}" data-set="${pupObject.isGoodDog}">Bad Dog :(</button>`
          }
        })
    }
  }) // end of click event on top dog bar

  // click event for individual dog's button, but put it on the parent dogDiv
  dogDiv.addEventListener('click', e => {
    // grab the id of the dog we'll have to patch
    let clickedDogId = e.target.id
    let newBoolean = ''
    // OPTIMISTICALLY RENDERING THE CHANGE
    if (e.target.innerText === 'Good Dog!') { // if the button shows good dog
      // switch innerText  - DOM
      e.target.innerText = 'Bad Dog :('
      newBoolean = false
      // AND update the attribute to the opposite - API/PATCH
    } else if (e.target.innerText === 'Bad Dog :(') {
        e.target.innerText = 'Good Dog!'
        newBoolean = true
    }
    // PATCH to update specific doggerooni
    fetch(`http://localhost:3000/pups/${clickedDogId}`, {
      method: 'PATCH',
      headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
      },
      body: JSON.stringify({
        "isGoodDog": newBoolean
      })
    })
    // .then(r => r.json())
    // .then(data => {
    //   console.log(data);
    // })
  }) // end eventlistener

  // filter --> click event on the button that then renders filtered data --> use FILTER
  // PUT THE LISTENER ON THE PARENT: filter-div
  filterDiv.addEventListener('click', e => {
    // this toggles what the button says
      // e.target.innerText === "Filter good dogs: OFF" ? e.target.innerText = "Filter good dogs: ON" : e.target.innerText = "Filter good dogs: OFF"
    if (e.target.innerText === "Filter good dogs: OFF") {
      e.target.innerText = "Filter good dogs: ON"
      // make the DOM only show good dogs - isGoodDog: true
      // this is where u should have that third dataStore...
      // filter for only good dogs
      let goodDogs = dataStore.filter((dog) => {return dog.isGoodDog === true })
      // console.log("filtered", goodDogs);
      // console.log("ALL DOGS",dataStore);
      // RENDER goodDogs
      let filteredDomHtml = goodDogs.map((dog) => {
        return `<span class="dog-span" id="${dog.id}">${dog.name}</span>`
      }).join('')
      dogBar.innerHTML = filteredDomHtml

    } else if (e.target.innerText === "Filter good dogs: ON") {
      e.target.innerText = "Filter good dogs: OFF"
      // otherwise render all dogs
      dataStore.forEach((dog) => {
        dogBar.innerHTML += `<span class="dog-span" id="${dog.id}">${dog.name}</span>`
      })

      }
    })


  // ********* HELPERS *************
  function fetchAndRenderAllPups() {
     fetch(allPupsUrl, { method: 'GET' })
      .then(r => r.json()) // parse the json
      .then(arrayOfPupObjects => {
        dataStore = arrayOfPupObjects
        // array = arrayOfPupObjects
        // append each pup to the page, but in this case, we're ONLY appending the name in a span
         arrayOfPupObjects.forEach((pupObject) => {
          dogBar.innerHTML += `<span class="dog-span" id="${pupObject.id}">${pupObject.name}</span>`
        })
      })
  }


}) // end of DOMContentLoaded
