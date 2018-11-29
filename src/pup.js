class Pup {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.isGoodDog = data.isGoodDog
    this.image = data.image
    Pup.all.push(this)
  }

  static findById(id) {
    return Pup.all.find(pup => pup.id == id)
  }

  static renderAll(pupArray) {
    return pupArray.map(pup => pup.renderIndex()).join("")
  }

  renderIndex() {
    return `<span data-action="show" data-id="${this.id}">${this.name}</span>`
  }

  renderShow() {
    return `<div>
              <img src="${this.image}">
              <h2>${this.name}</h2>
              <button data-action="good-boy" data-id="${this.id}">${this.isGoodDog ? "Bad Dog!" : "Good Dog!"}</button>
            </div>`
  }
}

Pup.all = []