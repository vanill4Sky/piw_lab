let queuePort
let id = -1
let currentClient = false
let waitingForResponse = false

function onMessageFromQueue(e) {
  const data = e.data

  switch (data.command) {
    case "enqueued":
      if (!currentClient && !waitingForResponse) {
        queuePort.postMessage({
          command: "clientRequest",
          id: id
        })
        waitingForResponse = true
      }
      break
    case "requestRejected":
      waitingForResponse = false
      break
    case "dequeued":
      console.log(id, currentClient)
      currentClient = data.client
      self.postMessage({
        command: "update",
        currentClient: currentClient
      })
      setTimeout(() => {
        currentClient = false
        self.postMessage({
          command: "update",
          currentClient: false
        })
        queuePort.postMessage({
          command: "clientRequestFirst",
          id: id
        })
      }, parseInt(currentClient.serviceDuration, 10))
      break
    default:
      console.log(data)
      break
  }
}

self.onmessage = (e) => {
  const data = e.data

  switch (data.command) {
    case "connect":
      queuePort = e.ports[0]
      queuePort.onmessage = onMessageFromQueue
      break
    case "config":
      id = parseInt(data.id, 10)
      currentClient = false
      waitingForResponse = false
      break
    default:
      console.log(data)
      break
  }
}
