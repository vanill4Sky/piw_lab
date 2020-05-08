export class ClerkView {
  constructor(divID, clerkName) {
    this.containerElement = document.getElementById(divID)
    this.clerkName = clerkName
    this.cardElement = document.createElement("div")
    this.currentClientNameElement = document.createElement("p")
    this.currentSerivceDurationElement = document.createElement("span")

    this.initView()
  }

  initView() {
    this.currentSerivceDurationElement.className = "badge badge-secondary badge-pill d-none"

    this.currentClientNameElement.className = "card-text d-flex justify-content-between align-items-center"
    this.currentClientNameElement.innerText = "Wolny"
    this.currentClientNameElement.appendChild(this.currentSerivceDurationElement)

    const cardBodyElement = document.createElement("div")
    cardBodyElement.className = "card-body"
    cardBodyElement.appendChild(this.currentClientNameElement)

    const cardHeaderElement = document.createElement("div")
    cardHeaderElement.className = "card-header"
    cardHeaderElement.innerText = this.clerkName

    this.cardElement.className = "card text-white bg-success"
    this.cardElement.appendChild(cardHeaderElement)
    this.cardElement.appendChild(cardBodyElement)

    this.containerElement.appendChild(this.cardElement)
  }

  setBusy(isBusy, clientModel) {
    if (isBusy) {
      this.cardElement.classList.remove("bg-success")
      this.cardElement.classList.add("bg-danger")
      this.currentClientNameElement.innerText = clientModel.clientName
      this.currentSerivceDurationElement.innerText = clientModel.serviceDuration
      this.currentSerivceDurationElement.classList.remove("d-none")
      this.currentClientNameElement.appendChild(this.currentSerivceDurationElement)
    } else {
      this.cardElement.classList.remove("bg-danger")
      this.cardElement.classList.add("bg-success")
      this.currentSerivceDurationElement.classList.add("d-none")
      this.currentClientNameElement.innerText = "Wolny"
    }
  }
}
