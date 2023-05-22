class Box {
    constructor(id, field) {
        this.id = id
        this.field = field
        this.bomb = false
        this.opened = false
        this.number = false
        this.flagged = false
    }

    addToArray() {
        const cell = document.createElement('div')
        cell.classList.add('cell')
        cell.dataset.id = this.id
        this.field.appendChild(cell)
    }
}
const createBox = (id, field) => {
    const newBox = new Box(id, field)
    newBox.addToArray()
    return newBox
}

export { createBox }
