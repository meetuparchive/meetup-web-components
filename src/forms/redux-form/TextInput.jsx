import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../TextInput';

/**
 * @param {Object} props - props passed in from parent and redux-form
 * @description wraps standard TextInput web component for use with redux-form
 * deconstructs props that redux-forms sets and sets them on TextInput
 * @return {Component} TextInput
 */
const ReduxFormTextInput = props => {
	const { meta, input, ...other } = props;
	const error = meta.touched || meta.submitFailed ? meta.error : null;

	return <TextInput error={error} {...input} {...other} />;
};

ReduxFormTextInput.propTypes = {
	meta: PropTypes.object.isRequired,
	input: PropTypes.oneOfType([PropTypes.element, PropTypes.object]).isRequired,
};

ReduxFormTextInput.displayName = 'ReduxFormTextInput';

export default ReduxFormTextInput;
