import React from 'react';
import TogglePill from '../TogglePill';

/**
 * @param {Object} props - props passed in from parent and redux-form
 * @description wraps standard TogglePill web component for use with redux-form
 * deconstructs props that redux-forms sets and sets them on TogglePill
 *
 * NOTE: redux-form expects checkboxes value to be true/false and will set them as so
 * https://github.com/erikras/redux-form/issues/2922, therefore using the value here to
 * set isActive
 *
 * @return {Component} TogglePill
 */
const ReduxFormTogglePill = props => {
	// not adding meta error to TogglePill prop for now
	// since TogglePills should function in a group with one error
	const {
		meta, // eslint-disable-line no-unused-vars
		input,
		...other
	} = props;

	return (
		<TogglePill
			{...input}
			isActive={input.value === true && !other.useRadio}
			{...other}
		/>
	);
};

ReduxFormTogglePill.displayName = 'ReduxFormTogglePill';

export default ReduxFormTogglePill;
