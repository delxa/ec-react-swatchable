/*
  RGBV Colourspace
  Base as base can be.
*/

export function toRgb ({red, green, blue}, toArray) {
  const values = [
    red,
    green,
    blue
  ]
  return toArray ? values : values.toString()
}
