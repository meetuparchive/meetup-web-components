import React from 'react';
import cx from 'classnames';

export const CHUNK_CLASS = 'chunk';
/**
 * Design System Component: Provides `stripe` styled container for components
 * @module Chunk
 */
class Chunk extends React.Component {
	render() {
		const {
			children,
			className,
			...other
		} = this.props;

		const classNames = cx(
			CHUNK_CLASS,
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

export default Chunk;
