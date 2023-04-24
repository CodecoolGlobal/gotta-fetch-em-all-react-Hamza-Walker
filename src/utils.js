export function capitalize(word) {
    return `${word[0].toUpperCase()}${word.slice(1)}`
}

export function pickItemFromArray(array) {
    const roundedIndex = Math.floor(Math.random() * array.length)
    return array[roundedIndex]
}