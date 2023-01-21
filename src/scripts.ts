type Character ={
    created:string
    episode:string[]
    gender:string
    id:number
    image:string,
    location:{
      name:string,
      url:string
    };
    name:string,
    origin:{
      name:string,
      url:string
    };
    status:string,
    species:string,
    type:string,
    url:string
  }
  type WhatIsReceived = {
    info:{
      count:number,
      pages:number,
      next:string,
      prev:string,
    },
    results:Character[]
  }

function generateCards(res: WhatIsReceived) {
  const cardContainer = document.querySelector('#card-container');

  res.results.forEach((character) => {
    const card = document.createElement('article');
    card.classList.add('characterCard__Wrapper');
    card.innerHTML = `<div class="characterCard__ImgWrapper">
        <img src="${character.image}" alt="${character.name}">
        </div>
        <div class="characterCard__ContentWrapper">
        <div class="section">
        <a href="${character.url}" rel="noopener noreferrer" target="_blank" class="externalLink">
        <h2>${character.name}</h2>
        </a><span class="status"><span class="status__icon status__icon--${character.status.toLowerCase()}"></span> ${character.status} - ${character.species}</span>
        </div>
        <div class="section">
        <span class="text-gray">Last known location:</span><a href="${character.location.url}" rel="noopener noreferrer" target="_blank" class="externalLink">${character.location.name}</a>
        </div>
        <div class="section">
        <span class="text-gray">First seen in:</span>
        <a href="${character.origin.url}" rel="noopener noreferrer" target="_blank" class="externalLink">${character.origin.name}</a>
        </div>
        </div>
        </article>`;
    ///
    cardContainer.appendChild(card);
  });
}
let apiLink = 'https://rickandmortyapi.com/api/character/';
const fetchData = () => {
  fetch(apiLink).then((response) => response.json()).then((data) => generateCards(data));
};
let count = 1;
fetchData();

const btn = document.querySelector<HTMLButtonElement>('.btn');

btn.addEventListener('click', () => {
  count += 1;
  apiLink = `https://rickandmortyapi.com/api/character/?page=${count}`;
  fetchData();
});
