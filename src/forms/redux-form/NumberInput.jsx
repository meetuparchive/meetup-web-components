import React from 'react';
import PropTypes from 'prop-types';
import NumberInput from '../NumberInput';

/**
 * @param {Object} props - props passed in from parent and redux-form
 * @description wraps standard NumberInput web component for use with redux-form
 * deconstructs props that redux-forms sets and sets them on NumberInput
 * @return {Component} NumberInput
 */
const ReduxFormNumberInput = props => {
	const { meta, input, ...other } = props;

	const error = meta.touched || meta.submitFailed ? meta.error : null;

	return <NumberInput error={error} {...input} onChange={input.onChange} {...other} />;
};

ReduxFormNumberInput.propTypes = {
	meta: PropTypes.object.isRequired,
	input: PropTypes.oneOfType([PropTypes.element, PropTypes.object]).isRequired,
};

ReduxFormNumberInput.displayName = 'ReduxFormNumberInput';

export default ReduxFormNumberInput;
