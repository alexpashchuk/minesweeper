import { createBox } from './Box'
import { getRandomNum } from './utils'
let matrix = new Set()

class Board {
    constructor(width, height, bombCount) {
        this.width = width
        this.height = height
        this.bombCount = bombCount
        this.boardElement
        this.wrapper
        this.modal
        this.startText
        // this.firstTerm = false
    }

    render() {
        const root = document.getElementById('root')

        this.modal = document.createElement('div')
        this.modal.classList.add('modal')

        this.startText = document.createElement('h2')
        this.startText.innerHTML = 'Click on the field to start game'
        this.modal.appendChild(this.startText)

        this.boardElement = document.createElement('div')
        this.boardElement.classList.add('minesweeper')

        this.wrapper = document.createElement('div')
        this.wrapper.classList.add('wrapper')

        root.appendChild(this.wrapper)
        this.wrapper.appendChild(this.boardElement)
        this.wrapper.appendChild(this.modal)

        this.createGameArray()
    }

    createGameArray() {
        matrix = Array.from({ length: this.height }, () => {
            return Array.from({ length: this.width }, () => {
                return 0
            })
        })
        matrix.forEach((line, y) => {
            line.forEach((item, x) => {
                const newBox = createBox(`${x}` + `${y}`, { x, y }, Boolean(item))
                matrix[y][x] = newBox
            })
        })
        this.addClickBoard()
    }

    addBomb({ id }) {
        let currentBombCount = this.bombCount
        let clickId = id
        while (currentBombCount) {
            const matrixHeight = matrix.length - 1
            const matrixWidth = matrix[0].length - 1

            const x = getRandomNum(0, matrixWidth).toString()
            const y = getRandomNum(0, matrixHeight).toString()
            let randomId = `${x}` + `${y}`
            const isValid = clickId !== randomId
            const matrixItem = matrix[y][x]

            if (!matrixItem.isBomb && isValid) {
                matrix[y][x].isBomb = true
                currentBombCount--
            }
        }

        this.rerender()
    }

    rerender() {
        const cells = document.querySelectorAll('.cell')
        matrix.forEach((line, y) => {
            line.forEach((item, x) => {
                item.setCellType()
                item.clickBoxHandler()
                // item.setCellType()
                // if (matrix[y][x].isBomb) {
                //     const currentId = matrix[y][x].id
                //     cells.forEach((el) => {
                //         if (el.dataset.id === currentId) {
                //             el.classList.add('bomb')
                //         }
                //     })
                // }
            })
        })
    }

    addClickBoard() {
        this.boardElement.addEventListener(
            'click',
            (e) => {
                this.modal.classList.add('closed')
                this.boardElement.classList.add('start')
                this.addBomb(e.target.dataset)
                // if (!this.firstTerm) {
                //     this.firstTerm = true
                //     this.addBomb(e.target.dataset)
                // }
            },
            { once: true }
        )
    }
}

const createBoard = (width, height, bombsCount) => {
    const newBoard = new Board(width, height, bombsCount)
    newBoard.render()
    return newBoard
}

export { createBoard, matrix }
