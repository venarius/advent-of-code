const fs = require('fs')

const data = fs.readFileSync('./input.txt', 'utf-8').split('\n').map(d => parseInt(d))
console.log(data.length)

let amountOfIncrements = 0
let previousData = null

data.forEach((dat) => {
  if (previousData && dat > previousData) { amountOfIncrements += 1 }
  previousData = dat
})

console.log(amountOfIncrements)