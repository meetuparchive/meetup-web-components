import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import withLoading from '../utils/components/withLoading';

export const BOUNDS_CLASS = 'bounds';

/**
 * Design System Component: Provides `bounds` container for components
 * @module Bounds
 */
export class Bounds extends React.Component {
	render() {
		const {
			children,
			className,
			narrow,
			loadingProps = {}, // eslint-disable-line no-unused-vars
			isLoading,
			...other
		} = this.props;

		const classNames = cx(
			BOUNDS_CLASS,
			{
				'bounds--wide': !narrow,
				'component--isLoading': isLoading
			},
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
	narrow: PropTypes.bool,
	isLoading: PropTypes.bool,
	loadingProps: PropTypes.shape({
		color: PropTypes.string,
		scrimColor: PropTypes.string,
		size: PropTypes.string
	})
};

export default withLoading(Bounds);
