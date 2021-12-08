const fs = require('fs')

const data = fs.readFileSync('./input.txt', 'utf-8').split('\n').map(d => d.split(' | '))

let foundDigits = 0

for (const dat of data) {
  dat[1].split(' ').forEach(digit => {
    if (digit.length === 2 || digit.length === 3 || digit.length === 4 || digit.length === 7) {
      foundDigits += 1
    }
  })
}

console.log(foundDigits)