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

function closeAlert(closeButton) {
  hide(closeButton.parentNode)
}

function createFeedbackDiv(parent, feedbackDivId, feedbackText) {
  const inputFeedback = document.createElement("div")
  inputFeedback.setAttribute("id", feedbackDivId)
  inputFeedback.setAttribute("class", "invalid-feedback")
  inputFeedback.innerText = feedbackText
  parent.appendChild(inputFeedback)

  return inputFeedback
}

function required(value) {
  return value !== ""
}

function lettersOnly(value) {
  return /^[a-zA-Z]+$/.test(value)
}

function phoneNumber(value) {
  return /^\+48\d{9}$/.test(value)
}

function lowercaseLettersOnly(value) {
  return /^[a-z]+$/.test(value)
}

function samePassword(value) {
  return value === document.getElementById("password").value
}

function validEmail(value) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
}

function validDate(value) {
  return /^([0-2]\d|3[01])\.(0[1-9]|1[0-2])\.(\d{4})$/.test(value)
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

var form = [
  {
    inputId: "firstname",
    feedbackId: "firstname_feedback",
    validators: [
      makeValidator(required, "To pole jest wymagane!"),
      makeValidator(lettersOnly, "Pole może zawierać tylko litery!")
    ]
  },
  {
    inputId: "surname",
    feedbackId: "surname_feedback",
    validators: [
      makeValidator(required, "To pole jest wymagane!"),
      makeValidator(lettersOnly, "Pole może zawierać tylko litery!")
    ]
  },
  {
    inputId: "phoneNumber",
    feedbackId: "phoneNumber_feedback",
    validators: [
      makeValidator(required, "To pole jest wymagane!"),
      makeValidator(phoneNumber, "Podaj numer w formacie +48xxxxxxxxx!")
    ]
  },
  {
    inputId: "birthDate",
    feedbackId: "birthDate_feedback",
    validators: [
      makeValidator(required, "To pole jest wymagane!"),
      makeValidator(validDate, "Podaj datę urodzenia w formacie dd.mm.rrrr!")
    ]
  },
  {
    inputId: "email",
    feedbackId: "email_feedback",
    validators: [
      makeValidator(required, "To pole jest wymagane!"),
      makeValidator(validEmail, "Proszę podać poprawny adres email!")
    ]
  },
  {
    inputId: "username",
    feedbackId: "username_feedback",
    validators: [
      makeValidator(required, "To pole jest wymagane!"),
      makeValidator(
        lowercaseLettersOnly,
        "Pole może zawierać tylko małe litery!"
      )
    ]
  },
  {
    inputId: "password",
    feedbackId: "password_feedback",
    validators: [makeValidator(required, "To pole jest wymagane!")]
  },
  {
    inputId: "confirmPassword",
    feedbackId: "confirmPassword_feedback",
    validators: [
      makeValidator(required, "To pole jest wymagane!"),
      makeValidator(samePassword, "Podane hasła się różnią!")
    ]
  }
]

function submitForm() {
  let isFormValid = true

  for (const control of form) {
    for (const validator of control.validators) {
      if (
        !validator(document.getElementById(control.inputId), control.feedbackId)
      ) {
        isFormValid = false
        break
      }
    }
  }
  if (isFormValid) {
    show(document.getElementById("alertSuccess"))
  } else {
    hide(document.getElementById("alertSuccess"))
  }
}
