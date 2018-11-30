class Dog {
  constructor(dog) {
    this.id = dog.id
    this.image = dog.image
    this.isGoodDog = dog.isGoodDog
    this.name = dog.name
    Dog.all.push(this)
  }

  static isGood() {
    return Dog.all.filter(dog => dog.isGoodDog === true)
  }

  static isBad() {
    return Dog.all.filter(dog => dog.isGoodDog === false)
  }


  static renderAll(array) {
    return array.map(dog => dog.render())
  }

  render() {
    let span = document.createElement('span')
    span.innerText = `${this.name}`
    span.id = this.id
    span.dataset.action = 'dog'
    return span
  }

  renderShow() {
    let kennel = document.createElement('div')
    let goodBoy = document.createElement('button')
    let badBoy = document.createElement('button')
    goodBoy.dataset.action = this.id, goodBoy.dataset.type = 'dog'
    badBoy.dataset.action = this.id, badBoy.dataset.type = 'dog'
    goodBoy.innerText = 'Good Dog', badBoy.innerText = 'Bad Dog'
    kennel.innerHTML = `
      <h3>${this.name}</h3>
      <img src="${this.image}">
    `
    if (this.isGoodDog) {
      kennel.appendChild(goodBoy)
    }
    else {
      kennel.appendChild(badBoy)
    }
    return kennel
  }




}

Dog.all = []
