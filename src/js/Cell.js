import { getAllAround, openAllBoxes } from './matrix'

const clickSound = new Audio('assets/sounds/click.wav')
clickSound.volume = 0.1
const flagSound = new Audio('assets/sounds/flag.wav')
flagSound.volume = 0.1
class Cell {
    constructor(isBomb, coordinates, isFlagged = false) {
        this.isBomb = isBomb
        this.coordinates = coordinates
        this.isFlagged = isFlagged
        this.appElem = document.querySelector('.minesweeper')
    }

    setBoxValue(value) {
        this.value = value
    }

    setCellType() {
        if (this.isBomb) {
            this.setBoxValue('💣')
            return
        }
        const allNeighbors = getAllAround(this.coordinates)
        let bombCount = 0

        allNeighbors.forEach((neighbor) => {
            if (neighbor === 1 || neighbor.isBomb) {
                bombCount++
            }
        })

        if (bombCount) {
            this.setBoxValue(bombCount)
        }
    }

    showBoxValue() {
        this.boxElem.innerHTML = this.value || ''
    }

    setFlag() {
        const closedItem = this.boxElem.classList.contains('init')
        flagSound.play()
        if (!this.isFlagged && closedItem) {
            this.boxElem.innerHTML = '🚩'
            this.isFlagged = true
        } else if (this.isFlagged && closedItem) {
            this.boxElem.innerHTML = ''
            this.isFlagged = false
        }
    }

    open() {
        this.isOpenned = true
        this.boxElem.classList.remove('init')
        this.showBoxValue()
    }

    onBoxClick(allowOpenNumber = false) {
        clickSound.play()
        if (this.isFlagged) {
            this.setFlag(false)
            return
        }

        if (!this.value && !this.isOpenned) {
            this.open()
            const allNeighbors = getAllAround(this.coordinates)
            allNeighbors.forEach((neighbor) => {
                if (!neighbor.isOpenned) {
                    neighbor.onBoxClick(true)
                }
            })
        } else if ((this.value && allowOpenNumber) || typeof this.value === 'number') {
            this.open()
        } else if (this.isBomb) {
            openAllBoxes()
        }

        this.showBoxValue()
    }

    createBoxOnArea() {
        const boxElem = document.createElement('div')
        boxElem.classList.add('cell')
        boxElem.classList.add('init')

        if (this.value) {
            boxElem.classList.add(`bomb-${this.value}`)
        }

        this.boxElem = boxElem
        this.boxElem.addEventListener('click', (e) => {
            this.onBoxClick()
        })
        this.boxElem.addEventListener('contextmenu', (e) => {
            e.preventDefault()
            this.boxElem.classList.toggle('flag')
            this.setFlag(true)
        })
        this.appElem.appendChild(boxElem)
    }
}
const createCell = (isBomb, coordinates) => {
    const newCell = new Cell(isBomb, coordinates)
    newCell.setCellType()
    newCell.createBoxOnArea()
    return newCell
}

export { createCell }
