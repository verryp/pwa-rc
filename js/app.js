console.log('PWA is begin ...');


const COLORS = [
  '#c0ffee',
  '#cacaca',
  '#101fff',
  '#1ceccc',
  '#ee6e73',
  '#2a9d8f',
  '#7FFD4e'
]

const randomButton = document.querySelector("#randomBtn")
const body = document.querySelector('body')

changeColor(COLORS[randomNumber()])

randomButton.addEventListener('click', function (event) {
  changeColor(COLORS[randomNumber()])
})

function randomNumber() {
  return Math.floor(Math.random() * Math.floor(COLORS.length));
}

function changeColor(color) {
  randomButton.innerHTML = color
  body.style.backgroundColor = color
}