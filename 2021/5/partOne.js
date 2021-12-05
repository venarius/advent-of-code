const fs = require('fs')

let pipes = fs.readFileSync('./input.txt', 'utf-8').split('\n').map((line) => {
  const [xCords, yCords] = line.split(' -> ')
  const [x1, y1] = xCords.split(',').map(cord => parseInt(cord))
  const [x2, y2] = yCords.split(',').map(cord => parseInt(cord))

  return { x1, y1, x2, y2 }
})

pipes = pipes.filter(p => p.x1 === p.x2 || p.y1 === p.y2)

const grid = []

pipes.forEach((pipe) => {
  const isVertical = pipe.x1 === pipe.x2
  const accum = (isVertical ? pipe.y1 - pipe.y2 : pipe.x1 - pipe.x2) * -1
  const dir = accum < 0 ? -1 : 1

  for (let i = 0; i < Math.abs(accum) + 1; i++) {
    const x = isVertical ? pipe.x1 : pipe.x1 + (i * dir)
    const y = isVertical ? pipe.y1 + (i * dir) : pipe.y1

    const hasExisting = grid.find(g => g[0] === x && g[1] === y)
    hasExisting ? hasExisting[2] += 1 : grid.push([x, y, 1])
  }
})

console.log(grid.filter(g => g[2] > 1).length)