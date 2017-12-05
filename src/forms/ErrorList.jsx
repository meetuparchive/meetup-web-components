import PropTypes from 'prop-types';
import React from 'react';

export const ERROR_CLASSNAMES = 'text--error text--small';

const ErrorList = (props) => {
	const {
		errors,
		...other
	} = props;

	const errorList = Array.isArray(errors) ? errors : [errors];

	return (
		<ul
			aria-role="alert"
			aria-live="assertive"
			{...other}
		>
			{
				errorList.map((err) => (
					<li className={ERROR_CLASSNAMES}>{err}</li>
				))
			}
		</ul>
	);
};

ErrorList.propTypes = {
	errors: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.array
	])
};

export default ErrorList;
