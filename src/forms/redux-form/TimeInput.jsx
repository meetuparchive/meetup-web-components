import React from 'react';
import TimeInput from '../TimeInput';

/**
 * This component wraps the standard TimeInput for use with redux-form.
 * It deconstructs props that redux-form sets and re-sets them on TimeInput.
 * @param {object} props React component props
 * @return {React.Component} TimeInput
 */
const ReduxFormTimeInput = props => {
	const { input, meta, ...other } = props;
	console.log('HELLO HELLO HELLO');
	return <TimeInput {...input} error={meta.touched && meta.error} {...other} />;
};

ReduxFormTimeInput.displayName = 'ReduxFormTimeInput';

export default ReduxFormTimeInput;
