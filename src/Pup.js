class Pup {
  constructor(pupObj) {
    this.id = pupObj.id
    this.name = pupObj.name
    this.isGoodDog = pupObj.isGoodDog
    this.image = pupObj.image
    allPups.push(this)
  }

  renderSpan() {
    return `<span id=pup${this.id} style='cursor: pointer;'>${this.name}</span>`
  }

  renderInfo() {
    let goodOrBad = 'Good Dog!'
    if (this.isGoodDog == false) { goodOrBad = 'Bad Dog!' }
    return `<img src='${this.image}'><h2>${this.name}</h2><button id='flip-good-bad'>${goodOrBad}</button>`
  }

  static findPup() {
    return allPups.find((pup) => {
      return pup.id === doggoID
    })
  }
}

allPups = []
