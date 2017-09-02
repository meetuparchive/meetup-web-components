import React from 'react';
import TextInput from '../TextInput';

/**
 * @param {Object} props - props passed in from parent and redux-form
 * @description wraps standard TextInput web component for use with redux-form
 * deconstructs props that redux-forms sets and sets them on TextInput
 * @return {Component} TextInput
 */
const ReduxFormTextInput = props => {
	const { meta, input, ...other } = props;

	return <TextInput error={meta.error} {...input} {...other} />;
};

ReduxFormTextInput.displayName = 'ReduxFormTextInput';

export default ReduxFormTextInput;
