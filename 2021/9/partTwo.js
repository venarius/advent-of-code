const fs = require('fs')

const data = fs.readFileSync('./input.txt', 'utf-8').split('\n').map(d => d.split('').map(d => parseInt(d)))

const basins = []
const exploredCords = []

const getBasin = (num, xIndex, yIndex) => {
  const top = data[yIndex - 1] ? data[yIndex - 1][xIndex] : undefined
  const bottom = data[yIndex + 1] ? data[yIndex + 1][xIndex] : undefined
  const left = data[yIndex][xIndex - 1]
  const right = data[yIndex][xIndex + 1]

  if (num === 9) { return 0 }

  exploredCords.push({ x: xIndex, y: yIndex })
  let size = 1

  if (top !== undefined && top !== 9 && !exploredCords.find(c => c.x === xIndex && c.y === yIndex - 1)) {
    size += getBasin(top, xIndex, yIndex - 1)
  }
  if (bottom !== undefined && bottom !== 9 && !exploredCords.find(c => c.x === xIndex && c.y === yIndex + 1)) {
    size += getBasin(bottom, xIndex, yIndex + 1)
  }
  if (left !== undefined && left !== 9 && !exploredCords.find(c => c.x === xIndex - 1 && c.y === yIndex)) {
    size += getBasin(left, xIndex - 1, yIndex)
  }
  if (right !== undefined && right !== 9 && !exploredCords.find(c => c.x === xIndex + 1 && c.y === yIndex)) {
    size += getBasin(right, xIndex + 1, yIndex)
  }

  return size
}

data.forEach((row, yIndex) => {
  row.forEach((num, xIndex) => {
    const top = data[yIndex - 1] ? data[yIndex - 1][xIndex] : undefined
    const bottom = data[yIndex + 1] ? data[yIndex + 1][xIndex] : undefined
    const left = data[yIndex][xIndex - 1]
    const right = data[yIndex][xIndex + 1]

    if (
      (top === undefined || top > num)
      && (bottom === undefined || bottom > num)
      && (left === undefined || left > num)
      && (right === undefined || right > num)
    ) {
      basins.push(getBasin(num, xIndex, yIndex))
    }
  })
})

console.log(basins.sort((a, b) => b - a).slice(0, 3).reduce((a, b) => a ? a * b : b, 0))