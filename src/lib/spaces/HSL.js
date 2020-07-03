/*
  HSL Colourspace
  This article explains the conversion maths: https://www.niwa.nu/2013/05/math-behind-colorspace-conversions-rgb-hsl/
  THis code snippet implements the above in a very succinct fashion: https://gist.github.com/vahidk/05184faf3d92a0aa1b46aeaa93b07786
  The example has been adapted to account for our S and L in our data being expressed as [0,100] instead of [0,1]
*/

export function toRgb ({ hue: h, saturation, lightness }) {
  let s = saturation / 100
  let l = lightness / 100

  let c = (1 - Math.abs(2 * l - 1)) * s
  let hp = h / 60.0
  let x = c * (1 - Math.abs((hp % 2) - 1))
  let rgb1
  if (isNaN(h)) rgb1 = [0, 0, 0]
  else if (hp <= 1) rgb1 = [c, x, 0]
  else if (hp <= 2) rgb1 = [x, c, 0]
  else if (hp <= 3) rgb1 = [0, c, x]
  else if (hp <= 4) rgb1 = [0, x, c]
  else if (hp <= 5) rgb1 = [x, 0, c]
  else if (hp <= 6) rgb1 = [c, 0, x]
  let m = l - c * 0.5
  return [
    Math.round(255 * (rgb1[0] + m)),
    Math.round(255 * (rgb1[1] + m)),
    Math.round(255 * (rgb1[2] + m))
  ]
}

export function fromRgb ({red: r, green: g, blue: b}) {
  r /= 255; g /= 255; b /= 255;
  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);
  let d = max - min;
  let h;
  if (d === 0) h = 0;
  else if (max === r) h = (g - b) / d % 6;
  else if (max === g) h = (b - r) / d + 2;
  else if (max === b) h = (r - g) / d + 4;
  let l = (min + max) / 2;
  let s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  return [h * 60, s * 100, l * 100];
}

class HSLColour {

  constructor(hsl) {
    this.hue = hsl.hue
    this.saturation = hsl.saturation
    this.lightness = hsl.lightness
    this.raw = hsl
  }

  toRgb () {
    return toRgb(this.raw)
  }

  fromRgb (rgbColour) {
    return fromRgb(rgbColour)
  }

  toString () { 
    return `${this.hue}, ${this.saturation}, ${this.lightness}`
  }
}

export default HSLColour
