const URL = 'http://localhost:3000/pups';
const dogBar = document.querySelector('#dog-bar');
const dogInfo = document.querySelector('#dog-info');
let dogs = [];
let onlyGoodDogs = false;

const api = (url, options = {}) => fetch(url, options)
  .then((resp) => {
    if (resp.ok) {
      return resp.json();
    }
    return new Promise.reject(resp.json());
  });

const toggleGoodDog = (dog) => {
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      isGoodDog: !dog.isGoodDog,
    }),
  };

  api(`${URL}/${dog.id}`, options)
    .then((json) => {
      renderDogInfo(json);
      dogs = dogs.map(dog => (dog.id === json.id ? json : dog));
      renderDogbar();
    });
};

const renderDogInfo = (dog) => {
  dogInfo.innerHTML = '';

  const titleEl = document.createElement('h2');
  const imgEl = document.createElement('img');
  const buttonEl = document.createElement('button');

  titleEl.innerText = dog.name;
  imgEl.src = dog.image;
  buttonEl.innerText = dog.isGoodDog ? 'Bad dog' : 'Good dog';

  buttonEl.addEventListener('click', () => toggleGoodDog(dog));

  dogInfo.append(titleEl, imgEl, buttonEl);
};

const renderDogSpan = (dog) => {
  const spanEl = document.createElement('span');
  spanEl.innerText = dog.name;

  spanEl.addEventListener('click', () => renderDogInfo(dog));
  return spanEl;
};

const renderDogbar = () => {
  dogBar.innerHTML = '';
  const filteredDogs = onlyGoodDogs
    ? dogs.filter(dog => dog.isGoodDog === true)
    : dogs;

  filteredDogs.forEach((dog) => {
    dogBar.appendChild(renderDogSpan(dog));
  });
};

const toggleDogFilter = () => {
  onlyGoodDogs = !onlyGoodDogs;
  const onOff = document.querySelector('#on-off');
  onOff.innerText = onlyGoodDogs ? 'ON' : 'OFF';
  renderDogbar();
};

function init() {
  api(URL)
    .then((data) => { dogs = data; })
    .then(renderDogbar);
  document.querySelector('#good-dog-filter').addEventListener('click', toggleDogFilter);
}

init();
