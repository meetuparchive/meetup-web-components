import React from 'react';
import NumberInput from '../NumberInput';

/**
 * @param {Object} props - props passed in from parent and redux-form
 * @description wraps standard NumberInput web component for use with redux-form
 * deconstructs props that redux-forms sets and sets them on NumberInput
 * @return {Component} NumberInput
 */
const ReduxFormNumberInput = props => {
	const { meta, input, ...other } = props;

	return <NumberInput error={(meta || {}).error} {...input} {...other} />;
};

ReduxFormNumberInput.displayName = 'ReduxFormNumberInput';

export default ReduxFormNumberInput;
