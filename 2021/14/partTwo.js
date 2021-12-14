const fs = require('fs')

let [input, mappings] = fs.readFileSync('./input.txt', 'utf-8')
  .split('\n\n')
  .map((m, i) => i === 1 ? m.split('\n') : m)

const pairs = {}
const rules = {}
const count = {}

for (let i = 0; i < input.length - 1; i++) {
  const key = [input[i], input[i + 1]].join('')
  pairs[key] = (pairs[key] || 0) + 1
}

mappings.forEach(m => {
  const [pair, insert] = m.split(' -> ')
  rules[pair] = insert
  pair in pairs ? null : pairs[pair] = 0
})

for (let i = 0; i < 40; i++) {
  for (const [pair, count] of Object.entries(pairs)) {
    const [a, b] = pair.split('')
    const c = rules[pair]

    pairs[[a, b].join('')] -= count
    pairs[[a, c].join('')] += count
    pairs[[c, b].join('')] += count
  }
}

for (const [[symbol], n] of Object.entries(pairs)) {
  count[symbol] = count[symbol] + n || n
}

count[input[input.length - 1]]++

const sorted = Object.values(count).sort((a, b) => b - a)
console.log(sorted[0] - sorted[sorted.length - 1])
