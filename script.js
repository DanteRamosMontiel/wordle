let currentWord = 0; //0-4
let currentLetter = 0; //0-4

const letters = document.querySelectorAll(".letter");

document.addEventListener("keydown", (event) => {
    const k = event.key.toUpperCase();

    const start = currentWord * 5;
    const end = start + 5;

    if (start >= letters.length) return; //vemos q no salga de rango

    //LETRAS
    if ("ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".includes(k)) {
        if (currentLetter < 5) {
            letters[start+currentLetter].textContent = k;
            currentLetter++;
        }
    }

    //BACKSPACE
    else if (k === "BACKSPACE") {
        if (currentLetter > 0) {
            currentLetter--;
            letters[start+currentLetter].textContent = "";
        }
    }

    //ENTER
    else if(k === "ENTER"){
        if (currentWord > 4 || currentLetter < 5){
            return;
        }else{
            currentWord++;
            currentLetter = 0;
        }
    }
});