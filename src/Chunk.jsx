import React from 'react';
import cx from 'classnames';

/**
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
			'chunk',
			className
		);

		return (
			<div
				className={classNames}
				{...other}>
					{children}
			</div>
		);
	}
}

Chunk.propTypes = {
};

export default Chunk;
