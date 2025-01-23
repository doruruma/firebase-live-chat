import { firebaseSignIn, getUserDoc } from "./firebase"
import { setLocalStorage } from "./local_storage"

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
    if (response.status === true) {
      const user = await getUserDoc(email)
      console.log('USER-DOC', user.data)
      if (user.data) setLocalStorage("user", user.data)
      window.location.href = "chat.html"
    }
  })
})
