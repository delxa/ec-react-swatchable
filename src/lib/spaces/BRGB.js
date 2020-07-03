/*
  BRGB Colourspace
  Nice. A Colourspace that involves simple maths.
*/

export function toRgb ({ bred, bgreen, bblue }) {
  function toRGBRange(value) {
    return Math.round((value / 10000) * 255)
  }
  return [
    toRGBRange(bred),
    toRGBRange(bgreen),
    toRGBRange(bblue)
  ]
}

export function fromRgb ({bred, bgreen, bblue}) {
  function toBRGBRange(value) {
    return (value / 255) * 10000
  }
  return [
    toBRGBRange(bred),
    toBRGBRange(bgreen),
    toBRGBRange(bblue)
  ]
}

class BRGBColour {

  constructor(brgb) {
    let { bred, bblue, bgreen } = brgb
    this.bred = bred
    this.bblue = bblue
    this.bgreen = bgreen
    this.raw = brgb
  }

  // Convert to RGB
  toRgb () {
    return toRgb(this.raw)
  }

  // Convert to BRGB value from RGB.
  fromRgb (rgbColor) {
    return fromRgb(rgbColor)
  }

  toString () { 
    return `${this.bred}, ${this.bblue}, ${this.bgreen}`
  }
}

export default BRGBColour
