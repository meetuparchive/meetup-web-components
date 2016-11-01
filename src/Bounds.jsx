import React from 'react';
import cx from 'classnames';

/**
 * @module Bounds
 */
class Bounds extends React.Component {
	render() {
		const {
			children,
			className,
			...other
		} = this.props;

		const classNames = cx(
			'bounds',
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

Bounds.propTypes = {

};

export default Bounds;
