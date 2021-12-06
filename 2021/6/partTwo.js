const fs = require('fs')

let groupedFish = new Map()

fs.readFileSync('./input.txt', 'utf-8').split(',').map(d => parseInt(d)).forEach((f) => {
  groupedFish.set(f, (groupedFish.get(f) || 0) + 1)
})

for (let i = 0; i < 256; i++) {
  let newFishAmount = 0

  Array.from(groupedFish.keys()).sort().forEach(key => {
    groupedFish.set(key - 1, groupedFish.get(key))
    groupedFish.set(key, 0)
  })

  Array.from(groupedFish.keys()).sort().filter(k => k < 0).forEach(key => {
    newFishAmount = groupedFish.get(key)
    groupedFish.set(6, (groupedFish.get(6) || 0) + newFishAmount)
    groupedFish.delete(key)
  })

  if (newFishAmount > 0) { groupedFish.set(8, newFishAmount) }
}

console.log(
  Array.from(groupedFish.keys())
    .reduce((a, b) => a + groupedFish.get(b), 0)
)