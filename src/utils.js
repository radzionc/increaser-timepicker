export const toRadians = angle => angle * (Math.PI / 180)

export const getMouseAngle = (centerX, centerY, x, y) => {
  const mainVector = {
    x: 0,
    y: -1
  }
  const mouseVector = {
    x: x - centerX,
    y: y - centerY
  }
  const crossProduct =
    mainVector.x * mouseVector.y - mouseVector.x * mainVector.y
  const dotProduct = mainVector.x * mouseVector.x + mainVector.y * mouseVector.y
  const angle = (Math.atan2(crossProduct, dotProduct) * 180) / Math.PI
  return angle > 0 ? angle : 360 + angle
}
