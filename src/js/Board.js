import { createBox } from './Box'
import { colors, randomInteger, updateFlags } from './utils'
import { initTimer } from '../index'

const clickSound = new Audio('./assets/sounds/click.wav')
clickSound.volume = 0.1
const flagSound = new Audio('./assets/sounds/flag.wav')
flagSound.volume = 0.1
const unflagSound = new Audio('./assets/sounds/unflag.wav')
unflagSound.volume = 0.1
const winSound = new Audio('./assets/sounds/win.wav')
winSound.volume = 0.1
const lostSound = new Audio('./assets/sounds/lost.wav')
lostSound.volume = 0.1
class Board {
    constructor(width, height, bombs, restartBtn, modal, modalText, flagElem, timerId) {
        this.width = width
        this.height = height
        this.bombsCount = bombs
        this.field = []
        this.boardElem
        this.cells
        this.firstTerm = false
        this.flags = bombs
        this.restartBtn = restartBtn
        this.modal = modal
        this.modalText = modalText
        this.flagElem = flagElem
        this.timerId = timerId
    }

    render() {
        const root = document.querySelector('.root')
        this.boardElem = document.createElement('div')
        this.boardElem.classList.add('board', this.width === 10 ? 'easy' : this.width === 15 ? 'medium' : 'hard')
        root.appendChild(this.boardElem)
        this.createGameArray()
    }

    createGameArray() {
        let id = 0
        for (let row = 0; row < this.height; row++) {
            this.field[row] = []
            for (let col = 0; col < this.width; col++) {
                const newCell = createBox(id, this.boardElem)
                id += 1
                this.field[row][col] = newCell
            }
        }
        this.cells = document.querySelectorAll('.cell')
        this.addClickHandler()
    }

    generateField(num) {
        initTimer()
        const id = +num
        let randomArray = []
        while (randomArray.length < this.bombsCount) {
            let randomNumber = randomInteger(0, this.width * this.height - 1)
            if (randomNumber !== id && !randomArray.includes(randomNumber)) {
                randomArray.push(randomNumber)
            }
        }

        randomArray.forEach((el) => {
            for (let row = 0; row < this.height; row++) {
                for (let col = 0; col < this.width; col++) {
                    if (this.field[row][col].id === el) {
                        this.field[row][col].bomb = true
                    }
                }
            }
        })

        for (let row = 0; row < this.height; row++) {
            for (let col = 0; col < this.width; col++) {
                let num = 0

                if (this.field[row][col - 1] && this.field[row][col - 1].bomb) num++
                if (this.field[row][col + 1] && this.field[row][col + 1].bomb) num++
                if (this.field[row - 1]) {
                    if (this.field[row - 1][col - 1] && this.field[row - 1][col - 1].bomb) num++
                    if (this.field[row - 1][col] && this.field[row - 1][col].bomb) num++
                    if (this.field[row - 1][col + 1] && this.field[row - 1][col + 1].bomb) num++
                }
                if (this.field[row + 1]) {
                    if (this.field[row + 1][col - 1] && this.field[row + 1][col - 1].bomb) num++
                    if (this.field[row + 1][col] && this.field[row + 1][col].bomb) num++
                    if (this.field[row + 1][col + 1] && this.field[row + 1][col + 1].bomb) num++
                }

                if (!this.field[row][col].bomb) {
                    this.field[row][col].number = num
                }
            }
        }

        this.revealCell(id)
    }

