import React from 'react';
import TimeInput from '../TimeInput';

/**
 * @param {Object} props - props passed in from parent and redux-form
 * @description wraps standard TimeInput web component for use with redux-form
 * deconstructs props that redux-forms sets and sets them on TimeInput
 * @return {Component} TimeInput
 */
const ReduxFormTimeInput = props => {
	const { meta, input, ...other } = props;
	return <TimeInput error={meta.error} {...input} {...other} />;
};

ReduxFormTimeInput.displayName = 'ReduxFormTimeInput';

export default ReduxFormTimeInput;
