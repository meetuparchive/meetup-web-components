import React from 'react';
import TextInput from '../TextInput';

/**
 * @param {Object} props - props passed in from parent and redux-form
 * @description wraps standard TextInput web component for use with redux-form
 * deconstructs props that redux-forms sets and sets them on TextInput
 * @return {Component} TextInput
 */
const ReduxFormTextInput = props => {
	const { meta, input, validateBeforeTouched, ...other } = props;
	const error = (validateBeforeTouched || meta.touched) ? meta.error : null;

	return <TextInput error={error} {...input} {...other} />;
};

ReduxFormTextInput.displayName = 'ReduxFormTextInput';

export default ReduxFormTextInput;
