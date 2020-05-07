export class QueueView {
  constructor(listID) {
    this.listElement = document.getElementById(listID)
    this.clear()
  }

  pushBack(clientModel) {
    const badgeElement = document.createElement("span")
    badgeElement.className = "badge badge-primary badge-pill"
    badgeElement.innerText = clientModel.serviceDuration

    const listItemElement = document.createElement("li")
    listItemElement.className = "list-group-item d-flex justify-content-between align-items-center"
    listItemElement.innerText = clientModel.clientName
    listItemElement.appendChild(badgeElement)

    this.listElement.appendChild(listItemElement)
  }

  popFront() {
    console.log(this.listElement.firstChild)
    this.listElement.removeChild(this.listElement.firstChild)
  }

  clear() {
    this.listElement.innerHTML = ""
  }
}
