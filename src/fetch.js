  fetch(`http://localhost:3000/pups`)
  .then(response => response.json())
  .then(dogs => {
    dogs.forEach(dog => {
      let newDog = new Dog(dog);
    })
    prox.dogz = dataStore.dogz
  })
