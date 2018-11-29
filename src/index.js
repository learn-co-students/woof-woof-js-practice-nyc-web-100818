document.addEventListener('DOMContentLoaded', () =>{
  const pupTable = document.querySelector('#dog-info')
  const pupBar = document.querySelector('#dog-bar')
  const filterBar = document.querySelector('#good-dog-filter')
  let allPup = []
  // console.log(pupBar);

///fetch
function fetchAllDogs(){
  fetch(`http://localhost:3000/pups`)
  .then(res => res.json())
  .then(data =>{
    renderAllDogName(data);
    allPup = data
    console.table(allPup);
  }) //end of first.then
}//end of function fetchAllDogs
fetchAllDogs()

///make pupbar clickable
pupBar.addEventListener('click', (e) =>{
  pupId = parseInt(e.target.id)
  foundPup = allPup.find((d) => d.id === pupId)
  console.log(foundPup)
  renderSinglePup(foundPup)
}) // end pupBar addEventListener

/// make good/bad dog button clickable
pupTable.addEventListener('click', (e) =>{
  pupId = parseInt(e.target.id)
  foundPup = allPup.find((d) => d.id === pupId)
  if (e.target.innerHTML === "Good Dog!"){
    foundPup.isGoodDog = false
    e.target.innerHTML = "Bad Dog"
    console.log(foundPup.name, foundPup.isGoodDog)
    fetchPathIsGoodDog(foundPup, pupId)
  } else if (e.target.innerHTML === "Bad Dog"){
    foundPup.isGoodDog = true
    e.target.innerHTML = "Good Dog!"
    console.log(foundPup.name, foundPup.isGoodDog)
    fetchPathIsGoodDog(foundPup, pupId)
  } //end of if and else if
})//end puptable addEventListener

////HELPER:
function renderAllDogName(dogCollection){
  pupBar.innerHTML =
    dogCollection.map((dog)=>{
      return `<span id=${dog.id}>${dog.name}</span>`
    }).join('')
}

function renderSinglePup(pup){
  let goodBad = ""
  if (pup.isGoodDog === false) {goodBad = "Bad Dog"}
  else if (pup.isGoodDog === true) {goodBad = "Good Dog!" }
  pupTable.innerHTML = `
     <img src=${pup.image}>
     <h2>${pup.name}</h2>
     <button id=${pup.id}>${goodBad}</button>`
}//end foundPup

function fetchPathIsGoodDog(pup, pupId){

  fetch(`http://localhost:3000/pups/${pupId}`, {method: 'PATCH',
    headers: {"Content-Type": "application/json", Accept: "application/json"},
    body: JSON.stringify({
      isGoodDog: pup.isGoodDog
    })}) //end of fetch
    .then(res => res.json())
    .then(data => console.log("updated", data))
}//end of fetchPathIsGoodDog fcn


///// FILTER FUNCTION
filterBar.addEventListener('click', (e)=>{
  if (e.target.innerHTML === "Filter good dogs: OFF") {
    e.target.innerHTML = "Filter good dogs: ON";
    // debugger
    goodPups = allPup.filter((d) => {return d.isGoodDog === true});
    renderAllDogName(goodPups)
  } else if (e.target.innerHTML === "Filter good dogs: ON"){
    e.target.innerHTML = "Filter good dogs: OFF"
    renderAllDogName(allPup)
  };
})

})//end of DOMContentLoaded
