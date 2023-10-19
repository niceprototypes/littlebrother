function getParams(key, search) {
  const params = new URLSearchParams(search)
  return params.get(key)
}

export default getParams
