let doggoID = 0

document.addEventListener('DOMContentLoaded', () => {
  displayAllDogs()
  bindGoodDogFilter()
})

function displayAllDogs() {
  const dogBar = document.getElementById('dog-bar')
  dogBar.innerHTML = ''
  fetch('http://localhost:3000/pups')
  .then(res => res.json())
  .then(res => {
    res.forEach(pup => {
      newPup = new Pup(pup)
      dogBar.innerHTML += newPup.renderSpan()
    })
    bindDogButtons()
  })
}

function bindDogButtons() {
  const dogButtons = Array.from(document.getElementById('dog-bar').children)
  dogButtons.forEach((button) => {
    button.addEventListener('click', displayDog)
  })
}

function displayDog(event) {
  const dogInfo = document.getElementById('dog-info')
  doggoID = parseInt(event.target.id.split('pup')[1])
  const foundPup = Pup.findPup()
  dogInfo.innerHTML = foundPup.renderInfo()
  bindGoodBad()
}

function bindGoodBad() {
  const button = document.querySelector('#flip-good-bad')
  button.addEventListener('click', flipGoodBad)
}

function flipGoodBad() {
  const flipBtn = document.getElementById('flip-good-bad')
  const foundPup = Pup.findPup()
  foundPup.isGoodDog = !foundPup.isGoodDog
  if (foundPup.isGoodDog) {
    flipBtn.innerHTML = 'Good Dog!'
  } else {
    flipBtn.innerHTML = 'Bad Dog!'
  }
  editGoodBad(foundPup)
}

function editGoodBad(foundPup) {
  fetch(`http://localhost:3000/pups/${foundPup.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(foundPup)
  })
  .then(res => res.json())
  .then(res => console.log(res))
}

function bindGoodDogFilter() {
  const goodDogFilter = document.getElementById('good-dog-filter')
  goodDogFilter.addEventListener('click', filterGoodDogs)
}

function filterGoodDogs() {
  const goodDogFilter = document.getElementById('good-dog-filter')
  if (goodDogFilter.innerHTML === 'Filter good dogs: OFF') {
    goodDogFilter.innerHTML = 'Filter good dogs: ON'
    const badPups = allPups.filter((pup) => pup.isGoodDog === false)
    badPups.forEach((pup) => {
      const btn = document.getElementById(`pup${pup.id}`)
      console.log(btn)
      btn.style = 'display: none;'
    })
    // End if
  } else {
    goodDogFilter.innerHTML = 'Filter good dogs: OFF'
    Array.from(document.getElementsByTagName('span')).forEach((pup) => {
      pup.style = 'display: flex;'
    })
    // End else
  }
}
