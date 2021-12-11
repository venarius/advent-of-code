const fs = require('fs')

let pipes = fs.readFileSync('./input.txt', 'utf-8').split('\n').map((line) => {
  const [xCords, yCords] = line.split(' -> ')
  const [x1, y1] = xCords.split(',').map(cord => parseInt(cord))
  const [x2, y2] = yCords.split(',').map(cord => parseInt(cord))

  return { x1, y1, x2, y2 }
})

const grid = []

function addToGrid (x, y) {
  const hasExisting = grid.find(g => g[0] === x && g[1] === y)
  hasExisting ? hasExisting[2] += 1 : grid.push([x, y, 1])
}

pipes.forEach((pipe) => {
  let x = pipe.x1
  let y = pipe.y1

  addToGrid(x, y)

  while (x !== pipe.x2 || y !== pipe.y2) {
    if (x < pipe.x2) { x += 1 }
    if (x > pipe.x2) { x -= 1 }

    if (y < pipe.y2) { y += 1 }
    if (y > pipe.y2) { y -= 1 }

    addToGrid(x, y)
  }
})

console.log(grid.filter(g => g[2] > 1).length)