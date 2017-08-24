import React from 'react';
import DateTimeLocalInput from '../DateTimeLocalInput';

/**
 * This component wraps the standard DateTimeLocalInput
 * component for use with redux-form.
 * It deconstructs props that redux-form sets and re-sets them on DateTimeLocalInput
 *.
 * @param {object} props React component props
 * @return {React.Component} DateTimeLocalInput
 *
 */
const ReduxFormDateTimeLocalInput = props => {
	const { meta, input, ...other } = props;

	return <DateTimeLocalInput {...input} error={meta.error} {...other} />;
};

ReduxFormDateTimeLocalInput.displayName = 'ReduxFormDateTimeLocalInput';

export default ReduxFormDateTimeLocalInput;
