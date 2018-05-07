import React from 'react';
import PropTypes from 'prop-types';
import TimeInput from '../TimeInput';

/**
 * This component wraps the standard TimeInput for use with redux-form.
 * It deconstructs props that redux-form sets and re-sets them on TimeInput.
 * @param {object} props React component props
 * @return {React.Component} TimeInput
 */
const ReduxFormTimeInput = props => {
	const { input, meta, ...other } = props;
	const error = (meta.touched || meta.submitFailed) ? meta.error : null;

	return <TimeInput {...input} error={error} {...other} />;
};

ReduxFormTimeInput.propTypes = {
	meta: PropTypes.object.isRequired,
	input: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.object
	]).isRequired,
};

ReduxFormTimeInput.displayName = 'ReduxFormTimeInput';

export default ReduxFormTimeInput;
