# meetup-web-components
Meetup library of React UI components for the web.

Table of Contents
=================

  * [Getting started](#getting-started)
    * [Components](#components)
    * [Icons](#icons)
  * [Testing](#testing)
    * [Simulating interactions](#simulating-interactions)
    * [Verifying child elements](#verifying-child-elements)
  * [Linting](#linting)
  * [Storybook](#storybook)

## Getting started

You can generate the boilerplate files for React components using
`npm run generate`, which invokes `utils/generate.js`.

The command will prompt you for a 'type' (select from the list of options),
and a 'name'. It generates the following files in `components/` :

- `<ComponentName>.jsx` Component JSX module
- `<componentname>.test.jsx` Component test script
- `<componentname>.story.jsx` Storybook script

### Components

Located in the `components/` directory, component files live alongside
their corresponding `.test` and `.story` files.

Filename casing convenctions:
- Component files: `CamelCase`, with a leading capital, i.e. `RsvpTag.jsx`
- Test files: `alllowercase`, i.e. `rsvptag.test.js`
- Story files: `alllowercase`, i.e. `rsvptag.story.jsx`

### Icons

SVG icons live in the `icons/` directory. These filenames are *all lowercase
with dashes*.

## Testing

Unit testing UI components is a little weird compared with unit testing business logic.

1. You have to decide what aspects of a UI element are intrinsic to its appearance
rather than just implementation details
2. UI elements evolve based on aesthetic tastes as much as functional requirements -
inflexible tests require a lot of maintenance
3. Headless testing of browser-dependent objects requires some extra tooling to simulate
the target environment

### Simulating interaction

`TestUtils.Simulate` appears to work correctly for our testing setup - it should be used
for all tests that involve simulating events, like `onClick`. Check out `button.test.js`
for an example.

### Verifying child elements

In UI testing, there is an almost invisible line between testing the implementation (markup)
and testing the behavior (appearance/content), and ideally you only should test the behavior -
there are loads of ways to change markup without changing the fundamental app experience, and
those kinds of markup changes should not be considered "bugs" that result in failed tests.

The implication for constructing unit tests is that you should avoid relying on the specific
markup (tags and DOM structure). Sometimes it's unavoidable, but if you are inclined to use
`getElementsByTagName`, `firstChild/lastChild`, or a `querySelector(All)` that includes a tag
name to access particular parts of the component UI, check whether there is a better way to skip
over the markup implementation details and grab what you want explicitly.

A useful option is to add a PCV `className` to the element of interest, and just use
`yourComponentEl.querySelector('.specificClassName')` to find it. Classnames are free and
DOM-independent, which means that no matter what the markup is for your event name, you can
always unit-test the behavior (text content) accurately with

```js
// good
expect(eventNode.querySelector('.event-name').textContent).toEqual(testEventName);

// bad - assumes both tag (h5) and structure (first h5 in the card)
expect(eventNode.getElementsByTagName('h5')[0].textContent).toEqual(testEventName);
```

## Linting

To manually lint your code, run:

`$ npm run lint`

Whitespace issues will be fixed automatically - just remember to commit the changes. Other style
issues will log errors. Our `.eslintrc` configuration is based on the 'recommended' preset, with
a number of additional rules that have been requested by the dev team. It's a 'living' standard,
however, so please feel free to send PRs with updates!

## Storybook

Before building any components, it's helpful to know what related components
have already been built into our Foundation library. We use
[React Storybook](https://github.com/kadirahq/react-storybook)
to display components outside of the app context. To open it, run:

```sh
$ npm run storybook
```

And open the viewer at [http://localhost:9001](http://localhost:9001)

All of the available components are listed on the left, and clicking on
one will open it in the preview pane. Variants are also listed in the left
column to show how different states affect the rendered component.

