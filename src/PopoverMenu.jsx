import React from 'react';
import { findDOMNode } from 'react-dom';
import cx from 'classnames';

/**
 * @module PopoverMenu
 */
class PopoverMenu extends React.Component {
	constructor(props) {
		super(props);

		this.selectedIndex = 0;
		this.updateFocusBy = this.updateFocusBy.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
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
			this.updateFocusBy(0);
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

		const { handleKeyUp } = this;

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
				{
					React.Children.map(children, (child) => {
						return React.cloneElement(child, { handleKeyUp });
					})
				}
			</ul>
		);
	}
}

export default PopoverMenu;
