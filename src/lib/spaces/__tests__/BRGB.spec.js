/* eslint-env jest, mocha */

import { toRgb, fromRgb } from '../BRGB'

const brgbMock = {
  bred: 10000,
  bgreen: 10000,
  bblue: 10000
}

const rgbMock = {
  red: 100,
  green: 100,
  blue: 100
}

describe('BRGB', () => {
  describe('toRgb()', () => {

    test('Converts to RGB correctly', () => {
      expect(toRgb(brgbMock)).toEqual('255,255,255')
    })

    test('Returns an array if optional param provided', () => {
      expect(toRgb(brgbMock, true)).toEqual([255,255,255])
    })
  })

  describe('fromRgb()', () => {

    test('Converts from RGB correctly', () => {
      expect(fromRgb(rgbMock)).toEqual('3922,3922,3922')
    })

    test('Returns an array if optional param provided', () => {
      expect(fromRgb(rgbMock, true)).toEqual([3922,3922,3922])
    })
  })
})
