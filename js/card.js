// variables to compare cards
let first;
let second;
let matched = false;
let addScore = 0;
let matchCount = 0;



const score = document.getElementById("score");
score.textContent = addScore;

// Variables that store the arrays to create the cards afterwards 
let cards = [];
let idNums = randomArray();
cards = [...idNums, ...idNums];
console.log(cards);
let shuffledCards = shuffle(cards);

// get the cards container
const cardContainer = document.getElementById("card-container");

// get the pokemon from the API
export async function getPoke(url) {
    try{
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            // render the card with the createCard function
            createCard(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

async function getDetails(url) {
    try{
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            // render the card with the createCard function
            pokemonDetails(data);
            console.log(data);
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

function pokemonDetails(pokemon) {
    const div = document.getElementById("anyDiv");
    const sideName = document.getElementById("sideName");
    const sideType = document.getElementById("sideType");
    sideName.textContent = pokemon.name;
    sideType.textContent = pokemon.types[0].type.name;
    div.innerHTML = `<img class="details" src=${pokemon.sprites.other["official-artwork"].front_default}>`;
}

export function createCard(pokemon) {
    const card = document.createElement("div");
    card.classList.add("poke");
    card.setAttribute("data-id", pokemon.id);
    card.setAttribute("data-name", pokemon.name);
    card.innerHTML = `<div class="prim">
                        <img class="art" src=${pokemon.sprites.front_default}>
                        </div>
                        <div class="sec"></div>`;
                        cardContainer.appendChild(card);
                        card.addEventListener("click", flip);
    }

for(let i = 0; i <= shuffledCards.length-1; i++){
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
    checkMatch();
}

function checkMatch() {
    let matched = false;
    if (first.dataset.id === second.dataset.id) {
        matched = true;
        addScore += 100;
        score.textContent = addScore;
        getDetails(`https://pokeapi.co/api/v2/pokemon/${+first.dataset.id}`);

    }

    
    if(matched) {
        removeClick();
        } else {
            setTimeout(() => {unflip()}, 800);
            addScore -= 50;
            score.textContent = addScore;
        };
    }

function removeClick() {
    first.removeEventListener("click", flip);
    second.removeEventListener("click", flip);
    allowPlay();
    matchCount++;
        if (matchCount === 6){
            setTimeout(()=>{
                let username = prompt('You won! Please type your name: ');
                window.localStorage.setItem("username", username);
                window.localStorage.setItem("score", addScore)}, 600);
        }
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
    let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}



