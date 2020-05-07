export class ClerkView {
  constructor(divID, clerkName) {
    this.containerElement = document.getElementById(divID)
    this.clerkName = clerkName
    this.cardElement = document.createElement("div")
    this.currentClientNameElement = document.createElement("p")

    this.initView()
  }

  initView() {
    this.currentClientNameElement.className = "card-text"
    this.currentClientNameElement.innerText = "Wolny"

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
    } else {
      this.cardElement.classList.remove("bg-danger")
      this.cardElement.classList.add("bg-success")
      this.currentClientNameElement.innerText = "Wolny"
    }
  }
}
