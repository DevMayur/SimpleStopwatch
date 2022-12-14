const secondText = document.getElementById("secondText");
const millisecondText = document.getElementById("millisecondText");
const btnReset = document.getElementById("btnReset");
const btnPlay = document.getElementById("btnPlay");

let isPlay = false;
let millisecCounter = 0;
let millisec;

const play = () => {
    if (!isPlay) {
        btnPlay.innerHTML = "<h1>STOP</h1>";
        millisec = setInterval(() => {
            millisecondText.innerHTML = `${getNormalizedMilliseconds(
                millisecCounter + 1
            )}`;
            secondText.innerHTML = `${convertMsToMinutesSeconds(
                millisecCounter
            )} : `;
            millisecCounter = millisecCounter + 81;
        }, 81);
        isPlay = true;
    } else {
        btnPlay.innerHTML = "<h1>START</h1>";
        clearInterval(millisec);
        isPlay = false;
    }
    toggleButton();
};

const reset = () => {
    isPlay = false;
    btnPlay.innerHTML = "<h1>START</h1>";
    millisecondText.innerHTML = " ";
    secondText.innerHTML = " ";
    millisecCounter = 0;
    clearInterval(millisec);
};

function toggleButton() {
    btnReset.classList.remove("display-none");
}

function getNormalizedMilliseconds(milliseconds) {
    let result = (milliseconds % 100).toFixed();
    if (result <= 9) {
        return "0".concat(result);
    } else {
        return result;
    }
}


function convertMsToMinutesSeconds(milliseconds) {
    //Math.floor will return rounded value to milliseconds / 600000 in terms of minutes
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.round((milliseconds % 60000) / 1000);

    return seconds === 60
        ? `${minutes + 1}:00`
        : `${minutes}:${padTo2Digits(seconds)}`;
}

function padTo2Digits(num) {
    //padStart will make number of two digits
    return num.toString().padStart(2, "0");
}

btnPlay.addEventListener("click", play);
btnReset.addEventListener("click", reset);
