/*
  Hex Colourspace
  Great for all of your CSS's. Not so good for anything else.
  Code samples from here: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
*/


// Convert to RGB
export function toRgb (hex, toArray = false) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  const values = result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : []

  return toArray ? values : values.toString()
}

export function fromRgb ({red, green, blue}) {
  function componentToHex(c) {
    let hex = c.toString(16)
    return hex.length == 1 ? "0" + hex : hex
  }
  return '#' + componentToHex(red) + componentToHex(green) + componentToHex(blue)
}
