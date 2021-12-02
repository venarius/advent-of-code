const fs = require('fs')

const data = fs.readFileSync('./input.txt', 'utf-8')
  .split('\n')
  .map(d => parseInt(d))

const threeMeasurements = data
  .map((_, index) => data.slice(index, index + 3))
  .filter(x => !!x && x.length === 3)
  .map(x => x.reduce((a, b) => a + b, 0))

let amountOfIncrements = 0
let previousData = null

threeMeasurements.forEach((dat) => {
  if (previousData && dat > previousData) { amountOfIncrements += 1 }
  previousData = dat
})

console.log(amountOfIncrements)