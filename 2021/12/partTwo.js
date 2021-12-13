const fs = require('fs')

let paths = fs.readFileSync('./input.txt', 'utf-8')
  .split('\n')
  .map(path => path.split('-'))

paths = paths.concat(paths.map(p => [p[1], p[0]]))

const finalPaths = []

const getPaths = (path = ['start'], hasVisitedSmallCave = false) => {
  const lastPath = path[path.length - 1]
  if (lastPath === 'end') { finalPaths.push(path); return }
  if (path.filter(p => p.toLowerCase() === lastPath).length === 2) { hasVisitedSmallCave = true }
  const possiblePaths = paths.filter(p => p[0] === lastPath && p[1] !== 'start' && (p[1] !== p[1].toLowerCase() || path.filter(pa => pa === p[1]).length < (hasVisitedSmallCave ? 1 : 2)))
  possiblePaths.forEach(toPath => getPaths(path.concat([toPath[1]]), hasVisitedSmallCave))
}

getPaths()
console.log(finalPaths.length)