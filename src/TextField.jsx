import React from 'react';
import cx from 'classnames';

/**
 * @module TextField
 */
class TextField extends React.Component {
	render() {
		const {
			children,
			className,
			...other
		} = this.props;

		const classNames = cx(
			'textField',
			className
		);

		return (
			<div
				className={classNames}
				{...other}>
					Hello from TextField
					{children}
			</div>
		);
	}
}

TextField.propTypes = {
};

export default TextField;
