const fs = require('fs')

let paths = fs.readFileSync('./input.txt', 'utf-8')
  .split('\n')
  .map(path => path.split('-'))

paths = paths.concat(paths.map(p => [p[1], p[0]]))

const finalPaths = []

const getPaths = (path = ['start']) => {
  const lastPath = path[path.length - 1]
  if (lastPath === 'end') { finalPaths.push(path); return }
  const possiblePaths = paths.filter(p => p[0] === lastPath && (p[1] !== p[1].toLowerCase() || !path.includes(p[1])))
  possiblePaths.forEach(toPath => getPaths(path.concat([toPath[1]])))
}

getPaths()
console.log(finalPaths.length)