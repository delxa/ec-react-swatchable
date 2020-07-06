
// Import components
import Swatchable from './components/Swatchable'
import Swatch from './components/Swatch'

// Import convertor functions
import { toRgb as hslToRgb } from './lib/spaces/HSL'
import { toRgb as brgbToRgb } from './lib/spaces/BRGB'
import { toRgb as hexToRgb } from './lib/spaces/HEX'

// Export convertor functions.
export { 
  hslToRgb,
  brgbToRgb,
  hexToRgb,
  Swatch
}

// Default export
export default Swatchable

