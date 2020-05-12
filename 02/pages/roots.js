function show(elem) {
  if (elem != null) {
    elem.style.display = "block"
  }
}

function hide(elem) {
  if (elem != null) {
    elem.style.display = "none"
  }
}

function createFeedbackDiv(parent, feedbackDivId, feedbackText) {
  const inputFeedback = document.createElement("div")
  inputFeedback.setAttribute("id", feedbackDivId)
  inputFeedback.setAttribute("class", "invalid-feedback")
  inputFeedback.innerText = feedbackText
  parent.appendChild(inputFeedback)

  return inputFeedback
}
function makeValidator(constraint, feedbackText) {
  function validator(formInput, feedbackId) {
    let inputFeedback = document.getElementById(feedbackId)

    if (!constraint(formInput.value)) {
      formInput.classList.add("is-invalid")

      if (inputFeedback == null) {
        const parent = formInput.parentNode
        inputFeedback = createFeedbackDiv(parent, feedbackId, feedbackText)
      } else {
        inputFeedback.innerText = feedbackText
        show(inputFeedback)
      }
      return false
    }

    formInput.classList.remove("is-invalid")
    hide(inputFeedback)

    return true
  }
  return validator
}

function required(value) {
  return value !== ""
}

function numberOnly(value) {
  return /^-?\d+\.?\d*$/.test(value)
}

function Δ(a, b, c) {
  return b * b - 4 * a * c
}

function calcAndShowRoots(a, b, c) {
  const resultCardBody = document.getElementById("resultCardBody")
  resultCardBody.innerHTML = "<h4 class=\"card-title\">Wynik</h4>"
  const det = Δ(a, b, c)

  if ((a === 0 && b === 0) || det < 0) {
    resultCardBody.innerHTML += "<span>Brak rozwiązań</span>"
  } else if (a === 0) {
    const x = -c / b
    resultCardBody.innerHTML += `<span>Jedno rozwiązanie x = ${x}</span>`
  } else if (det === 0) {
    const x = -b / (2 * a)
    resultCardBody.innerHTML += `<span>Jedno rozwiązanie x = ${x}</span>`
  } else {
    const x1 = (-b - Math.sqrt(det)) / (2 * a)
    const x2 = (-b + Math.sqrt(det)) / (2 * a)
    resultCardBody.innerHTML += `<span>Dwa rozwiązania: x1 = ${x1} i x2 = ${x2}</span>`
  }
}

function submitForm() {
  let isFormValid = true

  for (const control of form) {
    for (const val of control.validators) {
      if (!val(document.getElementById(control.inputId), control.feedbackId)) {
        isFormValid = false
        break
      }
    }
  }
  if (isFormValid) {
    const a = +document.getElementById("a_fact").value
    const b = +document.getElementById("b_fact").value
    const c = +document.getElementById("c_fact").value
    calcAndShowRoots(a, b, c)
    show(document.getElementById("resultCardBody"))
  } else {
    hide(document.getElementById("resultCardBody"))
  }
}

var form = [
  {
    inputId: "a_fact",
    feedbackId: "a_fact_feedback",
    validators: [
      makeValidator(required, "To pole jest wymagane!"),
      makeValidator(numberOnly, "Pole może zawierać tylko liczbę!")
    ]
  },
  {
    inputId: "b_fact",
    feedbackId: "b_fact_feedback",
    validators: [
      makeValidator(required, "To pole jest wymagane!"),
      makeValidator(numberOnly, "Pole może zawierać tylko liczbę!")
    ]
  },
  {
    inputId: "c_fact",
    feedbackId: "c_fact_feedback",
    validators: [
      makeValidator(required, "To pole jest wymagane!"),
      makeValidator(numberOnly, "Pole może zawierać tylko liczbę!")
    ]
  }
]

var submitButton = document.getElementById("submit")
submitButton.addEventListener("click", submitForm)
