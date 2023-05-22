import { initGameLayout } from './js/initGameLayout'
import { createBoard } from './js/Board'
import { updateFlags } from './js/utils'

const restartSound = new Audio('./assets/sounds/restart.wav')
restartSound.volume = 0.1
const switchOnSound = new Audio('./assets/sounds/switch-on.wav')
switchOnSound.volume = 0.1
const switchOffSound = new Audio('./assets/sounds/switch-off.wav')
switchOffSound.volume = 0.1

let bombs = 10
let timerId
let elapsedTime
let currentLevel = 'easy'
let theme = 'light'

const gameLevel = {
    easy: {
        height: 10,
        width: 10
    },
    medium: {
        height: 15,
        width: 15
    },
    hard: {
        height: 25,
        width: 25
    }
}

initGameLayout()
const root = document.querySelector('.root')
const body = document.querySelector('body')

const input = document.getElementById('bombs-value')
const timerElem = document.querySelector('.timer')
const flagElem = document.querySelector('.flag')
const restartBtn = document.querySelector('.restart')
input.innerHTML = bombs

const createMinesweeper = () => {
    clearInterval(timerId)
    root.innerHTML = ''
    elapsedTime = 0
    timerElem.innerText = elapsedTime.toString().padStart(3, '0')
    createBoard(
        gameLevel[`${currentLevel}`].height,
        gameLevel[`${currentLevel}`].width,
        bombs,
        restartBtn,
        flagElem,
        timerId
    )
    updateFlags(flagElem, bombs)
}

restartBtn.addEventListener('click', function () {
    createMinesweeper(currentLevel)
    restartBtn.innerHTML = '🙂'
    restartSound.play()
    // document.getElementById('bombs').value = '10'
    // input.innerHTML = '10'
    // flagElem.innerHTML = '010'
})

document.getElementById('bombs').addEventListener('input', function () {
    input.innerHTML = this.value
})

document.getElementById('bombs').addEventListener('change', function () {
    bombs = this.value
    createMinesweeper()
})

document.getElementById('level').addEventListener('change', function (e) {
    currentLevel = e.target.value
    createMinesweeper()
})

document.getElementById('switch').addEventListener('change', function () {
    if (this.checked) {
        body.classList.add('dark')
        switchOnSound.play()
    } else {
        body.classList.remove('dark')
        switchOffSound.play()
    }
})

const initTimer = () => {
    timerId = setInterval(function () {
        elapsedTime += 1
        timerElem.innerText = elapsedTime.toString().padStart(3, '0')
    }, 1000)
}

window.onload = function () {
    createMinesweeper(currentLevel)
}

export { initTimer }
