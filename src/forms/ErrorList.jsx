import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

const ERROR_CLASSNAME = 'text--error text--small';

/**
 * ErrorList
 *
 * Accessible list of errors for a form input.
 *
 * Currently supports only a single error due to a
 * limitation with `redux-form`.
 */
const ErrorList = props => {
	const { errorId, error, ...other } = props;

	if (errorId) {
		other.id = errorId;
	}

	return (
		<ul aria-live="assertive" {...other}>
			{error && <li className={cx(ERROR_CLASSNAME, 'text--small')}>{error}</li>}
		</ul>
	);
};
ErrorList.propTypes = {
	errorId: PropTypes.string,
	error: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element,
		PropTypes.bool,
	]),
};

export default ErrorList;
