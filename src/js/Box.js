import { matrix } from './Board'
import { getAllAround, openAllBoxes } from './matrix'

const clickSound = new Audio('assets/sounds/click.wav')
clickSound.volume = 0.1
const flagSound = new Audio('assets/sounds/flag.wav')
flagSound.volume = 0.1
class Box {
    constructor(id, coordinates, isBomb) {
        this.id = id
        this.isBomb = isBomb
        this.coordinates = coordinates
        this.isFlagged = false
    }

    setBoxValue(value) {
        this.value = value

        if (this.value) {
            this.boxElem.classList.add(`bomb-${this.value}`)
        }
    }

    setCellType() {
        const { x, y } = this.coordinates
        if (matrix[y][x].isBomb) {
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
        this.setCellType()
        const { x, y } = this.coordinates
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
        } else if (matrix[y][x].isBomb) {
            openAllBoxes()
        }
        this.showBoxValue()
    }

    clickBoxHandler() {
        this.boxElem.addEventListener('click', (e) => {
            this.onBoxClick()
        })
        this.boxElem.addEventListener('contextmenu', (e) => {
            e.preventDefault()
            this.boxElem.classList.toggle('flag')
            this.setFlag(true)
        })
    }

    createBoxOnArea() {
        const appElem = document.querySelector('.minesweeper')
        const boxElem = document.createElement('div')
        boxElem.classList.add('cell')
        boxElem.classList.add('init')
        boxElem.dataset.id = this.id
        appElem.appendChild(boxElem)
        this.boxElem = boxElem
    }
}
const createBox = (id, coordinates, isBomb) => {
    const newBox = new Box(id, coordinates, isBomb)
    newBox.createBoxOnArea()
    return newBox
}

export { createBox }