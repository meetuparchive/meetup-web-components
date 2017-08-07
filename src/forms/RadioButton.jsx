import React from 'react';
import PropTypes from 'prop-types';

import Flex from '../layout/Flex';
import FlexItem from '../layout/FlexItem';

const RadioButton = ({ label, className, ...inputProps }) => {
	const id = `RadioButton-${inputProps.name}-${inputProps.value}`;

	return (
		<Flex align="center" className={className} noGutters>
			<FlexItem shrink>
				<input readOnly type="radio" id={id} {...inputProps} />
			</FlexItem>
			<FlexItem shrink>
				<label htmlFor={id}>
					{label}
				</label>
			</FlexItem>
		</Flex>
	);
};

RadioButton.displayName = 'RadioButton';

RadioButton.propTypes = {
	label: PropTypes.string.isRequired,
	className: PropTypes.string,
};

export default RadioButton;
