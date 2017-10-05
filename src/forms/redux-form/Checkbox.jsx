import React from 'react';
import Checkbox from '../Checkbox';

/**
 * This component wraps the standard Checkbox component for use with redux-form.
 * It deconstructs props that redux-form sets and re-sets them on Checkbox.
 * @param {object} props React component props
 * @return {React.Component} Checkbox
 */
const ReduxFormCheckbox = props => {
	const { meta, validateAfterTouched, ...other } = props;

	const error = (!validateAfterTouched || meta.touched) ? meta.error : null;

	return <Checkbox error={error} {...other} />;
};

ReduxFormCheckbox.displayName = 'ReduxFormCheckbox';

export default ReduxFormCheckbox;

