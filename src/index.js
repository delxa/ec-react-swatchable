import React from 'react'
import Swatchable from './components/Swatchable'

import { toRgb as hslToRgb } from './lib/spaces/HSL'
import { toRgb as brgbToRgb } from './lib/spaces/BRGB'
import { toRgb as hexToRgb } from './lib/spaces/HEX'

export { 
  hslToRgb,
  brgbToRgb,
  hexToRgb
}

export default Swatchable

