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
			onClick,
			handleKeyUp,
			...other
		} = this.props;

		const classNames = cx(
			'popover-option',
			className
		);

		return (
			<li
				role='menuitem'
				tabIndex='-1'
				onKeyUp={handleKeyUp}
				onClick={onClick}
				className={classNames}
				{...other}>
				{children}
			</li>
		);
	}
}
PopoverMenuItem.propTypes = {
	onClick: React.PropTypes.func
};

export default PopoverMenuItem;
