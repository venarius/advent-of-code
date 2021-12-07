const fs = require('fs')

const data = fs.readFileSync('./input.txt', 'utf-8').split(',').map(d => parseInt(d))

let prevFuel = -1
for (let i = 0; i < 100000; i++) {
  const fuel = data.reduce((a, b) => a + Math.abs(b - i), 0)
  if (prevFuel !== -1 && prevFuel < fuel) { console.log(prevFuel); return }
  prevFuel = fuel
}