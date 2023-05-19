import { createBoard } from './js/Board'

let width = 10
let height = 10
let bombCount = 10

const createMinesweeper = () => {
    createBoard(width, height, bombCount)
}

createMinesweeper()
