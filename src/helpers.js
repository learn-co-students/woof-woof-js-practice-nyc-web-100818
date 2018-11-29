const dogDiv = document.getElementById('dog-bar')
const dogInfoDiv = document.getElementById('dog-info')

function fetchDogs(obj) {
  console.log(obj);
  console.log("running");
  obj.forEach(dog => {
    dogDiv.innerHTML += `
    <span id="${dog.id}" class="dog-span">
    ${dog.name}
    </span>
    `
  })
}

const renderDog = (dog) => {
  dogInfoDiv.innerHTML = "";
  dogInfoDiv.innerHTML += `
  <img src=${dog.image}>
  <h2>${dog.name}</h2>
  <button id="good-dog" data-id="${dog.id}" >Good Dog!</button>
  `;
}

const hideBadDogs = () => {
  for (let i = 0; i < dogDiv.children.length; i++) {
    let dog = dataStore.dogz.find(dog => dog.id == dogDiv.children[i].id);
    if (!dog.isGoodDog) {
      dogDiv.children[i].remove()
    }
  }
}

const showBadDogs = () => {
  dogDiv.innerHTML = ""
  dataStore.dogz.forEach(dog => {
      dogDiv.innerHTML += `
      <span id="${dog.id}" class="dog-span">
      ${dog.name}
      </span>
      `
  })
}
