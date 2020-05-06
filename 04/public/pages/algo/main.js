import { Table } from "./modules/table.js"

class Controller {
  constructor() {
    this.minAbsSumWorker = new Worker("./min-abs-sum-worker.js")
    this.tableSameValuesCount = new Table("tableSameValuesCount", ["Wartość", "Liczba powtórzeń"])
    this.progressbarSolution = document.getElementById("progressbarSolution")
    this.minAbsSumResult = document.getElementById("minAbsSumResult")
    this.maxAbsSumResult = document.getElementById("maxAbsSumResult")

    this.initView()
  }

  initView() {
    this.findProblemNumber()
    this.initProblemParametersSection()
    this.initWorker()
  }

  findProblemNumber() {
    const studnetIndexValue = parseInt(document.getElementById("studentIndex").innerText)
    const problemNumberValue = studnetIndexValue % 5
    const problemNumber = document.getElementById("problemNumber")
    problemNumber.innerText = problemNumberValue
    const linkToProblemDescription = document.getElementById("linkToProblemDescription")

    switch (problemNumberValue) {
      case 0:
        linkToProblemDescription.href = "https://app.codility.com/programmers/lessons/90-tasks_from_indeed_prime_2015_challenge/flood_depth/"
        break
      case 1:
        linkToProblemDescription.href = "https://app.codility.com/programmers/lessons/17-dynamic_programming/min_abs_sum/"
        break
      case 2:
        linkToProblemDescription.href = "https://app.codility.com/programmers/lessons/91-tasks_from_indeed_prime_2016_challenge/dwarfs_rafting/"
        break
      case 3:
        linkToProblemDescription.href = "https://app.codility.com/programmers/lessons/91-tasks_from_indeed_prime_2016_challenge/hilbert_maze/"
        break
      case 4:
        linkToProblemDescription.href = "https://app.codility.com/programmers/lessons/91-tasks_from_indeed_prime_2016_challenge/tree_product/"
        break
    }
  }

  initProblemParametersSection() {
    const formProblemParameters = document.getElementById("formProblemParameters")
    formProblemParameters.addEventListener("submit", (e) => {
      e.preventDefault()
      const inputProblemSize = document.getElementById("inputProblemSize")
      this.resetView()
      window.setTimeout(() => {
        this.minAbsSumWorker.postMessage({ problemSize: inputProblemSize.value })
      }, 600)
    })
  }

  initWorker() {
    this.minAbsSumWorker.onmessage = (e) => {
      const data = e.data
      if (data.sameValuesCount) {
        data.sameValuesCount.forEach((value, index) => {
          if (value > 0) {
            this.tableSameValuesCount.insertRow([index, value])
          }
        })
      } else if (data.maxSum !== undefined) {
        this.maxAbsSumResult.innerText = data.maxSum
      } else if (data.progress) {
        this.progressbarSolution.style.width = data.progress
      } else if (data.result !== undefined) {
        this.minAbsSumResult.innerText = data.result
      }
    }
  }

  resetView() {
    this.tableSameValuesCount.clearBody()
    this.progressbarSolution.style.width = "0%"
    this.minAbsSumResult.innerText = ""
    this.maxAbsSumResult.innerText = ""
  }
}

window.addEventListener("load", () => {
  const controller = new Controller()
})
