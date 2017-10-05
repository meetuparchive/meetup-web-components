import React from 'react';
import SelectInput from '../SelectInput';

/**
 * This component wraps the standard SelectInput component for use with redux-form.
 * It deconstructs props that redux-form sets and re-sets them on SelectInput.
 * @param {object} props React component props
 * @return {React.Component} SelectInput
 */
const ReduxFormSelectInput = props => {
	const { meta, validateBeforeTouched, ...other } = props;

	const error = (validateBeforeTouched || meta.touched) ? meta.error : null;

	return <SelectInput error={error} {...other} />;
};

ReduxFormSelectInput.displayName = 'ReduxFormSelectInput';

export default ReduxFormSelectInput;

