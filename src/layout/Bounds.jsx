import PropTypes from 'prop-types';

import React from 'react';
import cx from 'classnames';

import styles from './bounds.module.scss';

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
			styles.bounds,
			{[styles['bounds--wide']]: !narrow },
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
