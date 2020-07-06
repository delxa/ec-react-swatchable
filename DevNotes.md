# Development Notes

These are intended to take you through a bit more of the thinking around initial thoughts through implementation and final product, in a bit more detail than what is represented by the code

## Overall objectives

- Meet the functional goals for the assignment
- Try some things I hadn't used before:
  - Typescript (Attempt aborted, see below)
  - React Hooks 
  - create-react-library


## Architectural considerations

Below are some categorised musings about how this might work and what ended up happening.

### Developer Experience

In thinking about developer experience, here's some of the things that came to mind.

- This library would stored as a package and installed from internal npm or Code repository
- It could then be required and used easily in an app
- The coolour conversion functions would also be exported, allowing them to be imported and used
- New colour spaces could easily be added, if needed


### Colour Spaces

My first thought around this was to create classes for each of the colour spaces and then "plug" them into a Colour service. Additionally, the classes themselves could be instanced with a colour object and then conversion and toString methods could be called

```js

import { HSLColour } from 'ec-react-swatchable'

const objHsl = {
  hue: 200,
  saturation: 50,
  lightness: 20
}

let exampleHsl = new HSLColour(objHsl)

exampleHsl.toRgb()    \\ [26, 59, 77]
exampleHsl.toString() \\ '200,50,20'

```

In an ideal world, the constructor could also be called with any of Colour Object, String or Array and could be parsed.

HOWEVER

After building this and making the app work as needed, I hit upon the following realisations:

- The app really only uses the `toRgb()` function
- Having to create a class, incorporate the parser and map the functions would create unnecessary overhead for developers, given the current scope
- This "full" functionality was ostensibly being built before it was actually required
- Starting with just the toRgb() method wouldn't preclude moving to a more complex implementation later

### Colour space pluggability

I've always loved the middleware pattern, ever since diving into it with Express years back when starting with node. While not a true middleware implementation, (the function does not self-check and return or `next()`) the pattern of `use('condition', funcToBeCalled)` seemed to be a nice way to do this.

So in this case, each of the Colour space toRgb functions are loaded into colourService against a key matching the 'kind' of image they support. As the service receives the colour data from the server, the data is reduced, the `kind` is matched to a handler and the `components` are passed in.

Conceivably, refactoring the ColourService to take a map of kind and handler values when instanced would also be simple.

Example of the current implementation:

```js
import { toRgb as rgbOut } from './spaces/RGB'
import { toRgb as hslToRgb } from './spaces/HSL'
import { toRgb as brgbToRgb } from './spaces/BRGB'
import { toRgb as hexToRgb } from './spaces/HEX'

export const Colour = new ColourService()
Colour
  .use('hsl', hslToRgb)
  .use('brgb', brgbToRgb)
  .use('hex', hexToRgb)

```

Yes, I also added an implementation for hex colours. :)


## So, what happened to typescript?

I made great progress in getting the app, components etc set up with proper typing. The external dependencies were challenging to get working (style-components being one.)

But to my deep frustration, the tooling was slowing EVERYTHING down by an order of magnitude and was hindering my progress so much that I ended up making the call to shift away from Typescript for the purpose of this assignment.

I'm sure this could be partially my setup but I just did not have the time to debug it.


