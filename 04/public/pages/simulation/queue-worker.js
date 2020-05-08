let clientsGeneratorPort
let maxQueueSize = 0
let queueModel = []

function onMessageFromClientsGenerator(e) {
  const data = e.data

  switch (data.command) {
    case "enqueue":
      if (queueModel.length < maxQueueSize) {
        queueModel.push(data.client)
        self.postMessage({ enqueued: data.client })
      } else {
        self.postMessage({ rejected: data.client })
      }
      break
  }
}

self.onmessage = (e) => {
  const data = e.data

  switch (data.command) {
    case "connect":
      clientsGeneratorPort = e.ports[0]
      clientsGeneratorPort.onmessage = onMessageFromClientsGenerator
      break
    case "config":
      queueModel = []
      maxQueueSize = parseInt(data.maxQueueSize, 10) || 0
      break
  }
}
