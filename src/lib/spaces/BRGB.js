/*
  BRGB Colourspace
  The Colourspace that no one asked for. Except that one developer
*/

export function toRgb ({ bred, bgreen, bblue }, toArray) {
  function toRGBRange(value) {
    return Math.round((255 * value) / 10000)
  }
  const values = [
    toRGBRange(bred),
    toRGBRange(bgreen),
    toRGBRange(bblue)
  ]
  return toArray ? values : values.toString()
}


/* 
  This isn't actually practical to do. Going to 10,000, unless you actually keep the decimal informtion,
  you are going to end up with a different number than the one you started with. 
  
  Sort of like resizing a picture from 10,000 pixels to 255px and then sizing it back up. THere'll literally
  be some resolution missing.

  But it's here, just in case you wanna approximate it.
*/

export function fromRgb ({red, green, blue}, toArray) {
  function toBRGBRange(value) {
    return Math.round((10000 * value) / 255)
  }
  const values = [
    toBRGBRange(red),
    toBRGBRange(green),
    toBRGBRange(blue)
  ]
  return toArray ? values : values.toString()
}
