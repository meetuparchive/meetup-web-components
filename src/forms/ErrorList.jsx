import PropTypes from 'prop-types';
import React from 'react';

export const ERROR_CLASSNAMES = 'text--error text--small';

const ErrorList = (props) => {
	const {
		errorId,
		errors,
		...other
	} = props;

	const errorList = Array.isArray(errors) ? errors : [errors];

	if (errorId) {
		other['id'] = errorId;
	}

	return (
		<ul
			aria-live="assertive"
			{...other}
		>
			{
				errorList.map((err, key) => (
					<li key={key} className={ERROR_CLASSNAMES}>{err}</li>
				))
			}
		</ul>
	);
};

ErrorList.propTypes = {
	errorId: PropTypes.string,
	errors: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.array
	])
};

export default ErrorList;
