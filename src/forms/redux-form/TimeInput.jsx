import React from 'react';
import TimeInput from '../TimeInput';

/**
 * This component wraps the standard TimeInput for use with redux-form.
 * It deconstructs props that redux-form sets and re-sets them on TimeInput.
 * @param {object} props React component props
 * @return {React.Component} TimeInput
 */
const ReduxFormTimeInput = props => {
	const { input, meta, validateBeforeTouched, ...other } = props;
	const error = (validateBeforeTouched || meta.touched) ? meta.error : null;

	return <TimeInput {...input} error={error} {...other} />;
};

ReduxFormTimeInput.displayName = 'ReduxFormTimeInput';

export default ReduxFormTimeInput;
