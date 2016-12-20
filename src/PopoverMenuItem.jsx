import React from 'react';
import cx from 'classnames';

/**
 * @module PopoverMenuItem
 */
class PopoverMenuItem extends React.Component {

	render() {
		const {
			children,
			className,
			handleKeyUp,
			...other
		} = this.props;

		const classNames = cx(
			'popover-option',
			className
		);

		return (
			<li
				role='menuItem'
				onKeyUp={handleKeyUp}
				className={classNames}
				{...other}>
				{children}
			</li>
		);
	}
}

export default PopoverMenuItem;
