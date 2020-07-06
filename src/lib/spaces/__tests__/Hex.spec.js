/* eslint-env jest, mocha */

import { toRgb, fromRgb } from '../Hex'

const hexMock = '#193264'
const rgbMock = {
  red: 25,
  green: 50,
  blue: 100
}


describe('Hex', () => {
  describe('toRgb()', () => {

    test('Converts Hex to RGB correctly', () => {
      expect(toRgb(hexMock)).toEqual('25,50,100')
    })

    test('Returns an array if optional param provided', () => {
      expect(toRgb(hexMock, true)).toEqual([25, 50, 100])
    })
  })

  describe('fromRgb()', () => {
    test('Converts from RGB correctly', () => {
      expect(fromRgb(rgbMock)).toEqual(hexMock)
    })
  })
})
