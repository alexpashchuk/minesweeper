function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1)
    return Math.round(rand)
}

const colors = {
    1: 'blue',
    2: 'green',
    3: 'red',
    4: 'dark-blue',
    5: 'brown',
    6: 'turquoise',
    7: 'black',
    8: 'white'
}

function updateFlags(elem, num) {
    let flag
    if (num < 10) {
        flag = `00${num}`
    } else if (num <= 99) {
        flag = `0${num}`
    } else {
        flag = `${num}`
    }
    elem.innerText = flag
}

export { randomInteger, colors, updateFlags }
