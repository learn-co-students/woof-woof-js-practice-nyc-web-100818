const dataStore = {};
dataStore['dogz'] = [];

let handler = {
  set: () => {
    fetchDogs(dataStore.dogz);
    return 'hello'
  }
}

let prox = new Proxy(dataStore, handler)


class Dog {
  constructor(dog) {
    this.id = dog.id;
    this.name = dog.name;
    this.isGoodDog = dog.isGoodDog;
    this.image = dog.image;
    dataStore.dogz.push(this);
  }
}
