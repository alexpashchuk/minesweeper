const initMatrix = (width, height) => {
    const matrix = Array.from({ length: height }, () => {
        return Array.from({ length: width }, () => {
            return 0
        })
    })
    console.log('matrix')
    console.log(matrix)
}

export { initMatrix }
