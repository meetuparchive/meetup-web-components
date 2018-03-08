import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

const CharCounter = ({
	maxLength,
	valueLength,
}) => {
	const remainingChars = maxLength - valueLength;

	const classNames = cx(
		'text--tiny',
		'text--secondary',
		'align--right',
		'charCount',
		{ 'text--error': remainingChars < 0 }
	);

	return <p tabIndex="-1" className={classNames}>{remainingChars}</p>;
};

CharCounter.propTypes = {
	maxLength: PropTypes.number.isRequired,
	valueLength: PropTypes.number.isRequired,
};

export default CharCounter;
