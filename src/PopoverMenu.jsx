import React from 'react';
import cx from 'classnames';

/**
 * @module PopoverMenu
 */
class PopoverMenu extends React.Component {
	constructor() {
		super(props);

		this.selectedIndex = 0;
		this.handleKeys = this.handleKeys.bind(this);
		this.updateFocusIndexBy = this.updateFocusIndexBy.bind(this);
	}

	updateFocusBy(delta) {
		const menuItems = findDOMNode(this).querySelectorAll('.popover-option');
		const targetIndex = this.selectedIndex + delta;

		if (menuItems[targetIndex] == undefined) {
			return;
		}

		console.warn('moving selection to: ', menuItems[targetIndex]);

		this.selectedIndex = targetIndex;
		menuItems[targetIndex].focus();
	}

	handleKeyDown(e) {
		switch(e.key) {
		case 'ArrowDown':
			this.updateFocusBy(1);
			break;
		case 'ArrowUp':
			this.updateFocusBy(-1);
			break;
		}
	}

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
