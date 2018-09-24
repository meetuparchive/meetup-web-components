// @flow

import React from 'react';
import cx from 'classnames';

import withLoading from '../utils/components/withLoading';

export const BOUNDS_CLASS = 'bounds';

type Props = {
	children: React$Element<*>,
	className?: string,
	/** Whether the bounds max-width should use the narrow variant */
	narrow?: boolean,
	/** Props to pass to the `<Loading />` component */
	loadingProps?: {
		color?: string,
		scrimColor?: string,
		size?: MediaSizes,
	},
	/** Whether the component is in a loading state */
	isLoading?: boolean,
};

type State = {};
/**
 * Design System Component: Provides `bounds` container for components
 * @module BoundsComponent
 */

export class BoundsComponent extends React.PureComponent<Props, State> {
	state = {};

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

const Bounds = withLoading(BoundsComponent);
Bounds.displayName = 'Bounds';
export default Bounds;
