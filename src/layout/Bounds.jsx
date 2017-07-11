import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

export const BOUNDS_CLASS = 'bounds';

/**
 * Design System Component: Provides `bounds` container for components
 * @module Bounds
 */
class Bounds extends React.Component {
	render() {
		const {
			children,
			className,
			narrow,
			...other
		} = this.props;

		const classNames = cx(
			BOUNDS_CLASS,
			{'bounds--wide': !narrow },
			className
		);

		return (
			<div
				className={classNames}
				{...other}
			>
				{children}
			</div>
		);
	}
}
Bounds.propTypes = {
	narrow: PropTypes.bool
};

export default Bounds;
