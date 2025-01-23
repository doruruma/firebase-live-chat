import { chatItem } from "./component"
import {
  insertChat,
  listenToAuthenticatedUser,
  listenToChatsByRoomId,
  updateCurrentUserRoomId,
} from "./firebase"
import { getLocalStorage, setLocalStorage } from "./local_storage"

let unsubscribeChats = null
let unsubscribeAuthenticatedUser = null
const user = getLocalStorage("user")

async function chatSnapshot(roomId) {
  $("#chatContainer").html("")
  if (unsubscribeChats) unsubscribeChats()
  unsubscribeChats = await listenToChatsByRoomId(roomId, (data) => {
    chatItem(data)
  })
}

async function authenticatedUserSnapshot() {
  if (unsubscribeAuthenticatedUser) unsubscribeAuthenticatedUser()
  unsubscribeAuthenticatedUser = await listenToAuthenticatedUser((data) => {    
    chatSnapshot(data.room_id)
  })
}

$(document).ready(function () {
  // set active tab
  $(`.nav-link-room[data-id='${user.room_id}']`).addClass("active")

  // firebase snapshot
  chatSnapshot(user.room_id)
  authenticatedUserSnapshot()

  // nav-link-room @click
  $(".nav-link-room").on("click", async function () {
    const roomId = $(this).data("id")
    $(".nav-link-room").removeClass("active")
    $(this).addClass("active")
    const response = await updateCurrentUserRoomId(roomId)
    if (response.status === false) return
    setLocalStorage("user", {
      ...user,
      room_id: roomId,
    })
  })

  // formChat @submit
  $("form#formChat").on("submit", async function (e) {
    e.preventDefault()
    const result = await insertChat($("textarea#chat").val())
    if (result.status === true) $("textarea#chat").val("")
  })
})
