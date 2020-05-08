import { ClerkView } from "./modules/clerk-view.js"
import { QueueView } from "./modules/queue-view.js"
import { ClientModel } from "./modules/client-model.js"

class Controller {
  constructor() {
    this.clerkViewA = new ClerkView("divClerkA", "Urzędnik A")
    this.clerkViewB = new ClerkView("divClerkB", "Urzędnik B")
    this.clerkViewC = new ClerkView("divClerkC", "Urzędnik C")
    this.queueView = new QueueView("listQueue")

    this.clientsInput = new MessageChannel()

    this.clientsGeneratorWorker = new Worker("./clients-generator-worker.js")
    this.queueWorker = new Worker("./queue-worker.js")

    this.initView()
    this.initWorkers()
  }

  initWorkers() {
    this.clientsGeneratorWorker.postMessage({
      command: "connect"
    }, [this.clientsInput.port1])

    this.queueWorker.postMessage({
      command: "connect"
    }, [this.clientsInput.port2])

    this.queueWorker.onmessage = (e) => {
      const data = e.data

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
        minDurationInput.setCustomValidity("")
      }
    }

    maxDurationInput.oninput = (e) => {
      if (+minDurationInput.value > +maxDurationInput.value) {
        maxDurationInput.setCustomValidity("Nie może być mniejszy od minimalnego czasu")
      } else {
        maxDurationInput.setCustomValidity("")
      }
    }

    formSimulationParameters.onsubmit = (e) => {
      e.preventDefault()

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
}

window.onload = () => {
  const controller = new Controller()
}
