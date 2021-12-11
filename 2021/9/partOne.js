const fs = require('fs')

const data = fs.readFileSync('./input.txt', 'utf-8').split('\n').map(d => d.split('').map(d => parseInt(d)))

let sumSmokePots = 0

data.forEach((row, yIndex) => {
  row.forEach((num, xIndex) => {
    const top = data[yIndex - 1] ? data[yIndex - 1][xIndex] : undefined
    const bottom = data[yIndex + 1] ? data[yIndex + 1][xIndex] : undefined
    const left = data[yIndex][xIndex - 1]
    const right = data[yIndex][xIndex + 1]

    if (
      (top === undefined || top > num)
      && (bottom === undefined || bottom > num)
      && (left === undefined || left > num)
      && (right === undefined || right > num)
    ) { sumSmokePots += num + 1 }
  })
})

console.log(sumSmokePots)