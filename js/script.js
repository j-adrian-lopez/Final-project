import { loadHeaderFooter } from "./utils.js";
import { randomArray } from "./card.js";
const lastUser = document.getElementById("last-user");
const lastScore = document.getElementById("last-score")


if (!window.localStorage.getItem("username")) {
	lastUser.textContent = "Waiting for the first Pokémon Master";
    lastScore.textContent = 0; 
} else {
    lastUser.textContent = window.localStorage.getItem("username");
    lastScore.textContent = window.localStorage.getItem("score"); 
}
loadHeaderFooter();



