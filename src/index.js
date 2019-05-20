const dogBar = document.querySelector('#dog-bar')
const url = 'http://localhost:3000/pups'
const dogInfo = document.querySelector('#dog-info')


function dogSpan(dog) {
    const dogEl = document.createElement('span')

    dogEl.innerText = dog.name
    dogEl.addEventListener('click', (event) => {
        console.log(event)
        addDogInfo(dog)
    })
    return dogEl
}

function fetchDogs(url) {
    return fetch(url) 
    .then(resp => resp.json())
}

function addDogsToBar(dogs) {
    dogs.forEach(dog => {
        const spanEl = dogSpan(dog)
        dogBar.appendChild(spanEl)
    })
}

function addDogInfo (dog) {
    dogInfo.innerHTML = `
    <img src=${dog.image}/>
    <h2> ${dog.name} </h2>
    `
}


function init () {
    fetchDogs(url)
    .then(dogs => addDogsToBar(dogs))
    
}

init()