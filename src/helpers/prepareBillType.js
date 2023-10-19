import billTypes from "../constants/billTypes.json"

function prepareBillType(type) {
  return billTypes.find((billType) => billType.id === type)
}

export default prepareBillType
