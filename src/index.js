document.addEventListener('DOMContentLoaded', () => {

  //DOM Nodes and variables

  const dogBar = document.querySelector('#dog-bar')
  const dogInfoDiv = document.querySelector('#dog-info')
  const goodDogFilter = document.querySelector('#good-dog-filter')
  let doggoButton
  let allDoggos = []
  let goodDogs = false

  //Event Listeners

  dogBar.addEventListener('click', showDoggoInfo)
  goodDogFilter.addEventListener('click', toggleFilter)


  //Functions

  function getDoggos() {

    fetch('http://localhost:3000/pups/', { method: 'GET' })
      .then( resp => resp.json())
      .then( doggoData => {
        // console.log(doggoData);
        doggoData.forEach( (doggo) => {
          allDoggos.push(doggo)
        } )
        displayDoggos() //call here so promise can resolve first
      })
  }

  function displayDoggos() {
    allDoggos.forEach((doggo) => {
      return dogBar.innerHTML += `<span class="doggo-span" id="${doggo.id}">${doggo.name}</span>`
    })
  }

  function showDoggoInfo(event) {
    let id = parseInt(event.target.id)
    let doggo = allDoggos[id - 1]
    let buttonText = (doggo.isGoodDog ? "Good Dog!" : "Bad Dog!")

    if (event.target.className === "doggo-span") {
      dogInfoDiv.innerHTML = `
      <img src="${doggo.image}" />
      <h2>${doggo.name}</h2>
      <button class="goodBad-btn" id="dog-${id}">${buttonText}</button>
      `
      doggoButton = document.querySelector(`#dog-${id}`)
      doggoButton.addEventListener('click', toggleGoodBad)
    }
  }

  function toggleGoodBad(event) {
    let id = parseInt(event.target.id.split('-')[1])
    let doggo = allDoggos[id - 1]

    console.log(doggo.isGoodDog);
    doggo.isGoodDog = !doggo.isGoodDog //toggle here
    console.log(doggo.isGoodDog);
    let buttonText = (doggo.isGoodDog ? "Good Dog!" : "Bad Dog!")
    console.log(buttonText);
    event.target.innerHTML = buttonText

    fetch(('http://localhost:3000/pups/' + id), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({isGoodDog: doggo.isGoodDog})
    })
    .then(resp => resp.json())
    .then(doggo => {
      console.log(`${doggo.name} isGoodDog status now ${doggo.isGoodDog}`)
    })

  } //end toggleGoodBad fn

  function toggleFilter(event) {

    goodDogs = !goodDogs

    if (goodDogs) {
      event.target.innerHTML = "Filter good dogs: ON"

      let goodDoggos = allDoggos.filter(doggo => doggo.isGoodDog)

      dogBar.innerHTML = ''

      goodDoggos.forEach((doggo) => {
        return dogBar.innerHTML += `<span class="doggo-span" id="${doggo.id}">${doggo.name}</span>`
      })

    } else {
      event.target.innerHTML = "Filter good dogs: OFF"

      dogBar.innerHTML = ''

      allDoggos.forEach((doggo) => {
        return dogBar.innerHTML += `<span class="doggo-span" id="${doggo.id}">${doggo.name}</span>`
      })
    }
  } //end toggleFilter fn

  getDoggos()

})
