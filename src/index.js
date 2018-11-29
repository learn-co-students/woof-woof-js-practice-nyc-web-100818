
document.addEventListener("DOMContentLoaded", function (){
  let dogsArray
  const dogBar = document.getElementById("dog-bar")
  const dogFilter = document.getElementById("good-dog-filter")
  let dogInfo = document.getElementById("dog-info")


  function fetchAllDogs(){
    fetch("http://localhost:3000/pups", {method: "GET"})
    .then(resp => resp.json())
    .then(data => {
      updateDogsArray(data)
    })
  }

  function toggleDog(id, behavior){
    fetch(`http://localhost:3000/pups/${id}`, {
      method: "PATCH",
      headers: {
      "Application":  "application/json",
      "Content-Type": "application/json"
    },
      body: JSON.stringify({
      isGoodDog: behavior,
    })
    })
  }

  function updateDogsArray(data){
    if (Array.isArray(data)) {
      dogsArray = data
    }else if(dogsArray == data/** <-to fix*/) {
      console.log("Fix this later to update with just a dog");
    }
    renderPopulatedDogBar(dogsArray, true)
  }

  function renderPopulatedDogBar(dogs, filtered){
    if (!filtered){
      dogBar.innerHTML = ""
      dogs.forEach(function(dog){
        dogBar.innerHTML += `<span data-id="${dog.id}">${dog.name}</span>`
      })
    }else {
      dogBar.innerHTML = ""
      dogs.forEach(function(dog){
        if(!dog.isGoodDog){
          dogBar.innerHTML += `<span data-id="${dog.id}">${dog.name}</span>`
        }
      })
    }
  }

  function clickStates(){
    document.body.addEventListener("click", function(event){
      if (event.target.tagName === "SPAN"){
        let goodDog
        let button

        let found = dogsArray.find(function(element) {
          return element.id == event.target.dataset.id;
        });//end find

        if(found.isGoodDog){
          goodDog = "good-dog"
          button = "Good Dog!"
        }else{
          goodDog = "bad-dog"
          button= "BAD DOG!!"
        }
        //Set inner HTML
        dogInfo.innerHTML =
        `
          <img src="${found.image}">
          <h2>${found.name}</h2>
          <button class="${goodDog}" data-id="${event.target.dataset.id}">${button}</button>
        `
      }//end if
      else if (event.target.className === "good-dog"){
        event.target.className = "bad-dog"
        event.target.innerText = "BAD DOG!"
        toggleDog(event.target.dataset.id, false)
      }
      else if (event.target.className === "bad-dog"){
        event.target.className = "good-dog"
        event.target.innerText = "Good Dog!"
        toggleDog(event.target.dataset.id, true)
      }
    })// end addEventListener
  }// end clickStates()


  function filterGoodDogs(){
    dogFilter.addEventListener("click", function(event){
      if(event.target.innerText === "Filter good dogs: OFF"){
        event.target.innerText = "Filter good dogs: ON"
        renderPopulatedDogBar(dogsArray, true)
      }
      else if (event.target.innerText === "Filter good dogs: ON") {
        event.target.innerText = "Filter good dogs: OFF"
        renderPopulatedDogBar(dogsArray, false)

      }
      else{
        renderPopulatedDogBar(dogsArray, true)
      }
    })
  }

fetchAllDogs()
clickStates()
filterGoodDogs()

})
