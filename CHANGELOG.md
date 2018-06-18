# [4.12]

- **Change** Refactored AccordionPanelGroup not to use deprecated lifecycle methods `componentWillMount` and `componentWillReceiveProps`. This had a nice side-effect of removing a lot of code and complexity

# [4.11]

- **Feature** Added the ability to set the close area at the top of a Modal to be sticky using the `stickyCloseArea` prop

# [4.10]

- **Change** Reformatted code with Prettier and Stylelint

# [4.9]

- **BREAKING CHANGE** `Nav` component now requires `media`, from `connectWithMatchMedia`, as a prop.

# [4.7]

- **Visual Change** Updated `TogglePill` styles per the design team's specifications.
  These updates will partially break in `mup-web` if the original style
  overrides are not removed

# [4.5]

- **Change** Replaced `flatpickr` in `CalendarComponent` with `react-flatpickr`

# [4.4]

- **Change** removed error elements and logic from base form components.
  Form components are now wrapped by the new `withErrorList` HOC to handle
  error rendering

# [4.3]

- **BREAKING CHANGE** Removed the `responsiveVarContext` mixin. Usage must be replaced 
  with the `customPropertyValue( <property>, var(--responsiveSpace), $space)` mixin.
	- [Example usage of customPropertyValue](https://github.com/meetup/meetup-web-components/blob/master/assets/scss/components/_inlineblockList.scss#L49)
	- [customPropertyValue documentation](https://meetup.github.io/swarm-sasstools/sassdoc/index.html#mixin-customPropertyValue)
- **Change** Upgraded to a version of `swarm-sasstools` where we replace
  responsive sizing/spacing mixins with CSS custom properties

# [3.3]

- **Feature** `ReduxFormNumberInput` for use with Redux-Form
