import React from 'react';
import PropTypes from 'prop-types';
import Textarea from '../Textarea';

/**
 * This component wraps the standard Textarea component for use with redux-form.
 * It deconstructs props that redux-form sets and re-sets them on Textarea.
 * @param {object} props React component props
 * @return {React.Component} Textarea
 */
const ReduxFormTextarea = props => {
	const { meta, input, validateBeforeTouched, ...other } = props;
	const error = (validateBeforeTouched || meta.touched || meta.submitFailed)
		? meta.error
		: null;

	return <Textarea error={error} {...input} {...other} />;
};

ReduxFormTextarea.propTypes = {
	meta: PropTypes.object.isRequired,
	input: PropTypes.element.isRequired,
	validateBeforeTouched: PropTypes.bool,
};

ReduxFormTextarea.displayName = 'ReduxFormTextarea';

export default ReduxFormTextarea;
