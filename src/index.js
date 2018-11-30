document.addEventListener('DOMContentLoaded', () => {
  const dogCollection = document.querySelector('#dog-bar')
  const dogCard = document.querySelector('#dog-summary-container')
  const dogFilter = document.querySelector('#good-dog-filter')
  let allDogs = []
  fetchAllDogs()

  dogCollection.addEventListener('click', e => {
    if (e.target.className === "span") {
    let clickedDogId = e.target.id
    // console.log(clickedDogId, allDogs);
    let foundDog = allDogs.find((d) => d.id == clickedDogId)
    // console.log(foundDog)
    let goodOrBAD = ''
    if (foundDog.isGoodDog === true){
      goodOrBAD = 'Good Dog!'
    }
    else (goodOrBAD = 'Bad Dog!')
    dogCard.innerHTML = `
    <img src="${foundDog.image}" height="80%" width=auto >
    <h2>${foundDog.name}</h2>
    <button class="button" id ="${foundDog.id}">${goodOrBAD}</button>
    `
    }
  })

  dogCard.addEventListener('click', e => {
    if (e.target.className === "button") {
      let dogId = e.target.id
      let foundDog = allDogs.find((d) => d.id == dogId)
      if (e.target.innerText === "Bad Dog!"){
        foundDog.isGoodDog = true
        e.target.innerText = "Good Dog!"
        goodOrBadPatch(foundDog, dogId)
      } else {
        e.target.innerText = "Bad Dog!"
        foundDog.isGoodDog = false
        goodOrBadPatch(foundDog, dogId)
      }
    }
  })

  dogFilter.addEventListener('click', e => {
    // debugger
    if (e.target.innerHTML === "Filter good dogs: OFF"){
      e.target.innerHTML = "Filter good dogs: ON"
      let goodDogs = allDogs.filter(d => {
        return d.isGoodDog === true
      })
      dogCollection.innerHTML = ''
      addDogsToPage(goodDogs)
    }
    else if (e.target.innerHTML === "Filter good dogs: ON"){
      e.target.innerHTML = "Filter good dogs: OFF"
      dogCollection.innerHTML = ''
      addDogsToPage(allDogs)
    }
  })


//-----------------fetch--------------//
  function fetchAllDogs(){
    fetch('http://localhost:3000/pups')
      .then(r => r.json())
      .then(dogArray => {addDogsToPage(dogArray)
        allDogs = dogArray
        // console.log(allDogs);
      })
  }
  function addDogsToPage(dogs){
    dogs.forEach((dog) => {
      addSingleDogToPage(dog)
    })
  }
  function addSingleDogToPage(dog){
    dogCollection.innerHTML += `
      <span class="span" id=${dog.id}>${dog.name}</span>
    `
  }

  function goodOrBadPatch(dog, id){
    fetch(`http://localhost:3000/pups/${id}`,
      {method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          isGoodDog: dog.isGoodDog
        })
       })
      .then(r => r.json())
      .then(console.log("update dog goodOrBAD"))
  }





})//end of DOM Load
