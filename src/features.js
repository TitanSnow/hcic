function detectIsSupportWebP() {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 1
  return canvas.toDataURL('image/webp').startsWith('data:image/webp;')
}
export const isSupportWebP = detectIsSupportWebP()
