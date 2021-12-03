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

function getReading(data, index, getMostCommon) {
  const value = getMostCommon ? getMostCommonBit(data, index) : getLeastCommonBit(data, index)
  const newData = data.filter(d => d[index] === value)

  if (newData.length === 1) { return newData[0] }

  return getReading(newData, index + 1, getMostCommon)
}

const data = fs.readFileSync('./input.txt', 'utf-8')
  .split('\n')

const oxygenGenerator = getReading(data, 0, true)
const co2Scrubber = getReading(data, 0, false)

console.log(parseInt(oxygenGenerator, 2) * parseInt(co2Scrubber, 2))