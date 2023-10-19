import util from "util"

function inspect(data) {
  console.log(util.inspect(data, {depth: null}))
}

export default inspect
