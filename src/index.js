
dogDiv.addEventListener('click', (event) => {
  if (event.target.className == "dog-span") {
    let dog = dataStore.dogz.find(dog => dog.id == event.target.id);
    renderDog(dog);
  };
});

document.addEventListener('click', (event) => {
  console.log(event.target.dataset.name);
  if (event.target.id == "good-dog") {
    let dog = dataStore.dogz.find(dog => dog.id == event.target.dataset.id)
    // console.log(dog);
    dog.isGoodDog = true;
    // console.log(dog);
  } else if (event.target.id == "good-dog-filter") {
    if (event.target.dataset.name == "OFF") {
      // debugger
      hideBadDogs()
      event.target.dataset.name = "ON"
      event.target.innerText = "Filter good dogs: ON"
    } else {
      // debugger
      showBadDogs()
      event.target.dataset.name = "OFF"
      event.target.innerText = "Filter good dogs: OFF"
    }
  };
});
