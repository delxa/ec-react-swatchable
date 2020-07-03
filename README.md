# ec-react-swatchable

> Extensible colour swatch selector (Draft stage)

[![NPM](https://img.shields.io/npm/v/ec-react-swatchable.svg)](https://www.npmjs.com/package/ec-react-swatchable) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save ec-react-swatchable
```

## Usage

```jsx
import React, { Component } from 'react'

import Swatchable from 'ec-react-swatchable'

class Example extends Component {
  handleOnChange = (colour) => {
    console.log(`Selection changed to ${colour}.`)
  }

  render() {
    return <Swatchable onChange={this.handleOnChange} extended />
  }
}
```

## Adding new colour spaces for conversion

The Colour service within Swatchable is designed to be easily extended. The default colour spaces are stored within `src/lib/spaces` and provide an excellent example base on which to build your own conversions.

Ostensibly, a colour space file consists of:

- an exported `toRgb()` function that takes a colour object and returns RGB array array
- an exported `fromRgb()` function that takes an RGB colour object and returns the array or string for the colourspace
- a class from which instances of the Colour in the space can be created from a Colour object and the conversion functions used.

The ColourService file exports both the classs, as well as singleton instance of the class with the default convertors preloaded.

## License

MIT © [delxa](https://github.com/delxa)
