import React from 'react';
import cx from 'classnames';

/**
 * @module PopoverMenu
 */
class PopoverMenu extends React.Component {

	render() {
		const {
			children,
			className,
			handleKeyDown,
			isActive,
			...other
		} = this.props;

		const classNames = cx(
			'popover-container',
			'popover-container--menu',
			{
				'display--none': !isActive
			},
			className
		);

		return (
			<ul
				onKeyDown={handleKeyDown}
				className={classNames}
				{...other}>
				{children}
			</ul>
		);
	}
}

export default PopoverMenu;
