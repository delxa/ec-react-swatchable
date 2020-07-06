## Code challenge Summary

Thank you for the opportunity to get amongst this code challenge. I've not been this absorbed trying to solve something in quite some time.

### What got done

- A new library for a React component
- Some basic styled UI
- An extensible colourspace implementation that makes adding more easy

### What didn't get done

- Extensive tests of component, states and behaviors
- typescript (Read why further down)
- As much cleanup as I would have liked
- Linting
- Code running in the cloud (i generallly like doing this where practical.)

If you do want to see some examples of testing, code running in cloud, here is some recent work also [Repo](https://github.com/delxa/aw-broccoli-co)|[Site](https://broccoli.mattbell.name/)

### What I learnt

- Rabbit holes. So many
- create-react-library does what it says on the tin but honestly, so slow. Has to be a better way
- Hooks are super useful. Keen to try out the reducer implementation!


### Addressing the stage considerations

#### Stage 1

HSL conversion to and from RGB was added in. The code samples I found needed some adjustment in order to work with our data. These were made available for import into other dependent projects. I did look into the logic involved enough to understand what these are actually doing. Going from HSL to RGB is way harder with so many conditions to fulfil.

#### Stage 2

The webservice calls were pretty straight forward. I ended up using Hooks to implement the flow of triggeringa  request and updating the component state once the data was received.

THe colour service handles the data and does the conversion before passing it back to hte component to keep it simplistic. The middleware approach to the service makes loading in additional types super easy.

### Stage 3

With the chosen approach, the hardest thing with BRGB was working out the maths. Otherwise, it was straight forward to implement this. With the middleware loaded in to do the conversion, hitting the other endpoint simply worked in displaying the swatches.

### Stage 4

The approach does make it straight forward to offer a baseline conversion for new colour spaces. I would also have liked a way to be able to be able to load in additional middleware from the consuming app, as well as to be able to provide data itself to the component, rather than relying on it's own approach.

I did like the ColourSpaces as classes concept earlier on. There would have been a tradeoff in ease of implementing nore colorspaces but would have led to a much nicer way of playing with colours.

This would have enabled things like:

```js
const hsl = new HSLColour('320, 40, 50')
hsl.toRgb()

// If it returned the new colour as an RGBColour, you could do something crazy like
hsl.toRgb().toString()

```

Ultimately, this power and flexibility was not needed and again, would have made implemenation harder. It was sad to cut it.


-------


## Development Notes

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

Yes, I also added an implementation for hex colours. It took 10 mins with this approach:)


## So, what happened to typescript?

I made great progress in getting the app, components etc set up with proper typing. The external dependencies were challenging to get working (style-components being one.)

But to my deep frustration, the tooling was slowing EVERYTHING down by an order of magnitude and was hindering my progress so much that I ended up making the call to shift away from Typescript for the purpose of this assignment.

I'm sure this could be partially my setup but I just did not have the time to debug it.

