import React, { Component } from 'react'
import Swatchable, {
  hslToRgb,
  hexToRgb,
  brgbToRgb
} from 'ec-react-swatchable'

const hslObj = {
  hue: 50,
  saturation: 50,
  lightness: 20
}

const brgbObj = {
  bred: 10000,
  bgreen: 2500,
  bblue: 5000
}

class App extends Component {
  handleOnChange = (colour) => {
    console.log(colour)
  }

  render() {
    return (
      <div style={{width: '800px', margin: '0 auto'}}>
        <h1>Swatch Example</h1>
        <Swatchable onChange={this.handleOnChange} extended />
        <h2>Conversion examples</h2>
        <p>HSL to RGB: {hslToRgb(hslObj).toString()}</p>
        <p>HEX to RGB: {hexToRgb('#FFCCDD').toString()} </p>
        <p>BRGB to RGB: {brgbToRgb(brgbObj).toString()} </p>
      </div>
    )
  }
}

export default App
