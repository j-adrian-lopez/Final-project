import { getRandomIntInclusive } from "./utils.js";
// variables to compare cards
let first;
let second;
let matched = false;
let addScore = 0;
let matchCount = 0;

// get the score element to update it as the game is played
const score = document.getElementById("score");
score.textContent = addScore;

// Variables that store the arrays to create the cards afterwards 
let cards = [];
let idNums = randomArray();
cards = [...idNums, ...idNums];
console.log(cards);
let shuffledCards = shuffle(cards);
console.log(shuffledCards);

// get the cards container
const cardContainer = document.getElementById("card-container");

// get the pokemon from the API
export async function getPoke(url) {
    try{
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            // render the card with the createCard function
            console.log("inPoke", data.id);
            return data;
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
            // render the details with pokemondetails
            pokemonDetails(data);
            console.log(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

// create a random array by selecting random numbers between 1 and 900. Use this to call the API
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


// render the details at the end of the page
function pokemonDetails(pokemon) {
    // get the div at the end
    const div = document.getElementById("anyDiv");
    // get the two text boxes
    const sideName = document.getElementById("sideName");
    const sideType = document.getElementById("sideType");
    // fill the names and type
    sideName.textContent = pokemon.name;
    sideType.textContent = pokemon.types[0].type.name;
    // Insert the image
    div.innerHTML = `<img class="details" src=${pokemon.sprites.other["official-artwork"].front_default}>`;
}

// create the cards for the game
export function createCard(pokemon) {
    const card = document.createElement("div");
    card.classList.add("poke");
    card.setAttribute("data-id", pokemon.id);
    card.setAttribute("data-name", pokemon.name);
    // create cards html
    card.innerHTML = `<div class="prim">
                        <img class="art" src=${pokemon.sprites.front_default}>
                        </div>
                        <div class="sec"></div>`;
                        cardContainer.appendChild(card);
                        card.addEventListener("click", flip);
                    }

// call API for each element in the shuffledCards array and render cards
for(let i = 0; i <= shuffledCards.length-1; i++){
    getPoke(`https://pokeapi.co/api/v2/pokemon/${shuffledCards[i]}`)
    .then((data) => {
        console.log("forloop", shuffledCards[i]);
        createCard(data);
    });
    ;};
    


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

// check if the two cards match using the dataset with id
function checkMatch() {
    let matched = false;
    if (first.dataset.id === second.dataset.id) {
        matched = true;
        // if match, increase the score and display
        addScore += 100;
        score.textContent = addScore;
        // show the details of the matched cards
        getDetails(`https://pokeapi.co/api/v2/pokemon/${+first.dataset.id}`);
    }

    // if there is a match, remove the eventListener from the cards
    if(matched) {
        removeClick();
        } else {
            // if there is not a match, dock points and unflip the cards
            setTimeout(() => {unflip()}, 800);
            addScore -= 50;
            score.textContent = addScore;
        };
    }
// function to remove the event. If all cards are flipped, make a prompt to save the player's game
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

// unflip cards
function unflip(){
    first.classList.remove("flip");
    second.classList.remove("flip");
    allowPlay();
}

// restart the first and second elements, to allow the player keep playing
function allowPlay() {
    first = null;
    second = null;
    matched = false;
}

function shuffle(array) {
    let currentIndex = array.length;
    let randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
    array[randomIndex], array[currentIndex]];
  }

  return array;
}



