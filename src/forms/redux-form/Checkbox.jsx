import React from 'react';
import Checkbox from '../Checkbox';

const ReduxFormCheckbox = props => {
	const {
		meta, // eslint-disable-line no-unused-vars
		input,
		...other
	} = props;

	return <Checkbox checked={input.value === true} {...input} {...other} />;
};

ReduxFormCheckbox.displayName = 'ReduxFormCheckbox';

export default ReduxFormCheckbox;
