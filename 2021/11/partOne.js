const fs = require('fs')

const data = fs.readFileSync('./input.txt', 'utf-8')
  .split('\n')
  .map(d => d.split('').map(n => parseInt(n)))


const octupuses = []
data.forEach((line, yIndex) => {
  line.forEach((number, xIndex) => {
    octupuses.push({ x: xIndex, y: yIndex, hasFlashed: false, energy: number })
  })
})

const letEmFlash = (octupuses, acc = 0) => {
  octupuses.filter(o => o.energy > 9 && !o.hasFlashed).forEach(octo => {
    acc += 1

    octo.hasFlashed = true

    octupuses
      .filter(oc => Math.abs(oc.x - octo.x) <= 1 && Math.abs(oc.y - octo.y) <= 1 && (oc.x !== octo.x || oc.y !== octo.y))
      .forEach(oc => oc.energy += 1)
  })

  if (octupuses.filter(oc => oc.energy > 9 && !oc.hasFlashed).length > 0) {
    acc = letEmFlash(octupuses, acc)
  }

  return acc
}

let totalFlashes = 0

for (let i = 0; i < 100; i++) {
  // octopuses flash
  octupuses.forEach(o => o.energy += 1)

  // let em flash
  const flashes = letEmFlash(octupuses)
  totalFlashes += flashes

  octupuses.filter(o => o.hasFlashed).forEach(o => o.energy = 0)
  octupuses.forEach(o => o.hasFlashed = false)
}

console.log(totalFlashes)

