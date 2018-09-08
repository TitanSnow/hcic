self.onmessage = ({data}) => {
  const config = data.config
  const bitmap = data.bitmap
  const filters = data.filters
  const w = Math.max(1, Math.round(bitmap.width * config.scale))
  const h = Math.max(1, Math.round(bitmap.height * config.scale))
  const canvas = new OffscreenCanvas(w, h)
  const context = canvas.getContext('2d')
  if (
    (context.imageSmoothingEnabled = config.smooth !== 'disabled') &&
    'imageSmoothingQuality' in context
  ) {
    context.imageSmoothingQuality = config.smooth
  }
  context.filter = filters.css
    .map(f => f.toCssString())
    .join(' ')
  context.drawImage(bitmap, 0, 0, w, h)
  canvas.convertToBlob({
    type: config.type,
    quality: config.compress ? config.level : void 0
  }).then(blob => {
    self.postMessage(blob)
  })
}
