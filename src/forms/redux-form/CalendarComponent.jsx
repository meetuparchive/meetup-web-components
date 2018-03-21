import React from 'react';
import PropTypes from 'prop-types';
import CalendarComponent from '../CalendarComponent';

/**
 * @param {Object} props - props passed in from parent and redux-form
 * @description wraps standard TextInput web component for use with redux-form
 * deconstructs props that redux-forms sets and sets them on TextInput
 * @return {Component} TextInput
 */
const ReduxFormCalendarComponent = props => {
	const { meta, input, validateBeforeTouched, ...other } = props;
	const error = (validateBeforeTouched || meta.touched || meta.submitFailed)
		? meta.error
		: null;

	return <CalendarComponent error={error} {...input} {...other} />;
};

ReduxFormCalendarComponent.propTypes = {
	meta: PropTypes.object.isRequired,
	input: PropTypes.element.isRequired,
	validateBeforeTouched: PropTypes.bool,
};

ReduxFormCalendarComponent.displayName = 'ReduxFormCalendarComponent';

export default ReduxFormCalendarComponent;
