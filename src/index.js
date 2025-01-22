import { getLocalStorage } from "./local_storage"

$(document).ready(function () {
  if (getLocalStorage("firebase_user") == null) {
    window.location.href = "sign-in.html"
    return
  }
  window.location.href = 'chat.html'
})
