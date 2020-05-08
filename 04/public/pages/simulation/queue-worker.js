let clientsGeneratorPort
let clerksPort = []
let maxQueueSize = 0
let queueModel = []

function notifyClerks() {
  clerksPort.forEach((value) => {
    value.postMessage({ command: "enqueued" })
  })
}

function onMessageFromClientsGenerator(e) {
  const data = e.data

  switch (data.command) {
    case "enqueue":
      if (queueModel.length < maxQueueSize) {
        queueModel.push(data.client)
        notifyClerks()
        self.postMessage({ enqueued: data.client })
      } else {
        self.postMessage({ rejected: data.client })
      }
      break
  }
}

function onMessageFromClerks(e) {
  const data = e.data

  switch (data.command) {
    case "clientRequest":
      if (queueModel.length > 0) {
        clerksPort[parseInt(data.id, 10)].postMessage({
          command: "dequeued",
          client: queueModel.shift()
        })
        self.postMessage({ command: "dequeued" })
      } else {
        clerksPort[parseInt(data.id, 10)].postMessage({
          command: "requestRejected"
        })
      }
      break
    case "clientRequestFirst":
      if (queueModel.length > 0) {
        clerksPort[parseInt(data.id, 10)].postMessage({
          command: "dequeued",
          client: queueModel.shift()
        })
        self.postMessage({ command: "dequeued" })
      } else {
        clerksPort[parseInt(data.id, 10)].postMessage({
          command: "requestRejected"
        })
      }
      break
    default:
      console.log(data)
      break
  }
}

self.onmessage = (e) => {
  const data = e.data

  switch (data.command) {
    case "connectClientsGenerator":
      clientsGeneratorPort = e.ports[0]
      clientsGeneratorPort.onmessage = onMessageFromClientsGenerator
      break
    case "connectClerks":
      clerksPort = new Array(e.ports.length)
      for (let i = 0; i < e.ports.length; ++i) {
        clerksPort[i] = e.ports[i]
        clerksPort[i].onmessage = onMessageFromClerks
      }
      break
    case "config":
      queueModel = []
      maxQueueSize = parseInt(data.maxQueueSize, 10) || 0
      break
  }
}
