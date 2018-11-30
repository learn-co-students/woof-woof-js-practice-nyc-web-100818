document.addEventListener('DOMContentLoaded', init)

function init () {
  domCon = new DomController

  fetch('http://localhost:3000/pups')
  .then(r=>r.json())
  .then(p=> {
    p.forEach(dog => {
      newDog = new Dog(dog)
    })
    domCon.appendOnPage(Dog.all)
    console.log(p)
  })
}
