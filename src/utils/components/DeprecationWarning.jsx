import React from 'react';

// Swarm Usage & Expectations Doc -> https://docs.google.com/document/d/1aj8FGlpoXQbDzvFgVpaWHzlGn4DfiexHzx96r63Me_4/edit#heading=h.ozjf42vcdlpq

// List of components to be removed from meetup-web-components on October 3, 2019 ->
// + Button
// + Checkbox
// + TextInput
// + CharCounter
// + NumberInput
// + RadioButton
// + RadioButtonGroup
// + Select
// + SelectInput
// + TogglePill
// + ToggleSwitch

// All questions and concerns should be directed to #swarm in slack

// 'global' record of which components have already logged a warning
const hasBeenWarned = {};

function DeprecationWarning(WrappedComponent) {
	return class extends React.Component {
		componentDidMount() {
			if (!hasBeenWarned[WrappedComponent.name]) {
				console.warn(
					`The ${
						WrappedComponent.name
					} component has been deprecated and will be removed from meetup-web-components on October 3, 2019. Please upgrade to the latest from https://github.com/meetup/swarm-ui`
				);
				hasBeenWarned[WrappedComponent.name] = true;
			}
		}

		render() {
			return <WrappedComponent {...this.props} />;
		}
	};
}

export default DeprecationWarning;
