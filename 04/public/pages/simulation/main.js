import { ClerkView } from "./modules/clerk-view.js"
import { QueueView } from "./modules/queue-view.js"
import { ClientModel } from "./modules/client-model.js"

class Controller {
  constructor() {
    this.clerkViews = [
      new ClerkView("divClerkA", "Urzędnik A"),
      new ClerkView("divClerkB", "Urzędnik B"),
      new ClerkView("divClerkC", "Urzędnik C")
    ]
    this.queueView = new QueueView("listQueue")

    this.clientsInput = new MessageChannel()
    this.clientOutputs = [
      new MessageChannel(), new MessageChannel(), new MessageChannel()
    ]

    this.clientsGeneratorWorker = new Worker("./clients-generator-worker.js")
    this.queueWorker = new Worker("./queue-worker.js")
    this.clerkWorkers = [
      new Worker("./clerk-worker.js"),
      new Worker("./clerk-worker.js"),
      new Worker("./clerk-worker.js")
    ]

    this.initView()
    this.initWorkers()
  }

  initWorkers() {
    this.clientsGeneratorWorker.postMessage({
      command: "connect"
    }, [this.clientsInput.port1])

    this.queueWorker.postMessage({
      command: "connectClientsGenerator"
    }, [this.clientsInput.port2])

    this.clientOutputs.forEach((value) => {
      this.queueWorker.postMessage({
        command: "connectClerks"
      }, [value.port1])
    })

    this.clerkWorkers.forEach((value, index) => {
      value.postMessage({
        command: "connect"
      }, [this.clientOutputs[index].port2])

      value.onmessage = (e) => {
        const data = e.data

        switch (data.command) {
          case "update":
            if (data.currentClient) {
              this.clerkViews[index].setBusy(true, data.currentClient)
            } else {
              this.clerkViews[index].setBusy(false)
              this.incServedCount()
            }
            break
          default:
            console.log(data)
            break
        }
      }
    })

    this.queueWorker.onmessage = (e) => {
      const data = e.data

      switch (data.command) {
        case "dequeued":
          this.queueView.popFront()
          break
      }

      if (data.enqueued) {
        this.queueView.pushBack(data.enqueued)
      } else if (data.rejected) {
        this.incRejectedCount()
      }
    }
  }

  initView() {
    this.initForm()
  }

  initForm() {
    const formSimulationParameters = document.getElementById("formSimulationParameters")
    const minDurationInput = formSimulationParameters.minDuration
    const maxDurationInput = formSimulationParameters.maxDuration

    minDurationInput.oninput = (e) => {
      if (+minDurationInput.value > +maxDurationInput.value) {
        minDurationInput.setCustomValidity("Nie może być większy od maksymalnego czasu")
      } else {
        maxDurationInput.setCustomValidity("")
        minDurationInput.setCustomValidity("")
      }
    }

    maxDurationInput.oninput = (e) => {
      if (+minDurationInput.value > +maxDurationInput.value) {
        maxDurationInput.setCustomValidity("Nie może być mniejszy od minimalnego czasu")
      } else {
        maxDurationInput.setCustomValidity("")
        minDurationInput.setCustomValidity("")
      }
    }

    formSimulationParameters.onsubmit = (e) => {
      e.preventDefault()

      this.resetView()

      this.clientsGeneratorWorker.postMessage({
        command: "config",
        min: formSimulationParameters.minDuration.value,
        max: formSimulationParameters.maxDuration.value,
        skew: formSimulationParameters.skew.value,
        rate: formSimulationParameters.clientsRate.value
      })

      this.queueWorker.postMessage({
        command: "config",
        maxQueueSize: formSimulationParameters.maxQueueSize.value
      })

      this.clerkWorkers.forEach((value, index) => {
        value.postMessage({
          command: "config",
          id: index
        })
      })
    }
  }

  incServedCount() {
    const servedCountElement = document.getElementById("servedCount")
    servedCountElement.innerText = parseInt(servedCountElement.innerText) + 1
  }

  incRejectedCount() {
    const rejectedCountElement = document.getElementById("rejectedCount")
    rejectedCountElement.innerText = parseInt(rejectedCountElement.innerText) + 1
  }

  resetView() {
    this.queueView.clear()
  }
}

window.onload = () => {
  const controller = new Controller()
}
