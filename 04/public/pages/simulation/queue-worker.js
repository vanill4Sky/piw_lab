let clientsGeneratorPort
let clerksPort = []
let maxQueueSize = 0
let queueModel = []
let clerksStatus = []

function sendToFirstFreeClerk() {
  for (let i = 0; i < clerksStatus.length; ++i) {
    if (clerksStatus[i]) {
      clerksStatus[i] = false
      clerksPort[i].postMessage({
        command: "dequeued",
        client: queueModel.shift()
      })
      self.postMessage({ command: "dequeued" })
      break
    }
  }
}

function onMessageFromClientsGenerator(e) {
  const data = e.data

  switch (data.command) {
    case "enqueue":
      if (queueModel.length < maxQueueSize) {
        queueModel.push(data.client)
        self.postMessage({ enqueued: data.client })
        sendToFirstFreeClerk()
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
        sendToFirstFreeClerk()
      }
      break
    case "changeStatus":
      clerksStatus[parseInt(data.id, 10)] = true
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
      clerksPort.push(e.ports[0])
      clerksPort[clerksPort.length - 1].onmessage = onMessageFromClerks
      break
    case "config":
      queueModel = []
      maxQueueSize = parseInt(data.maxQueueSize, 10) || 0
      clerksStatus = new Array(clerksPort.length)
      clerksStatus.fill(true)
      break
  }
}
