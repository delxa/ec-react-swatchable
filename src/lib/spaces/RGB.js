/*
  RGBV Colourspace
  Base as base can be.
*/

export function toRgb ({red, green, blue}) {
    return [
      red,
      green,
      blue
    ]
  }

class RGBColour {

  constructor(rgb) {
    let { red, blue, green } = rgb
    this.red = red
    this.blue = blue
    this.green = green
    this.raw = rgb
  }

  // Convert to RGB (WHY?)
  toRgb () {
    return toRgb(this.raw)
  }

  toString () { 
    return `${this.red}, ${this.blue}, ${this.green}`
  }
}

export default RGBColour
