const fs = require('fs')

let [input, mappings] = fs.readFileSync('./input.txt', 'utf-8').split('\n\n').map(m => m.split('\n'))
mappings = mappings.map(m => m.split(' -> '))
input = input[0]

for (let i = 0; i < 10; i++) {
  input = input
    .split('')
    .map((_c, i) => input.split('').slice(i, i + 2))
    .map(pair => {
      const mapping = mappings.find(ma => ma[0] === pair.join(''))
      return mapping ? [pair[0], mapping[1]] : pair
    })
    .map(pair => pair.join(''))
    .reduce((a, b) => a + b, '')
}

const charCounts = {}
input.split('').map(char => charCounts[char] = (charCounts[char] || 0) + 1)
const counts = Object.keys(charCounts).map(k => charCounts[k]).sort((a, b) => b - a)
console.log(counts[0] - counts[counts.length - 1])