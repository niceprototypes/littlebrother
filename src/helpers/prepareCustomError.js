function prepareCustomError(callback, path, error, description = "") {
  // Initialize location string
  let location = ""

  // Iterate over path
  for (const index in path) {
    // Initialize path item
    const item = path[index]

    // Create location string
    location += typeof item === "string" ? item : `[${item}].`
  }

  // Prepare error message
  const message = typeof error === "string" ? error : error.toString().split("ValidationError: ")[1]

  // Call message
  return callback(`${location}${description && `(${description})`} → ${message}`)
}

export default prepareCustomError
