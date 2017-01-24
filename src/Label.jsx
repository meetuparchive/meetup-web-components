import React from 'react';
import cx from 'classnames';

/**
 * @module Label
 */
class Label extends React.Component {
	render() {
		const {
			inputId,
			text,
			isRequired,
			children,
			className,
			...other
		} = this.props;

		const classNames = cx(
			{ required : isRequired },
			className
		);

		return (
			<label className={classNames}
				htmlFor={inputId}
				{...other}>
				{text}
				{children}
			</label>
		);
	}
}

Label.propTypes = {
};

export default Label;
