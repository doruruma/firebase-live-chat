import { ROOMS } from "./constants"
import { firebaseSignUp, upsertUser } from "./firebase"
import { setLocalStorage } from "./local_storage"

$(document).ready(function () {
  // formSignUp @submit
  $("form#formSignUp").submit(async function (e) {
    e.preventDefault()
    const name = $("input#name").val()
    const phone = $("input#phone").val()
    const email = $("input#email").val()
    const password = $("input#password").val()
    const signUpResponse = await firebaseSignUp(email, password)
    if (signUpResponse.status === false) {
      alert("Sign Up Failed")
      return
    }
    const room_id = ROOMS[0].id
    const room_name = ROOMS[0].name
    const storeUserResponse = await upsertUser({
      name,
      phone,
      email,
      room_id,
      room_name,
    })
    if (storeUserResponse.status === true) {
      setLocalStorage("user", {
        name,
        phone,
        email,
        room_id,
        room_name,
      })
      window.location.href = "chat.html"
    }
  })
})
