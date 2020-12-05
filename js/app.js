console.log('PWA is begin ...');

window.addEventListener('load', function () {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
  }
})

let deferredPrompt;
window.addEventListener('beforeinstallprompt', function (e) {
  e.preventDefault()
  deferredPrompt = e
  // showInstallPromotion()
})

const buttonInstall = document.querySelector('#buttonInstall');
buttonInstall.addEventListener('click', function (e) {
  // hideMyInstallPromotion()
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then(function (choiceResult) {
    if (choiceResult.outcome === 'accepted')
      console.log('User accepted the install prompt');
    else
      console.log('User dismissed the install prompt');

  })
})

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