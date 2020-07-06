import axios from 'axios'

import { toRgb as rgbOut } from './spaces/RGB'
import { toRgb as hslToRgb } from './spaces/HSL'
import { toRgb as brgbToRgb } from './spaces/BRGB'
import { toRgb as hexToRgb } from './spaces/HEX'

class ColourService {
  constructor () {
    this.api = axios.create({
      baseURL: 'https://challenge.structrs.com/rest/colors'
    })
    this.spaces = {}
    this.use('rgb', rgbOut)
  }

  async fetchColourList (extended = false) {
    try {
      const { data } = await this.api.get(`/list${extended ? '-extended' : ''}`)
      return this.convertColours(data)
    } catch (e) {
      throw new Error('The request could not be completed. Check your connection.')
    }
  }

  // Load ColourSpace convert to RGB middleware into the service
  use (key, fnConvert) {
    this.spaces[key] = fnConvert
    return this
  }

  // Return an instance of a colour in a specific colour space
  convertColour (colourObject) {
    const { components, kind } = colourObject
    if (!Object.prototype.hasOwnProperty.call(this.spaces, kind)) throw new Error(`A handler for colour type '${kind}' has not been loaded.`)
    return this.spaces[kind](components)
  }

  convertColours (data) {
    return data.map(colour => {
      return this.convertColour(colour)
    })
  }
}

export const Colour = new ColourService()
Colour
  .use('hsl', hslToRgb)
  .use('brgb', brgbToRgb)
  .use('hex', hexToRgb)

export default ColourService