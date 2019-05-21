const URL = 'http://localhost:3000/pups';
const dogBar = document.querySelector('#dog-bar');
const dogInfo = document.querySelector('#dog-info');

const api = (url, options = {}) => fetch(url, options)
  .then((resp) => {
    if (resp.ok) {
      return resp.json();
    }
    return new Promise.reject(resp.json());
  });

const renderDogInfo = (dog) => {
  dogInfo.innerHTML = '';

  const titleEl = document.createElement('h2');
  const imgEl = document.createElement('img');
  const buttonEl = document.createElement('button');

  titleEl.innerText = dog.name;
  imgEl.src = dog.image;
  buttonEl.innerText = dog.isGoodDog ? 'Bad dog' : 'Good dog';

  dogInfo.append(titleEl, imgEl, buttonEl);
};

const renderDogSpan = (dog) => {
  const spanEl = document.createElement('span');
  spanEl.innerText = dog.name;

  spanEl.addEventListener('click', () => renderDogInfo(dog));
  return spanEl;
};

const renderDogbar = (dogs) => {
  dogBar.innerHTML = '';
  dogs.forEach((dog) => {
    dogBar.appendChild(renderDogSpan(dog));
  });
};

function init() {
  api(URL)
    .then(renderDogbar);
}

init();
