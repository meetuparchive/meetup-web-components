import React from 'react';
import CalendarComponent from '../CalendarComponent';

/**
 * @param {Object} props - props passed in from parent and redux-form
 * @description wraps standard TextInput web component for use with redux-form
 * deconstructs props that redux-forms sets and sets them on TextInput
 * @return {Component} TextInput
 */
const ReduxFormCalendarComponent = props => {
	const { meta, input, ...other } = props;
	return <CalendarComponent error={meta.touched && meta.error} {...input} {...other} />;
};

ReduxFormCalendarComponent.displayName = 'ReduxFormCalendarComponent';

export default ReduxFormCalendarComponent;
