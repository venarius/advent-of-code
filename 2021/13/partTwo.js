const fs = require('fs')

let [data, foldingInstructions] = fs.readFileSync('./input.txt', 'utf-8')
  .split('\n\n')
  .map(d => d.split('\n'))

foldingInstructions = foldingInstructions
  .map(f => f.split(' ')[2].split('='))
  .map(f => [f[0], parseInt(f[1])])

data = data
  .map(d => d.split(','))
  .map(d => d.map(di => parseInt(di)))
  .map(d => ({ x: d[0], y: d[1] }))

foldingInstructions.forEach(fold => {
  if (fold[0] === 'y') {
    data.filter(point => point.y > fold[1]).forEach(point => point.y -= Math.abs(point.y - fold[1]) * 2)
  } else {
    data.filter(point => point.x > fold[1]).forEach(point => point.x -= Math.abs(point.x - fold[1]) * 2)
  }
})

arr = new Array(6).fill('x').map(x => new Array(39).fill('.'))
console.log(arr[0])
data.forEach(dat => arr[dat.y][dat.x] = '#')
console.log(arr.map(d => d.join('')))