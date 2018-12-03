document.addEventListener('DOMContentLoaded', () => {
    const allDogs = []
    const dogBar = document.getElementById('dog-bar')
    const dogInfo = document.getElementById('dog-info')
    const goodDogFilter = document.getElementById('good-dog-filter')

    fetch('http://localhost:3000/pups/')
        .then(resp => resp.json())
        .then(json => {
            json.forEach(dog => {
               allDogs.push(dog)
               dogBar.innerHTML += `
                <span data-id='${dog.id}'>${dog.name}</span>
               `
            })
        })

    dogBar.addEventListener('click', () => {
        const foundDog = allDogs.find( dog => {
            return dog.id === parseInt(event.target.dataset.id)
        })
        
        if (event.target.nodeName === 'SPAN') {
            dogInfo.innerHTML = ''

            const dogImg = document.createElement('img')
            dogInfo.appendChild(dogImg)
            dogImg.src = `${foundDog.image}`

            const dogName = document.createElement('h2')
            dogInfo.appendChild(dogName)
            dogName.innerText = `${foundDog.name}`

            const dogButton = document.createElement('button')
            dogInfo.appendChild(dogButton)
            dogButton.dataset.id = `${foundDog.id}`
            if (foundDog.isGoodDog === true) {
                dogButton.innerText = "Good Dog!"
            } else {
                dogButton.innerText = "Bad Dog!"
            }
            
        }
    })

    dogInfo.addEventListener('click', () => {
        if (event.target.nodeName === 'BUTTON') {
            const foundDog = allDogs.find(dog => {
                return dog.id === parseInt(event.target.dataset.id)
            })

            if (foundDog.isGoodDog === true) {
                foundDog.isGoodDog = false
                event.target.innerText = "Bad Dog!"
                fetch(`http://localhost:3000/pups/${foundDog.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({ isGoodDog: false })
                })
            } else {
                foundDog.isGoodDog = true
                event.target.innerText = "Good Dog!"
                fetch(`http://localhost:3000/pups/${foundDog.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({ isGoodDog: true })
                })
            }
        }
    })
    
    
    goodDogFilter.addEventListener('click', () => {
        if (event.target.dataset.status === '0') {
            event.target.dataset.status = '1'
            event.target.innerText = 'Filter good dogs: ON'
            const goodDogs = allDogs.filter(dog => dog.isGoodDog === true)
            dogBar.innerHTML = ''
            goodDogs.forEach(dog => {
                dogBar.innerHTML += `
                <span data-id='${dog.id}'>${dog.name}</span>
                `
            })
        } else {
            event.target.dataset.status = '0'
            event.target.innerText = 'Filter good dogs: OFF'
            dogBar.innerHTML = ''
            allDogs.forEach(dog => {
                dogBar.innerHTML += `
                <span data-id='${dog.id}'>${dog.name}</span>
               `
            })
        }
    })

})