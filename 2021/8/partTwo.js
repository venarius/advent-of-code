const fs = require('fs')

const data = fs.readFileSync('./input.txt', 'utf-8').split('\n').map(d => d.split(' | '))

const nums = [
  ['a', 'b', 'c', 'e', 'f', 'g'],
  ['c', 'f'],
  ['a', 'c', 'd', 'e', 'g'],
  ['a', 'c', 'd', 'f', 'g'],
  ['b', 'c', 'd', 'f'],
  ['a', 'b', 'd', 'f', 'g'],
  ['a', 'b', 'd', 'e', 'f', 'g'],
  ['a', 'c', 'f'],
  ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
  ['a', 'b', 'c', 'd', 'f', 'g']
]

const mapNum = (translatedNums, numies) => {
  const numms = numies.split(' ').map(num => num.split('').map(char => Object.keys(translatedNums).find(k => translatedNums[k] === char)))
  return numms.map(num => num.sort()).map(num => nums.indexOf(nums.find(n => JSON.stringify(n) === JSON.stringify(num))).toString()).join('')
}

const sums = data.map(dat => {
  const digits = dat[0].split(' ')

  const tmpls = {}
  digits.forEach(dig => dig.split('').forEach(char => tmpls[char] = (tmpls[char] || 0) + 1))

  const one = digits.find(d => d.length === 2).split('')
  const seven = digits.find(d => d.length === 3).split('')
  const four = digits.find(d => d.length === 4).split('')

  const a = seven.filter(d => !one.includes(d))[0]
  const b = Object.keys(tmpls).find(k => tmpls[k] === 6)
  const e = Object.keys(tmpls).find(k => tmpls[k] === 4)
  const f = Object.keys(tmpls).find(k => tmpls[k] === 9)

  const c = one.filter(char => char !== f)[0]
  const d = four.filter(char => char !== b && char !== c && char !== f)[0]
  const g = ['a', 'b', 'c', 'd', 'e', 'f', 'g'].filter(char => ![a, b, c, d, e, f].includes(char))[0]

  const translatedNums = { a, b, c, d, e, f, g }

  return mapNum(translatedNums, dat[1])
})

console.log(sums.map(d => parseInt(d)).reduce((a, b) => a + b, 0))