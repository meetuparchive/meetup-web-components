import React from 'react';
import DateTimePicker from '../DateTimePicker';

/**
 * @param {Object} props - props passed in from parent and redux-form
 * @description wraps standard TextInput web component for use with redux-form
 * deconstructs props that redux-forms sets and sets them on TextInput
 * @return {Component} TextInput
 */
const ReduxFormDateTimePicker = props => {
	const { meta, input, ...other } = props;
	let error = {};
	if (meta.touched) {
		error = { error: meta.error };
	}
	return <DateTimePicker {...error} {...input} {...other} />;
};

ReduxFormDateTimePicker.displayName = 'ReduxFormDateTimePicker';

export default ReduxFormDateTimePicker;
