const fs = require('fs')

const data = fs.readFileSync('./input.txt', 'utf-8').split('\n')

const chars = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>'
}

const scores = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4
}

let total = []

data.forEach(line => {
  const st = []
  for (const char of line.split('')) {
    if (Object.keys(chars).includes(char)) {
      st.push(chars[char])
    } else if (char === st[st.length - 1]) {
      st.pop()
    } else {
      return
    }
  }

  let vol = 0
  for (const char of st.reverse()) {
    vol *= 5
    vol += scores[char]
  }
  total.push(vol)
})

total = total.sort((a, b) => a - b)
console.log(total[Math.floor(total.length / 2)])