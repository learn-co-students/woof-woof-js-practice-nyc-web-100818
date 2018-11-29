class DogController { 
  constructor() {
    this.api = new Api(); 
    this._dogs = [];
  }

  loadDogsFromApi() {
    return this.api.getDogs()
      .then(dogJson => {
        let dogContainer = '';
        dogJson.forEach(dog => {
          let doggo = this.findOrCreateDog(dog.id, dog.name, dog.isGoodDog, dog.image)
          dogContainer += doggo.render();
        })
        // console.log(dogContainer)
        return dogContainer
      })
      .catch(console.error)
  }

  findOrCreateDog(id, name, breed, sex) {
    let dog = this.getDogByName(name);

    if(dog) {
      return dog
    }

    else {
      const newDog = new Dog(id, name, breed, sex);
      this._dogs.push(newDog);
      return newDog;
    }
  }

  getDogByName(name) {
    this._dogs.find(dog => dog.name === name)
  }

  filterDogs() {
    let goodDogs = this._dogs.filter(dog => dog.isGoodDog == true )
    let dogContainer = '';
    goodDogs.forEach(dog => {
      dogContainer += dog.render();
    });
    return dogContainer
  }

}