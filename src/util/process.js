try {
  if (!process) {
    window.process = { env: {} }
  }
} catch (err) {
  window.process = { env: {} }
}
