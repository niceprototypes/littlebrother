function runFakeAwait(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("")
    }, ms)
  })
}

export default runFakeAwait
