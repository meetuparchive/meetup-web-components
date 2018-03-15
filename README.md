[![npm version](https://badge.fury.io/js/meetup-web-components.svg)](https://badge.fury.io/js/meetup-web-components) [![Build Status](https://travis-ci.org/meetup/meetup-web-components.svg?branch=master)](https://travis-ci.org/meetup/meetup-web-components) [![Coverage Status](https://coveralls.io/repos/github/meetup/meetup-web-components/badge.svg?branch=master)](https://coveralls.io/github/meetup/meetup-web-components?branch=master)

# meetup-web-components
Meetup library of React UI components for the web.

Table of Contents
=================

  * [Releases](#releases)
    * [Development/Beta release](#developmentbeta-releases)
  * [Getting started](#getting-started)
    * [Components](#components)
	* [Redux Form Components](#redux-form-components)
  * [Testing](#testing)
    * [Simulating interactions](#simulating-interactions)
    * [Verifying child elements](#verifying-child-elements)
  * [Linting](#linting)
  * [Storybook](#storybook)
  * [Release notes](#release-notes)

## Component checklist
This checklist can be used as a guide for adding components that are easy to reuse and maintain. The categories come from a talk I saw [Elyse Holladay](https://elyseholladay.github.io/) give at Clarity Conf 2017.

**Easy to reason about**
* [ ] It will be clear to other designers or engineers what problem the component solves and when to use it
* [ ] All properties, options and variants are documented in Storybook
* [ ] Has unit tests
* [ ] Provides logical defaults
* [ ] If there can be errors, error states are designed and documented
* [ ] If the component has become complex, it has been broken into smaller components

**Context-agnostic**
* [ ] Doesn't rely on a parent component to behave or look correctly
* [ ] Doesn't have logic that controls functionality outside of itself e.g.: if there is a button in the component, it should take an event handler via props instead of assuming what the button is going to do
* [ ] Works in supported browsers and devices
* [ ] Design is [accessible](https://meetup.github.io/swarm-design-system/design/usability/a11y/) for all users
* [ ] Provides necessary ARIA information
* [ ] Design won't cause issues with translation or [internationalization](https://meetup.github.io/swarm-design-system/design/usability/i18n/)

**Independent and isolated**
* [ ] Only affects itself
* [ ] Defines itself and its styles only in one place
* [ ] Ready to use "out of the box" in consumer apps or by other components

## Releases

This package uses semver versioning to tag releases, although the patch version
is determined exclusively by the Travis build number for pushes to `master`.
Major and minor versions are hard-coded into the [Makefile](Makefile#L2).

Manual pushes to `master` and PR merges to master will be built by Travis, and
will kick off the yarn publish routine. The currently-published version of the
package is shown on the repo homepage on GitHub in a badge at the top of the
README.

### Development/Beta releases

When developing a consumer application that requires changes to the platform
code, you can release a beta version of the platform on npm by opening a PR in
the meetup-web-platform repo. When it builds successfully, a new beta version
will be added to the list of available npm versions. The generated version number
is in the Travis build logs, which you can navigate to by clicking on 'Show all
checks' in the box that says 'All checks have passed', and then getting the
'Details' of the Travis build.

<img width="797" alt="screen shot 2016-10-29 at 10 25 20 am" src="https://cloud.githubusercontent.com/assets/1885153/19822867/26d007dc-9dc2-11e6-8059-96d368411e78.png">

<img width="685" alt="screen shot 2016-10-29 at 10 25 29 am" src="https://cloud.githubusercontent.com/assets/1885153/19822869/28d1f432-9dc2-11e6-8157-3d381746f315.png">

At the bottom of the build log, there is a line that `echo`s the `GIT_TAG`.
If you click the disclosure arrow, the version number will be displayed, e.g.
`0.5.177-beta`.

<img width="343" alt="screen shot 2016-10-29 at 10 25 59 am" src="https://cloud.githubusercontent.com/assets/1885153/19822874/312a9792-9dc2-11e6-97bc-62f61d252d4e.png">

<img width="418" alt="screen shot 2016-10-29 at 10 26 06 am" src="https://cloud.githubusercontent.com/assets/1885153/19822876/34182e9c-9dc2-11e6-9901-c8e68591dc12.png">

You can then install this beta version into your consumer application with

```sh
> yarn install meetup-web-components@<version tag>
```

Each time you push a change to your `meetup-web-components` PR, you'll need to
re-install it with the new tag in your consumer application code.

The overall workflow is:

1. Open a PR for your `meetup-web-components` branch
2. Wait for Travis to successfully build your branch (this can take 5+ minutes)
3. Get the version string from the build logs under `GIT_TAG`
4. (if needed) Push changes to your `meetup-web-components` branch
5. Repeat steps 2-3

## Getting started

You can generate the boilerplate files for React components using
`yarn run generate`, which invokes `src/utils/generate.js`.

The command will prompt you for a 'type' (select from the list of options),
and a 'name'. It generates the following files in `src/` :

- `<ComponentName>.jsx` Component JSX module
- `<componentName>.test.jsx` Component test script
- `<componentName>.story.jsx` Storybook script

### Components

Located in the `src/` directory, component files live alongside
their corresponding `.test` and `.story` files.

Filename casing conventions:
- Component files: `CamelCase`, with a leading capital, i.e. `RsvpTag.jsx`
- Test files: `camelCase`, i.e. `rsvpTag.test.js`
- Story files: `camelCase`, i.e. `rsvpTag.story.jsx`

### Redux Form Components

We use [`redux-form`](https://redux-form.com/) in our `mup-web` app to help with validation flow.  

`redux-form` can use our form components (just pass our MWC component to `Field` as the [`component` prop](https://redux-form.com/7.0.4/docs/api/field.md/#-code-component-component-function-string-code-required-)), but we need to write wrappers to pass down the props from `redux-form` `Field` to our form components in `meetup-web-components`.

The job of the wrapper for each component is mostly just parsing out the `meta`, `input` and `other` props from `redux-form` and passing them on.

#### Conventions
You can find the wrapper classes in `src/forms/redux-form`.  

The files are named after the classes they wrap to avoid verbose file names.
Ex. `forms/TogglePill.jsx` has a `forms/redux-form/TogglePill.jsx`. 

But the actual class name to import and `displayName`, have `ReduxForm` in the name.  
Ex. `export class ReduxFormTogglePill`

We write wrappers as we need them, so if you don't find one that you need, please write it!

#### Gotchas

We've run into a couple gotchas already:
`redux-form` validates all fields on load, and its hard to tell when the form is first rendered. To avoid displaying errors right away, we added some logic to read [`meta.touched`](https://redux-form.com/7.0.4/docs/api/field.md/#-code-meta-touched-boolean-code-). https://github.com/meetup/meetup-web-components/pull/307

`redux-form`'s implementation of checkboxes give them values of `true` and `false`. 
`ReduxFormTogglePill` wrappers handle this now by passing the `input.value` prop down as `isActive` (which sets `checked` on checkboxes)
https://github.com/meetup/meetup-web-components/pull/310.  
We may need to do this for other checkbox, radio component wrappers.


### Layout conventions

The `src/` directory contains layout helpers, like `Section` and `Chunk`. These are
documented in Storybook, but a [more detailed guide can be found here](https://meetup.atlassian.net/wiki/display/SDS/Guide+to+Layout+Components).


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

`$ yarn run lint`

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
$ yarn install
$ yarn run storybook
```

And open the viewer at [http://localhost:9001](http://localhost:9001)

All of the available components are listed on the left, and clicking on
one will open it in the preview pane. Variants are also listed in the left
column to show how different states affect the rendered component.

## Release notes

### `v4.5.X`
- Replaced `flatpickr` in `CalendarComponent` with `react-flatpickr`

### `v4.4.X`
Form errors update
- removed error elements and logic from base form components
- form components are now wrapped by the new `withErrorList` HOC to handle error rendering

### `v4.3.X`
- Upgraded to a version of `swarm-sasstools` where we replace responsive sizing/spacing mixins with CSS custom properties
- Removed the `responsiveVarContext` mixin. Usage must be replaced with the `customPropertyValue( <property>, var(--responsiveSpace), $space)` mixin.
	- [Example usage of customPropertyValue](https://github.com/meetup/meetup-web-components/blob/master/assets/scss/components/_inlineblockList.scss#L49)
	- [customPropertyValue documentation](https://meetup.github.io/swarm-sasstools/sassdoc/index.html#mixin-customPropertyValue)

### `v1.1.X`
Icons update
- Updated `swarm-icons` to `1.0.0`
- Updated `Icon` component to support rendering of separate SVG symbols for `xs` sizes
- Added `_icon.scss` component sass partial
	- allows `meetup-web-components` to provide icon styling to consumer apps
	- changes default icon color to `secondary` from `inherit`
- Removes unused and confusing `auto` prop from `Icon`
- Fixed issue where `Icon` would not accept the `xxl` media size

