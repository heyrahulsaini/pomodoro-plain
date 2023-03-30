const breakIntervals = [5, 15, 17, 38];
const gameIntervals = [25, 52];

const gameAudio = new Audio('media/game.wav');
const breakAudio = new Audio('media/break.wav');
const extraAudio = new Audio('media/extra.mp3');


let interval;

const twoDigits = (num) => ('0' + num).slice(-2);

const startTimer = (mins) => {
    const timerElement = document.getElementById('timer');
    const historyElement = document.getElementById('history');
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
            historyElement.innerText += '^';
        } else if(gameIntervals.includes(mins)) {
            historyElement.innerText += '*';
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
