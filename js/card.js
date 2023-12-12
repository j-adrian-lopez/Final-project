// variables to compare cards
let first;
let second;
let matched = false;
let addScore = 0;

const score = document.getElementById("score");
score.textContent = addScore;

// Variables that store the arrays to create the cards afterwards 
let cards = [];
let idNums = randomArray();
cards = [...idNums, ...idNums];
let shuffledCards = shuffle(cards);

// get the cards container
const cardContainer = document.getElementById("card-container");

// get the pokemon from the API
export async function getPoke(url) {
    try{
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            // render the card with the
            createCard(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

export function randomArray()
{
    const pairNum = 6;
    const randomArray = [];
    for(let i = 0; i < pairNum; i++) {
        let randomNum = getRandomIntInclusive(1, 900);
        randomArray.push(randomNum);
    }
    return randomArray;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function createPoke(pokemon) {
    const art = document.createElement('img');
    const div = document.getElementById('anyDiv');
    art.src = pokemon.sprites.other["official-artwork"].front_default;
    div.appendChild(art);
}

export function createCard(pokemon) {
    const card = document.createElement("div");
    card.classList.add("poke");
    card.setAttribute("data-name", pokemon.id);
    card.innerHTML = `<div class="prim">
                        <img class="art" src=${pokemon.sprites.front_default}>
                        </div>
                        <div class="sec"></div>`;
                        cardContainer.appendChild(card);
                        card.addEventListener("click", flip);
    }

    // .other["official-artwork"]

for(let i = 0; i <= shuffledCards.length; i++){
    getPoke(`https://pokeapi.co/api/v2/pokemon/${shuffledCards[i]}`)
}

function flip() {
    // if it is already matched or it's the first card, do nothing
    if(matched) return;
    if (this === first) return;

    // to any of the selected cards, add the flip class to rotate
    this.classList.add("flip");

    // if there is no first card set, set it to this
    if(!first) {
        first = this;
        return;
    }
    // otherwise, if it i
    second = this;
    matched = true;

    addScore += 100;
    score.textContent = addScore;
    checkMatch();
}

function checkMatch() {
    let matched = false;
    if (first.dataset.name === second.dataset.name) {
        matched = true;
    }
    
    if(matched) {
        removeClick();
        } else {
            setTimeout(() => {unflip()}, 800);

        };
    }

function removeClick() {
    first.removeEventListener("click", flip);
    second.removeEventListener("click", flip);
    allowPlay();
}

function unflip(){
            first.classList.remove("flip");
            second.classList.remove("flip");
            allowPlay();


}

function allowPlay() {
    first = null;
    second = null;
    matched = false;
}
function shuffle(array) {
    // get each index in the array and set it to a random position
        for (let i = array.length - 1; i > 0; i--) { 
          const j = Math.floor(Math.random() * (i + 1)); 
          [array[i], array[j]] = [array[j], array[i]]; 
        } 
        return array; 
}

