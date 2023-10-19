import moment from "moment"
import formats from "../constants/formats.json"

function formatDate(date) {
  return date ? moment(date).format(formats.dateTime) : ""
}

export default formatDate
