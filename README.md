# ec-react-swatchable

> Extensible colour swatch selector (Draft stage)

[![NPM](https://img.shields.io/npm/v/ec-react-swatchable.svg)](https://www.npmjs.com/package/ec-react-swatchable) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

See [DevNotes.md](https://github.com/delxa/ec-react-swatchable/blob/master/DevNotes.md) for the making of this library.

## Install

Installation options depend on the availability of a private npm registry. For demo purposes, installing from GitHub is fine.

### Install from github repo

```bash
npm install --save delxa/ec-react-swatchable
```

### Install from internal npm

Assumes you're using [Scoped Packages](https://docs.npmjs.com/using-npm/scope.html) with your org associated with a private repo.

```bash
npm install --save @ec/ec-react-swatchable
```

**Note:** taking this approach will change all of your import statements.


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


## Available Props

The component contains a couple of props to give you some flexibility

### extended

*boolean* Specifying this option will force the colour service to `GET` from `/list-extended`, including brgb colours.

### onChange

*function(colour: string)* If specified, this function will be called whenever the use clicks on a colour, returning a string representaion of the clicked colour.


## Colour Spaces

The Colour service within Swatchable is designed to be easily extended. The default colour spaces are stored within `src/lib/spaces` and provide an excellent example base on which to build your own conversions.

Ostensibly, a colour space file consists of:

- an exported `toRgb()` function that takes a colour object and returns RGB array array
- an exported `fromRgb()` function that takes an RGB colour object and returns the array or string for the colourspace

The `ColourService.js` file exports both the classs, as well as singleton instance of the class with the default convertors preloaded.

### Adding your colour space

Use the following to add your own custom colour space.

1. Create your own [COLOUR].js file in `src/lib/spaces` Your toRgb() and fromRgb() should be exported
2. Import the `toRgb()` function into the `ColourService.js` file. Follow the existing pattern of the other importers.
3. Add another call to use, along with the key of the `kind` you are matching
4. If you want the conversion functions to be available, you'll also need to add the import and export functions to `src/index.js`. Again, use the existing patterns
5. Add test coverage:
  a. This should include unit tests for the conversion functions themselves, and
  b. Integration tests for iterating a colour set including your new colour space
6. Pull request time! Follow the standard process of code review and merging.


## License

MIT © [Matt Bell](https://github.com/delxa)
