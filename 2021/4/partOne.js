const fs = require('fs')

const data = fs.readFileSync('./input.txt', 'utf-8').split('\n')

const getNums = (str) => str.split(' ').filter(s => s.trim() !== '')

const moves = data[0].split(',')

const boards = data.slice(0, data.length - 1).map((line, index) => {
  if (line === '') {
    const horizontalBoardLines = data.slice(index + 1, index + 6).map(l => getNums(l))
    const verticalBoardLines = horizontalBoardLines[0].map((d, i) => horizontalBoardLines.map(l => l[i]))

    return { lines: horizontalBoardLines.concat(verticalBoardLines) }
  }
}).filter(b => !!b)

for (const move of moves) {
  for (const board of boards) {
    board.lines = board.lines.map((line) => line.map(l => l === move ? 'x' : l))
    const hasWon = board.lines.find(l => l.filter(b => b === 'x').length === 5)

    if (!!hasWon) {
      const sumOther = board.lines.reduce((a, b) => a + b.filter(l => l !== 'x').reduce((c, d) => c + parseInt(d), 0), 0)
      console.log((sumOther / 2) * parseInt(move))
      return
    }
  }
}
