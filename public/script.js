const breakIntervals = [5, 15, 17, 38];
const gameIntervals = [25, 52];

const gameAudio = new Audio('media/game.wav');
const breakAudio = new Audio('media/break.wav');

const startTimer = (mins) => {
    const timerElement = document.getElementById('timer');
    let seconds = 60 * mins;

    const x = setInterval(() => {
        timerElement.innerText = `${Math.floor(seconds/60)}:${seconds%60}`
        seconds = seconds - 1;

        if(seconds <= 0) {
            clearInterval(x);
            if(breakIntervals.includes(mins)) {
                breakAudio.play();
            } else if(gameIntervals.includes(mins)) {
                gameAudio.play();
            }
        }
    }, 1000)
}

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', () => startTimer(button.id.slice(0, -3)))
})
