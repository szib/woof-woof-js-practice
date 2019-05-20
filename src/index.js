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
    const buttonText = dog.isGoodDog ? 'Bad dog' : 'Good dog'
    dogInfo.innerHTML = `
    <img src=${dog.image}>
    <h2> ${dog.name} </h2>
    <button> ${buttonText} </button>
    `
    let dogButton = dogInfo.querySelector('button')
    dogButton.addEventListener('click', (event) => {
        fetch(`${url}/${dog.id}`, {
            method: 'PATCH',
            header: { 'Content-Type':'application/json'},
            body: JSON.stringify({isGoodDog: !dog.isGoodDog})
        }) 
    })
}

function filterDogs(dogs, onlyGoodDogs = false) {
    if (onlyGoodDogs) {
      return dogs.filter(dog => dog.isGoodDog === true);
    }
    return dogs;
}

document

function init () {
    fetchDogs(url)
    .then(dogs => addDogsToBar(dogs))
    
}

init()