const minuteText = document.getElementById("minuteText");
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
    btnReset.classList.add("display-none");
    millisecondText.innerHTML = " ";
    secondText.innerHTML = " ";
    minuteText.innerHTML = " ";
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

function getSecondsFromMilliseconds(milliseconds) {
    let result = (milliseconds / 100).toFixed();
    if (result <= 9) {
        return "0".concat(result);
    } else {
        return result;
    }
}

function getMinutesFromMilliseconds(seconds) {
    let result = (seconds / 6000).toFixed();
    if (result <= 9) {
        return "0".concat(result);
    } else {
        return result;
    }
}

function convertMsToMinutesSeconds(milliseconds) {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.round((milliseconds % 60000) / 1000);

    return seconds === 60
        ? `${minutes + 1}:00`
        : `${minutes}:${padTo2Digits(seconds)}`;
}

function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
}

btnPlay.addEventListener("click", play);
btnReset.addEventListener("click", reset);
