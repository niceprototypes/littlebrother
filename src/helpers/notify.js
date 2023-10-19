import toast from "react-hot-toast"

function notify(message) {
  toast(message, {
    duration: 2000,
  })
}

export default notify
