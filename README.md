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


### Available Props

The component contains a couple of props to give you some flexibility

### extended

*boolean* Specifying this option will force the colour service to `GET` from `/list-extended`, including brgb colours.

### onChange

*function(colour: string)* If specified, this function will be called whenever the user clicks on a colour, returning an RGB string representaion of the clicked colour.



## Using the conversion functions in your app

Great news, these are exported from the main library and can be used in your code! See below for a rundown on the functions and how to use them.


### Available functions

At the moment, the functions supported include:

#### hslToRgb()

```js
hslToRgb(colourObject: Object, toArray: Boolean)
```

Takes a HSL Colour object as an argument and returns the RGB values as a string or an array.

```js
const hslObj = {
  hue: 278,
  saturation: 24,
  lightness: 47
}
hslToRgb(hslObj)        // '128,91,149'
hslToRgb(hslObj, true)  // [128, 91, 149]

```

#### hexToRgb()

```js
hexToRgb(hexString: String, toArray: Boolean)
```

Takes a Hex Colour string as an argument and returns the RGB values as a string or an array.

```js
const hexValue = '#805b95'
hexToRgb(hexValue)        // '128,91,149'
hexToRgb(hexValue, true)  // [128, 91, 149]

```


#### brgbToRgb()

```js
brgbToRgb(colourObject: Object, toArray: Boolean)
```

Takes a BRGB Colour object as an argument and returns the RGB values as a string or an array.

```js
const brgbObj = {
  bred: 6956,
  bgreen: 7890,
  bblue: 330
}
brgbToRgb(brgbObj)        // '177,201,8'
brgbToRgb(brgbObj, true)  // [177, 201, 8]

```

### Example in use

Here is a full example of the way you might use the conversion functions in your app.

```js

import react from 'react'
import { hslToRgb } from 'ec-react-swatchable'

const hslObj = {
  hue: 278,
  saturation: 24,
  lightness: 47
}

export const ExampleWidget = () => {
  const rgbArr = hslToRgb(hslObj, true)
  const [red, green, blue] = rgbArr
  return (
    <div>
      <p>Red: {red}</p>
      <p>Green: {green}</p>
      <p>Blue: {blue}</p>
      <p>CSS: <code>rgb({rgbArr.join(', ')})</code></p>
    </div>
  )
}

```


## Colour Spaces

We currently support RGB (default), HSL, Hex and BRGB. For all intents and purposes, RGB is the primary colour space for our applications and so the widget and libraries offer conversion back to RGB.

We don't currently support direct conversions from the other spaces to each other.


### Extensibility of Colour spaces

The Colour service within Swatchable is designed to be easily extended. Once a colour space has a toRgb() function, they can be loaded into the Colour Service as middleware.

```js
// This is how the default colour handlers are loaded into the service.
const Colour = new ColourService()
Colour
  .use('hsl', hslToRgb)
  .use('brgb', brgbToRgb)
  .use('hex', hexToRgb)
```

### Defining colour spaces

The default colour spaces are stored within `src/lib/spaces` and provide an excellent example base on which to build your own colour space and conversions.

Ostensibly, a colour space file consists of:

- an exported `toRgb()` function that takes a colour object and returns RGB array array
- an exported `fromRgb()` function that takes an RGB colour object and returns the array or string for the colourspace

It is not always practical to convert back from RGB. If it isn't useful or required for your colour space, you don't need to add the `fromRgb()` function! These are really only used as convenience functions inside the app.


### Adding your colour space

Use the following to add your own custom colour space.

1. Create your own [COLOUR].js file in `src/lib/spaces` Your `toRgb()` and `fromRgb()` should be exported
2. Import the `toRgb()` function into the `ColourService.js` file. Follow the existing pattern of the other importers.
3. Add another call to use, along with the key of the `kind` you are matching
4. If you want the conversion functions to be available, you'll also need to add the import and export functions to `src/index.js`. Again, use the existing patterns
5. Add test coverage:
  a. This should include unit tests for the conversion functions themselves, and
  b. Integration tests for iterating a colour set including your new colour space
6. Pull request time! Follow the standard process of code review and merging.
7. [OPTIONAL] If you are using a private NPM repo, you can now publish the latest version.

## License

MIT © [Matt Bell](https://github.com/delxa)
