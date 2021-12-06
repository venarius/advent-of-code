const fs = require('fs')

let fish = fs.readFileSync('./input.txt', 'utf-8').split(',').map(d => parseInt(d))

const days = 80

for (let i = 0; i < days; i++) {
  let newFishAmount = 0

  fish = fish.map((f) => {
    const newAge = f - 1
    if (newAge < 0) {
      newFishAmount += 1
      return 6
    } else {
      return newAge
    }
  })

  for (let j = 0; j < newFishAmount; j++) {
    fish.push([8])
  }
}

console.log(fish.length)