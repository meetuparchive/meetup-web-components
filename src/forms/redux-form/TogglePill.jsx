import React from 'react';
import TogglePill from '../TogglePill';

/**
 * @param {Object} props - props passed in from parent and redux-form
 * @description wraps standard TogglePill web component for use with redux-form
 * deconstructs props that redux-forms sets and sets them on TextInput
 * @return {Component} TogglePill
 */
const ReduxFormTogglePill = props => {
	const {
		meta, // eslint-disable-line no-unused-vars
		// not adding meta error to TogglePill prop for now
		input,
		...other
	} = props;

	console.log('HELLO PROPS');
	// const checkedProp = input.value == true ? 'checked' : '';

	return <TogglePill {...input} isActive={!!input.value} {...other} />;
};

ReduxFormTogglePill.displayName = 'ReduxFormTogglePill';

export default ReduxFormTogglePill;
