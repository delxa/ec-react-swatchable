/*
  Hex Colourspace
  Great for all of your CSS's. Not so good for anything else.
  Code samples from here: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
*/


// Convert to RGB
export function toRgb (hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : null
}

export function fromRgb ({red, green, blue}) {
  function componentToHex(c) {
    let hex = c.toString(16)
    return hex.length == 1 ? "0" + hex : hex
  }
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b)
}

class HexColour {

  constructor(hex) {
    this.hex = hex
  }

  // Convert to RGB
  toRgb () {
    return toRgb(this.hex)
  }

  // Convert to Hex value from RGB.
  fromRgb (rgbColour) {
    return fromRgb(rgbColour)
  }

  toString () { 
    return this.hex
  }
}

export default HexColour
