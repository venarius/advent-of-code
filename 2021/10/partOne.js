const fs = require('fs')

const data = fs.readFileSync('./input.txt', 'utf-8').split('\n')

const chars = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>'
}

const scores = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137
}

let total = 0

data.forEach(line => {
  const st = []
  for (const char of line.split('')) {
    if (Object.keys(chars).includes(char)) {
      st.push(chars[char])
    } else if (char === st[st.length - 1]) {
      st.pop()
    } else {
      total += scores[char]
      return
    }
  }
})

console.log(total)