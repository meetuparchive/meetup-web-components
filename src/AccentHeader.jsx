import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export const ALIGN_VALUES = ['left', 'right', 'center'];

const AccentHeader = ({ align, headingTag, children, className, ...other }) => {
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
	headingTag: 'h2',
};

AccentHeader.propTypes = {
	/** Controls text alignment */
	align: PropTypes.oneOf(ALIGN_VALUES),

	/** Which level of HTML heading tag to use */
	headingTag: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
};

export default AccentHeader;
