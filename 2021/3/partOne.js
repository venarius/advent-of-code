const fs = require('fs')

function getMostCommonBit (data, index) {
  let zeroAmount = 0
  let oneAmount = 0

  data.map(d => d[index]).forEach(d => d === '0' ? zeroAmount += 1 : oneAmount += 1)

  return zeroAmount > oneAmount ? '0' : '1'
}

function getLeastCommonBit (data, index) {
  let zeroAmount = 0
  let oneAmount = 0

  data.map(d => d[index]).forEach(d => d === '0' ? zeroAmount += 1 : oneAmount += 1)

  return zeroAmount > oneAmount ? '1' : '0'
}

const data = fs.readFileSync('./input.txt', 'utf-8')
  .split('\n')

let gammaRateBinary = ''
let epsilonRateBinary = ''

for (let i = 0; i < data[0].length; i++) {
  gammaRateBinary += getMostCommonBit(data, i)
  epsilonRateBinary += getLeastCommonBit(data, i)
}

console.log(parseInt(gammaRateBinary, 2) * parseInt(epsilonRateBinary, 2))