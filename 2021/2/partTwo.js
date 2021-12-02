const fs = require('fs')

const location = {
  horizontal: 0,
  depth: 0,
  aim: 0
}

const data = fs.readFileSync('./input.txt', 'utf-8')
  .split('\n')
  .forEach((d) => {
    const [command, amount] = d.split(' ').map((v, i) => i === 1 ? parseInt(v) : v)

    switch (command) {
      case 'forward': location.horizontal += amount; location.depth += location.aim * amount; break
      case 'down': location.aim += amount; break
      case 'up': location.aim -= amount; break
    }
  })

console.log(location.horizontal * location.depth)