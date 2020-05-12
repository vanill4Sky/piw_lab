export class Table {
  constructor(tableID, headerCells) {
    this.tableElement = document.getElementById(tableID)
    this.headerElement = {}
    this.bodyElement = {}

    this.makeHeader(headerCells)
    this.makeBody()
  }

  makeHeader(headerCells) {
    this.headerElement = document.createElement("thead")
    headerCells.forEach(headerCellValue => {
      this.insertHeaderCell(this.headerElement, headerCellValue, "col")
    })

    this.tableElement.appendChild(this.headerElement)
  }

  insertHeaderCell(element, cellValue, scope) {
    const headerCellElement = document.createElement("th")
    headerCellElement.scope = scope
    headerCellElement.innerText = cellValue

    element.appendChild(headerCellElement)
  }

  makeBody() {
    this.bodyElement = document.createElement("tbody")
    this.tableElement.appendChild(this.bodyElement)
  }

  insertRow(rowCells) {
    const rowElement = document.createElement("tr")
    rowCells.forEach((rowCellValue, rowCellIdx) => {
      if (rowCellIdx === 0) {
        this.insertHeaderCell(rowElement, rowCellValue, "row")
      } else {
        this.insertRowCell(rowElement, rowCellValue)
      }
    })

    this.bodyElement.appendChild(rowElement)
  }

  insertRowCell(rowElement, cellValue) {
    const rowCellElement = document.createElement("td")
    rowCellElement.innerText = cellValue

    rowElement.appendChild(rowCellElement)
  }

  clearBody() {
    this.bodyElement.innerHTML = ""
  }
}
