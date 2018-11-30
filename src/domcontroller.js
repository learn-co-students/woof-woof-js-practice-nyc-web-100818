class DomController {
  constructor() {
    this.dogBar = document.querySelector('#dog-bar')
    this.dogKennel = document.querySelector('#dog-info')
    this.toggle = document.querySelector('#good-dog-filter')

    this.dogBar.addEventListener('click', this.showDog.bind(this))
    this.toggle.addEventListener('click', this.filterGoodDogs.bind(this))
    this.dogKennel.addEventListener('click', this.toggleGoodness.bind(this))
  }

  appendOnPage(array) {
    const dogBar = document.querySelector('#dog-bar')
    dogBar.innerHTML=''
    Dog.renderAll(array).forEach(dogHtml => dogBar.appendChild(dogHtml))
  }

  showDog(event) {
    if (event.target.dataset.action === 'dog') {
      this.dogKennel.innerHTML = ''
      let dogId = parseInt(event.target.id)
      let showDog = Dog.all.find(dog=> dog.id === dogId)
      this.dogKennel.appendChild(showDog.renderShow())

    }
  }

  filterGoodDogs(event) {
    if (this.toggle.innerText === 'Filter good dogs: OFF') {
      this.toggle.innerText = 'Filter good dogs: ON'
      this.appendOnPage(Dog.isGood())
    }
    else if(this.toggle.innerText === 'Filter good dogs: ON') {
        this.toggle.innerText = 'Filter good dogs: OFF'
        this.appendOnPage(Dog.all)
    }
  }

  toggleGoodness(event) {
    if (event.target.dataset.type === 'dog'){
      let thisDog = Dog.all.find(dog => dog.id === parseInt(event.target.dataset.action))
      thisDog.isGoodDog = !thisDog.isGoodDog
      fetch(`http://localhost:3000/pups/${thisDog.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept':  'application/json'
        },
        body: JSON.stringify({
          isGood: `${thisDog.isGodDog}`
        })
      })
      .then(r=>r.json())
      .then(p=>console.log(p))
      if (event.target.innerText.includes('Good')) {
        event.target.innerText = 'Bad Dog'
      }
      else {
        event.target.innerText = 'Good Dog'
      }
      if (this.toggle.innerText === 'Filter good dogs: ON') {
        this.appendOnPage(Dog.isGood())
      }
    }
  }

}
