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
	const { meta, input, ...other } = props;
	const error = meta.touched || meta.submitFailed ? meta.error : null;

	return <Textarea error={error} {...input} {...other} />;
};

ReduxFormTextarea.propTypes = {
	meta: PropTypes.object.isRequired,
	input: PropTypes.oneOfType([PropTypes.element, PropTypes.object]).isRequired,
};

ReduxFormTextarea.displayName = 'ReduxFormTextarea';

export default ReduxFormTextarea;
