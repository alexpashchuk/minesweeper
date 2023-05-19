import { matrix } from './Board'

function getAllAround(coordinates) {
    const { x, y } = coordinates
    const neighbor1 = matrix[y - 1]?.[x]
    const neighbor2 = matrix[y - 1]?.[x + 1]
    const neighbor3 = matrix[y]?.[x + 1]
    const neighbor4 = matrix[y + 1]?.[x + 1]
    const neighbor5 = matrix[y + 1]?.[x]
    const neighbor6 = matrix[y + 1]?.[x - 1]
    const neighbor7 = matrix[y]?.[x - 1]
    const neighbor8 = matrix[y - 1]?.[x - 1]

    return [neighbor1, neighbor2, neighbor3, neighbor4, neighbor5, neighbor6, neighbor7, neighbor8].filter(
        (item) => typeof item !== 'undefined'
    )
}

function openAllBoxes() {
    matrix.forEach((matrixLine) => {
        matrixLine.forEach((box) => {
            if (box.isBomb) {
                box.open()
            }
        })
    })
}

export { getAllAround, openAllBoxes }
