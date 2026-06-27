let secretWord = "LINUX";
//auxWord = secretWord.toLowerCase();

let gameover = true;

let currentWord = 0; //0-4
let currentLetter = 0; //0-4

let start = -1;

//input and submit button + error
const overlay = document.querySelector(".overlay");
const overlayInput = document.querySelector(".input");
const submitButton = document.querySelector(".submit");
const error = document.querySelector(".error");

//main letters
const letters = document.querySelectorAll(".letter");

//result disclaimer
const sword = document.querySelector(".sword");
const fullDisclaimer = document.querySelector(".full-disclaimer");
const disclaimer = document.querySelector(".disclaimer");

//bottom keyboard
const keyboard = document.querySelector(".kb-container");


//checks if user won
function win() {
    gameover = true;
    sword.style.color = "#43a047";
    disclaimer.textContent = "YOU WON!";
    fullDisclaimer.style.color = "white";
}
//checks if user lost
function lose() {
    gameover = true;
    sword.style.color = "red";
    disclaimer.textContent = "YOU LOST :(";
    fullDisclaimer.style.color = "white";
}
//checks if an specific char in part of an string
function auxIncludes(char) {
    let aux = char.toLowerCase();

    for (let i = 0; i < auxWord.length; i++) {
        if (auxWord[i] === aux) {
            auxWord = auxWord.slice(0, i) + "-" + auxWord.slice(i+1);
            return true;
        }
    }

    return false;
}
//word check behavior
function checkWord() {
    auxWord = secretWord.toLowerCase();
    let found = 0;
    let k;

    //first lap for greens
    for (let i = 0; i < 5; i++) {
        let actualLetter = letters[start + i];
        k = document.querySelector(`[data-key="${actualLetter.textContent.toLowerCase()}"]`);

        if (actualLetter.textContent === secretWord[i]) {
            k.classList.remove("semiknown");
            k.classList.add("known");
            actualLetter.classList.remove("unplayed");
            actualLetter.classList.add("known");
            auxWord = auxWord.slice(0,i) + "-" + auxWord.slice(i+1);
            found++;
        }
    }

    //check if won
    if (found === 5) {
        win();
        return;
    }

    //second lap for yellows/greys
    for (let i = 0; i < 5; i++) {
        let actualLetter = letters[start + i];
        k = document.querySelector(`[data-key="${actualLetter.textContent.toLowerCase()}"]`);

        if (actualLetter.classList.contains("known")) continue;

        if (auxIncludes(actualLetter.textContent)) {
            if(!(k.classList.contains("known"))){
                k.classList.add("semiknown");
            }
            actualLetter.classList.remove("unplayed");
            actualLetter.classList.add("semiknown");
        } else {
            if(!(k.classList.contains("known")) && !(k.classList.contains("semiknown"))){
                k.classList.add("wrong");
            }
            actualLetter.classList.remove("unplayed");
            actualLetter.classList.add("unknown");
        }
    }
}
//writes the pressed key on the screen
function write(k){
    start = currentWord * 5;

    if (start >= letters.length) return; //vemos q no salga de rango

    //LETRAS
    if ("ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".includes(k)) {
        if (currentLetter < 5) {
            letters[start + currentLetter].textContent = k;
            currentLetter++;
        }
    }

    //BACKSPACE
    else if (k === "BACKSPACE" || k === "⌫") {
        if (currentLetter > 0) {
            currentLetter--;
            letters[start + currentLetter].textContent = "";
        }
    }

    //ENTER
    else if (k === "ENTER" || k === "↩") {
        if (currentWord > 4 || currentLetter < 5) {
            return;
        } else {
            checkWord();
            currentWord++;
            currentLetter = 0;
            if (currentWord === 5 && !gameover) lose();
        }
    }
}
//checks that then input is valid
function checkInput(input) {
    input = input.trim();
    if (input.length!==5) return false;
    const l = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

    for(let i=0; i<5; i++){
        if(!(l.includes(input[i]))) return false;
    }

    return true;
}

//listener to overlay submit button
submitButton.addEventListener("click", () => {
    const i = overlayInput.value.toUpperCase();
    if(checkInput(i)){
        overlay.style.display = "none";
        secretWord = i;
        sword.textContent = secretWord;
        auxWord = secretWord.toLowerCase();
        gameover = false;
    }else{
        error.style.color = "red";
    }
});

//listener to write the pressed key on fisic kb and press virtual key
document.addEventListener("keydown", (event) => {
    if (gameover) return;
    write(event.key.toUpperCase());

    const k = document.querySelector(`[data-key="${event.key.toLowerCase()}"]`);
    if(k){
        k.classList.add("active");
    }
});

//listener to release the virtual key
document.addEventListener("keyup", (event) => {
    const k = document.querySelector(`[data-key="${event.key.toLowerCase()}"]`);
    if(k){
        k.classList.remove("active");
    }
})

//listener to write the pressed key on screen kb
keyboard.addEventListener("click", (event) => {
    if (gameover) return;
    const k = event.target;
    if(k.classList.contains("key")){
        write(k.textContent);
    }
})