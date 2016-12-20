import React from 'react';
import { findDOMNode } from 'react-dom';
import cx from 'classnames';
import PopoverMenuItem from './PopoverMenuItem';

/**
 * @module PopoverMenu
 */
class PopoverMenu extends React.Component {
	constructor(props) {
		super(props);

		this.selectedIndex = 0;
		this.updateFocusBy = this.updateFocusBy.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
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

	handleKeyUp(e) {
		switch(e.key) {
		case 'ArrowDown':
			this.updateFocusBy(1);
			break;
		case 'ArrowUp':
			this.updateFocusBy(-1);
			break;
		}
	}

	componentDidUpdate() {
		if (this.props.isActive) {
			const menuItems = findDOMNode(this).querySelectorAll('.popover-option');
			menuItems[this.selectedIndex].focus();
		}
	}

	renderMenuItems() {
		const { handleKeyUp } = this;
		let menuItems;
		React.Children.forEach(this.props.children, function(child) {
			if (child.type == PopoverMenuItem) {
				menuItems.push(React.cloneElement(child, { handleKeyUp }));
			}
		});
		return menuItems;
	}

	render() {
		const {
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
				{this.renderMenuItems()}
			</ul>
		);
	}
}

export default PopoverMenu;
