const fs = require('fs')

let tiles = []
let id = -1

fs.readFileSync('./input.txt', 'utf-8').split('\n').forEach((line, yIndex) => {
  line.split('').forEach((char, xIndex) => { tiles.push({ x: xIndex, y: yIndex, risk: parseInt(char), id }) })
})

// Expand tiles
const width = Math.max(...tiles.map(t => t.x)) + 1
const height = Math.max(...tiles.map(t => t.y)) + 1
const startTiles = [...tiles]
tiles = []

for (let x = 0; x < 5; x++) {
  for (let y = 0; y < 5; y++) {
    const sumSteps = x + y

    tiles = tiles.concat(startTiles.map(tile => {
      let newRisk = tile.risk + sumSteps
      newRisk = newRisk > 9 ? newRisk - 9 : newRisk

      id += 1
      return { x: tile.x + width * x, y: tile.y + height * y, risk: newRisk, id }
    }))
  }
}

const djkstra = (start) => {
  const distances = {}
  const previouses = {}

  tiles.forEach((tile) => {
    distances[tile.id] = null
    previouses[tile.id] = null
  })

  distances[start.id] = 0

  let systems = [...tiles]

  while (systems.length > 0) {
    nearest_tile = systems.reduce((a, b) => {
      if (!a || distances[a.id] === null) { return b }
      if (distances[b.id] === null) { return a }
      if (distances[a.id] < distances[b.id]) { return a }
      return b
    }, null)

    if (distances[nearest_tile.id] === null) {
      continue
    }

    const neighbors = tiles
      .filter(oc => (Math.abs(oc.x - nearest_tile.x) <= 1 && Math.abs(oc.y - nearest_tile.y) <= 1) && (oc.x !== nearest_tile.x || oc.y !== nearest_tile.y))
      .filter(oc => oc.x === nearest_tile.x || oc.y === nearest_tile.y)

    for (const neighbor of neighbors) {
      const alt = distances[nearest_tile.id] + neighbor.risk
      if (distances[neighbor.id] === null || alt < distances[neighbor.id]) {
        distances[neighbor.id] = alt
        previouses[neighbor.id] = nearest_tile
      }
    }

    systems = systems.filter(sys => sys.id !== nearest_tile.id)
  }

  return previouses
}

const shortestPath = (start, end) => {
  const previouses = djkstra(start)
  const path = []

  let u = end
  while (!!u) {
    path.push(u)
    u = previouses[u.id]
  }

  path[path.length - 1].risk = 0 // Start is not counted
  return path.reduce((a, b) => a + b.risk, 0)
}

const maxX = width * 5 - 1
const maxY = height * 5 - 1

const start = tiles.find(t => t.x === 0 && t.y === 0)
const end = tiles.find(t => t.x === maxX && t.y === maxY)

console.log(shortestPath(start, end))