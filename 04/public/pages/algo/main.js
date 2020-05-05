function findProblemNumber() {
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

function initProblemParametersSection() {
  const formProblemParameters = document.getElementById("formProblemParameters")
  formProblemParameters.addEventListener("submit", (e) => {
    e.preventDefault()
  })
}

function initPage() {
  findProblemNumber()
  initProblemParametersSection()
}

window.addEventListener("load", () => {
  initPage()
})
