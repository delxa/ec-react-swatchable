import React, { Component } from 'react'
import Swatchable, {
  hslToRgb,
  hexToRgb,
  brgbToRgb,
  Swatch
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

const hexStr = '#FFCCDD'

// 
const hslVal = hslToRgb(hslObj).toString()
const hexVal = hexToRgb(hexStr).toString()
const brgbVal = brgbToRgb(brgbObj).toString()


class App extends Component {
  
  state = {
    selected: 'none'
  }

  handleOnChange = (colour) => {
    this.setState({selected: colour})
  }

  render() {
    return (
      <div style={{width: '800px', margin: '0 auto'}}>
        <h1>Swatch Example</h1>
        <Swatchable onChange={this.handleOnChange} extended />
        <p>You selected: {this.state.selected} <small>This uses the <code>onChange</code> prop of the component.</small></p>
        <hr />
        <h2>Inlined Conversion examples</h2>
        <p>HSL to RGB: {hslToRgb(hslObj).toString()}</p>
        <p>HEX to RGB: {hexToRgb(hexStr).toString()} </p>
        <p>BRGB to RGB: {brgbToRgb(brgbObj).toString()} </p>
        <hr />
        <h2>Render Swatches</h2>
        <p><Swatch colour={hslVal} /> <strong>{hslVal}</strong></p>
        <p><Swatch colour={hexVal} /> <strong>{hexVal}</strong></p>
        <p><Swatch colour={brgbVal} /> <strong>{brgbVal}</strong></p>

      </div>
    )
  }
}

export default App
