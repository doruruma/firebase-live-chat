import { firebaseSignUp, storeUser } from "./firebase"

$(document).ready(function () {
  // formSignUp @submit
  $("form#formSignUp").submit(async function (e) {
    e.preventDefault()
    const name = $("input#name").val()
    const phone = $("input#phone").val()
    const email = $("input#email").val()
    const password = $("input#password").val()
    const signUpResponse = await firebaseSignUp(email, password)
    if (signUpResponse.status == false) {
      alert("Sign Up Failed")
      return
    }
    const storeUserResponse = await storeUser(name, phone, email)
    if (storeUserResponse.status === true) window.location.href = "chat.html"
  })
})
