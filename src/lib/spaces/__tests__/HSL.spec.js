/* eslint-env jest, mocha */

import { toRgb, fromRgb } from '../HSL'

const hslMock = {
  hue: 100,
  saturation: 25,
  lightness: 50
}

const hslGreyMock = {
  hue: 0,
  saturation: 0,
  lightness: 50
}

const rgbMock = {
  red: 117,
  green: 159,
  blue: 96
}

const rgbGreyMock = {
  red: 128,
  green: 128,
  blue: 128
}

describe('HSL', () => {
  describe('toRgb()', () => {

    test('Converts HSL to RGB correctly with saturation', () => {
      const { red, green, blue } = rgbMock
      expect(toRgb(hslMock)).toEqual(`${red},${green},${blue}`)
    })

    test('Converts HSL to RGB correctly as greyscale', () => {
      const { red, green, blue } = rgbGreyMock
      expect(toRgb(hslGreyMock)).toEqual(`${red},${green},${blue}`)
    })

    test('Returns an array if optional param provided', () => {
      const { red, green, blue } = rgbMock
      expect(toRgb(hslMock, true)).toEqual([red, green, blue])
    })
  })

  describe('fromRgb()', () => {

    test('Converts from RGB correctly', () => {
      const { hue, saturation, lightness } = hslMock
      expect(fromRgb(rgbMock)).toEqual(`${hue},${saturation},${lightness}`)
    })

    test('Converts from RGB correctly with greyscale', () => {
      const { hue, saturation, lightness } = hslGreyMock
      expect(fromRgb(rgbGreyMock)).toEqual(`${hue},${saturation},${lightness}`)
    })

    test('Returns an array if optional param provided', () => {
      const { hue, saturation, lightness } = hslMock
      expect(fromRgb(rgbMock, true)).toEqual([hue, saturation, lightness])
    })
  })
})
