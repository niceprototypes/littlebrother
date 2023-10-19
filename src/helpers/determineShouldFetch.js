import moment from "moment"

function determineShouldFetch(fetchDateTime, threshold) {
  return moment().diff(fetchDateTime, "seconds") > threshold
}

export default determineShouldFetch
