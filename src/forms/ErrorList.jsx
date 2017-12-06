import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

export const ERROR_CLASSNAME = 'text--error text--small';

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
					<li key={key} className={cx(ERROR_CLASSNAME, 'text--small')}>{err}</li>
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