    revealCell(id) {
        for (let row = 0; row < this.height; row++) {
            for (let col = 0; col < this.width; col++) {
                if (this.field[row][col].id == id) {
                    this.cells[id].classList.add('opened')
                    this.field[row][col].opened = true
                    if (this.field[row][col].bomb) {
                        this.cells[id].classList.add('blow')
                        lostSound.play()
                        this.endGame()
                        return
                    } else {
                        clickSound.play()
                    }
                    if (this.field[row][col].number) {
                        let num = this.field[row][col].number
                        this.cells[id].innerHTML = num
                        this.cells[id].classList.add(colors[num])
                    } else if (
                        !this.field[row][col].number ||
                        (this.field[row][col].number === 0 &&
                            !this.field[row][col].opened &&
                            !this.field[row][col].flagged)
                    ) {
                        let nextReveal = []
                        if (
                            this.field[row + 1] &&
                            !this.field[row + 1][col].opened &&
                            !this.field[row + 1][col].flagged
                        )
                            nextReveal.push(this.field[row + 1][col].id)
                        if (
                            this.field[row - 1] &&
                            !this.field[row - 1][col].opened &&
                            !this.field[row - 1][col].flagged
                        )
                            nextReveal.push(this.field[row - 1][col].id)
                        if (
                            this.field[row][col + 1] &&
                            !this.field[row][col + 1].opened &&
                            !this.field[row][col + 1].flagged
                        )
                            nextReveal.push(this.field[row][col + 1].id)
                        if (
                            this.field[row][col - 1] &&
                            !this.field[row][col - 1].opened &&
                            !this.field[row][col - 1].flagged
                        )
                            nextReveal.push(this.field[row][col - 1].id)
                        nextReveal.forEach((el) => {
                            this.revealCell(el)
                        })
                    }
                }
            }
        }
        this.winGame()
    }

    cellFlagged(id) {
        for (let row = 0; row < this.height; row++) {
            for (let col = 0; col < this.width; col++) {
                if (this.field[row][col].id === +id) {
                    if (this.field[row][col].flagged) {
                        this.cells[id].innerHTML = ''
                        this.flags += 1
                        this.field[row][col].flagged = !this.field[row][col].flagged
                        unflagSound.play()
                    } else if (this.flags !== 0) {
                        const id = this.field[row][col].id
                        this.cells[id].innerHTML = '🚩'
                        this.flags -= 1
                        this.field[row][col].flagged = !this.field[row][col].flagged
                        flagSound.play()
                    }
                    updateFlags(this.flagElem, this.flags)
                }
            }
        }
    }
    winGame() {
        let closeCells = 0
        this.field.forEach((arr) => {
            arr.forEach((el) => {
                if (!el.opened) {
                    closeCells += 1
                }
            })
        })
        if (closeCells === +this.bombsCount) {
            winSound.play()
            clearInterval(this.timerId)
            this.restartBtn.innerHTML = '😎'
            this.modal.classList.add('active')
            this.modalText.innerHTML = 'You Win'
        }
    }

    endGame() {
        for (let row = 0; row < this.height; row++) {
            for (let col = 0; col < this.width; col++) {
                if (this.field[row][col].flagged && !this.field[row][col].bomb) {
                    const id = this.field[row][col].id
                    this.cells[id].innerHTML = ''
                    this.cells[id].innerHTML = '💣'
                }
                if (this.field[row][col].bomb && !this.field[row][col].flagged) {
                    const id = this.field[row][col].id
                    this.cells[id].innerHTML = '💥'
                }
            }
        }
        this.restartBtn.innerHTML = '🙁'
        lostSound.play()
        clearInterval(this.timerId)
        this.modal.classList.add('active')
        this.modalText.innerHTML = 'You Lost'
    }

    addClickHandler() {
        this.boardElem.oncontextmenu = (event) => {
            event.preventDefault()
            this.cellFlagged(event.target.closest('div').dataset.id)
        }

        this.boardElem.addEventListener('click', (event) => {
            event.preventDefault()
            if (!this.firstTerm) {
                this.firstTerm = true
                this.generateField(event.target.dataset.id)
            } else {
                this.revealCell(event.target.dataset.id)
            }
        })
    }
}

const createBoard = (width, height, bombs, restartBtn, modal, modalText, flagElem, timerId) => {
    const newBoard = new Board(width, height, bombs, restartBtn, modal, modalText, flagElem, timerId)
    newBoard.render()
    return newBoard
}

export { createBoard }
