import { getLocalStorage } from "./local_storage"
import { formatTimestamp } from "./util"

export const chatItem = (data) => {  
  const user = getLocalStorage("user")
  const isFromMe = data.sender_email === user.email
  const html = `
    <div class="d-flex mb-3 ${
      isFromMe ? "justify-content-end" : "justify-content-start"
    }">
      <div class="card">
        <div class="card-body">
          <small><b>${data.sender_email}</b></small>
          <div class="mb-2">${data.text}</div>
          <small>${formatTimestamp(data.created_at)}</small>
        </div>
      </div>
    </div>
  `
  $("#chatContainer").append(html)
}
