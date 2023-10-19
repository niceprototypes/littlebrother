import stateNames from "../constants/stateNames.json"

function prepareStateName(code) {
  return stateNames[code]
}

export default prepareStateName
