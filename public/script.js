const breakIntervals = [5, 15, 17, 38];
const gameIntervals = [25, 52];

const gameAudio = new Audio('media/game.wav');
const breakAudio = new Audio('media/break.wav');
const extraAudio = new Audio('media/extra.mp3');


const cancelElement = document.getElementById('cancel');

let interval;

cancelElement.addEventListener('click', () => {
    clearInterval(interval);
})

const twoDigits = (num) => ('0' + num).slice(-2);

const historyElement = document.getElementById('history');
const appendHistory = (emoji) => {
    historyElement.innerText = emoji + historyElement.innerText;
    localStorage.history = historyElement.innerText;
}
const restoreHistory = () => {
    if(localStorage.history)
        historyElement.innerText = localStorage.history;
    else
        localStorage.history = '';
}
restoreHistory();

const startTimer = (mins) => {
    const timerElement = document.getElementById('timer');
    clearInterval(interval);

    mins = Number(mins);
    if(isNaN(mins)) {
        return;
    }
    let seconds = 60 * mins;
    let currentSeconds = Date.now()/1000;
    const finalSeconds = currentSeconds + seconds;

    interval = setInterval(() => {
        currentSeconds = Date.now()/1000;
        seconds = Math.round(Math.max(0, finalSeconds - currentSeconds));
        timerElement.innerText = `${twoDigits(Math.floor(seconds/60))}:${twoDigits(seconds%60)}`

        if(breakIntervals.includes(mins)) {
            appendHistory('💤');
        } else if(gameIntervals.includes(mins)) {
            appendHistory('💪');
        }

        if(seconds <= 0) {
            if(breakIntervals.includes(mins)) {
                breakAudio.play();
            } else if(gameIntervals.includes(mins)) {
                gameAudio.play();
            } else {
                extraAudio.play();
            }
            clearInterval(interval);
        }
    }, 1000)
}

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', () => startTimer(button.id.slice(0, -3)))
})
