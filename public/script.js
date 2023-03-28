const breakIntervals = [5, 15, 17, 38];
const gameIntervals = [25, 52];

const gameAudio = new Audio('media/game.wav');
const breakAudio = new Audio('media/break.wav');
const extraAudio = new Audio('media/extra.mp3');


let interval;

const startTimer = (mins) => {
    const timerElement = document.getElementById('timer');
    clearInterval(interval);

    mins = Number(mins);
    if(isNaN(mins)) {
        return;
    }
    let seconds = 60 * mins;

    interval = setInterval(() => {
        seconds = seconds - 1;
        timerElement.innerText = `${Math.floor(seconds/60)}:${seconds%60}`

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
