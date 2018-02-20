import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export const ALIGN_VALUES = ['left', 'right', 'center'];

const AccentHeader = ({
	align,
	headingTag,
	children,
	className,
	...other
}) => {
	const HeadingTagEl = headingTag;
	return (
		<header className="accentHeaderWrapper">
			<HeadingTagEl
				className={cx(
					`accentHeader
					accentHeader--${align}
					align--${align}
					text--normal`,
					className
				)}
			>
				{children}
			</HeadingTagEl>
		</header>
	);
};

AccentHeader.defaultProps = {
	align: 'left',
	headingTag: 'h2'
};

PropTypes.AccentHeader = {
	align: PropTypes.oneOf(ALIGN_VALUES),
	headingTag: PropTypes.string
};

export default AccentHeader;
