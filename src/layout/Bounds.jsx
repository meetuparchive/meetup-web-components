import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import withLoading from '../utils/components/withLoading';

export const BOUNDS_CLASS = 'bounds';

/**
 * Design System Component: Provides `bounds` container for components
 * @module BoundsComponent
 */
export class BoundsComponent extends React.Component {
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
				'component--isLoading': isLoading,
			},
			className
		);

		return (
			<div className={classNames} {...other}>
				{children}
			</div>
		);
	}
}
BoundsComponent.propTypes = {
	/** Whether the bounds max-width should use the narrow variant */
	narrow: PropTypes.bool,

	/** Whether the component is in a loading state */
	isLoading: PropTypes.bool,

	/** Props to pass to the `<Loading />` component */
	loadingProps: PropTypes.shape({
		color: PropTypes.string,
		scrimColor: PropTypes.string,
		size: PropTypes.string,
	}),
};

const Bounds = withLoading(BoundsComponent);
Bounds.displayName = 'Bounds';
export default Bounds;
