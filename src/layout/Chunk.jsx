// @flow

import React from 'react';
import cx from 'classnames';

import withLoading from '../utils/components/withLoading';

type Props = {|
	/** The child elements of the component */
	children: React$Node,
	className?: string,
	/** Whether the component is in a loading state */
	isLoading?: boolean,
	/** Props to pass to the `<Loading />` component */
	loadingProps?: {
		color?: string,
		scrimColor?: string,
		size?: MediaSizes,
	},
|};
/**
 * Design System Component: Provides `stripe` styled container for components
 * @module ChunkComponent
 */
export class ChunkComponent extends React.Component<Props> {
	render() {
		const {
			children,
			className,
			loadingProps = {}, // eslint-disable-line no-unused-vars
			isLoading,
			...other
		} = this.props;

		const classNames = cx('chunk', { 'component--isLoading': isLoading }, className);

		return (
			<div className={classNames} {...other}>
				{children}
			</div>
		);
	}
}

const Chunk = withLoading(ChunkComponent);
Chunk.displayName = 'Chunk';
export default Chunk;
