/* eslint-disable no-undef */
self.importScripts("./client-model.js")

// https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve
function randomNormalDist(min, max, skew) {
  let u = 0; let v = 0
  while (u === 0) {
    u = Math.random()
  }
  while (v === 0) {
    v = Math.random()
  }
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)

  num = num / 10.0 + 0.5
  if (num > 1 || num < 0) {
    num = randomNormalDist(min, max, skew)
  }
  num = Math.pow(num, skew)
  num *= max - min
  num += min
  return num
}

// https://gist.github.com/nicolashery/5885280
function randomExponentialDist(rate) {
  rate = rate || 1

  return -Math.log(Math.random()) / rate * 60000
}

let queuePort
let clientsCounter = 0
let min = 1
let max = 1
let skew = 1
let rate = 1

function generatorLoop() {
  queuePort.postMessage({
    command: "enqueue",
    client: new ClientModel("Klient_" + clientsCounter, Math.floor(randomNormalDist(min, max, skew)))
  })
  ++clientsCounter

  setTimeout(generatorLoop, randomExponentialDist(rate))
}

self.onmessage = (e) => {
  const data = e.data

  switch (data.command) {
    case "connect":
      queuePort = e.ports[0]
      break
    case "config":
      min = parseInt(data.min, 10) || 1
      max = parseInt(data.max, 10) || 1
      skew = parseFloat(data.skew) || 1.0
      rate = parseInt(data.rate, 10) || 1
      clientsCounter = 0
      setTimeout(generatorLoop, randomExponentialDist(rate))
      break
  }
}
