import React, { Component } from 'react'

import Swatchable from 'ec-react-swatchable'

class App extends Component {
  handleOnChange = (colour) => {
    console.log(colour)
  }

  render() {
    return <Swatchable onChange={this.handleOnChange} extended />
  }
}

export default App
