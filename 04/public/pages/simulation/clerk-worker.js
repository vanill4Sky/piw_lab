let queuePort
let id = -1
let currentClient = false

function requestClient() {
  queuePort.postMessage({
    command: "clientRequest",
    id: id
  })
}

function requestStatusChange() {
  queuePort.postMessage({
    command: "changeStatus",
    id: id
  })
}

function onMessageFromQueue(e) {
  const data = e.data
  switch (data.command) {
    case "dequeued":
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
        requestStatusChange()
        requestClient()
      }, parseInt(currentClient.serviceDuration, 10))
      break
    default:
      console.log(`clerk ${id}: message from queue: ${data}`)
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
      break
    default:
      console.log(data)
      break
  }
}
