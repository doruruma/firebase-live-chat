import { firebaseSignIn } from "./firebase"

$(document).ready(function () {
  // formSignIn @submit
  $("form#formSignIn").submit(async function (e) {
    e.preventDefault()
    const email = $("input#email").val()
    const password = $("input#password").val()
    const response = await firebaseSignIn(email, password)
    if (response.status == false) {
      alert("Sign In Failed")
      return
    }
    if (response.status === true) window.location.href = "chat.html"
  })
})
