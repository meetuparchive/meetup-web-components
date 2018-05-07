import React from 'react';
import PropTypes from 'prop-types';
import SelectInput from '../SelectInput';

/**
 * This component wraps the standard SelectInput component for use with redux-form.
 * It deconstructs props that redux-form sets and re-sets them on SelectInput.
 * @param {object} props React component props
 * @return {React.Component} SelectInput
 */
const ReduxFormSelectInput = props => {
	const { meta, input, ...other } = props;
	const error = (meta.touched || meta.submitFailed) ? meta.error : null;

	return <SelectInput error={error} {...input} {...other} />;
};

ReduxFormSelectInput.propTypes = {
	meta: PropTypes.object.isRequired,
	input: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.object
	]).isRequired,
};

ReduxFormSelectInput.displayName = 'ReduxFormSelectInput';

export default ReduxFormSelectInput;

