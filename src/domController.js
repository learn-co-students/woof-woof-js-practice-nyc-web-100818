class DOMController {
  constructor() {
    this.pupAdapter = new JSONAPIAdapter('http://localhost:3000/pups')
    this.dogBar = document.getElementById('dog-bar')
    this.dogBar.addEventListener('click', this.handleDogBarClick.bind(this))
    this.dogInfo = document.getElementById('dog-info')
    this.dogInfo.addEventListener('click', this.handleDogInfoClick.bind(this))
    this.goodDogFilter = document.getElementById('good-dog-filter')
    this.goodDogFilter.addEventListener('click', this.handleFilterToggle.bind(this))
    this.init()
  }

  init() {
    this.pupAdapter.getAll()
      .then(response => {
        if (response.ok) {
          return response.json()
        }
      })
      .then(json => {
        json.forEach(pup => {
          new Pup(pup)
        })
        this.renderDogBar(Pup.all)
      })
  }

  renderDogBar(pupList) {
    this.dogBar.innerHTML = Pup.renderAll(pupList)
  }

  handleDogBarClick(e) {
    if (e.target.dataset.action == "show") {
      const pupId = e.target.dataset.id
      const pup = Pup.findById(pupId)
      this.dogInfo.innerHTML = pup.renderShow()
    }
  }

  handleDogInfoClick(e) {
    if (e.target.dataset.action == "good-boy") {
      const pupId = e.target.dataset.id
      const pup = Pup.findById(pupId)
      pup.isGoodDog = !pup.isGoodDog // toggle
      // patch
      this.pupAdapter.patch(pupId, { isGoodDog: pup.isGoodDog })
      // optimistic re-render the pup
      this.dogInfo.innerHTML = pup.renderShow()
      // update the filter list
      this.filterToggle(this.goodDogFilter.dataset.on)
    }
  }

  filterToggle(on) {
    if (on == "true") {
      const filteredPups = Pup.all.filter(pup => pup.isGoodDog)
      this.renderDogBar(filteredPups)
    } else {
      this.renderDogBar(Pup.all)
    }
  }

  handleFilterToggle(e) {
    if (e.target.dataset.on == "false") {
      this.goodDogFilter.dataset.on = "true"
      this.goodDogFilter.innerText = "Filter good dogs: ON"
    } else {
      this.goodDogFilter.dataset.on = "false"
      this.goodDogFilter.innerText = "Filter good dogs: OFF"
    }
    this.filterToggle(e.target.dataset.on)
  }
}