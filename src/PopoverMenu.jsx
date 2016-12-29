import React from 'react';
import { findDOMNode } from 'react-dom';
import bindAll from './utils/bindAll';
import cx from 'classnames';

/**
 * @module PopoverMenu
 */
class PopoverMenu extends React.Component {
	constructor(props) {
		super(props);

		bindAll(this,
			'updateFocusBy',
			'handleKeyUp'
		);

		this.selectedIndex = 0;
	}

	updateFocusBy(delta) {
		const menuItems = findDOMNode(this).querySelectorAll('.popover-menu-item');
		const targetIndex = this.selectedIndex + delta;

		if (menuItems[targetIndex] == undefined) {
			return;
		}

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
			<div
				role='menu'
				onKeyDown={handleKeyDown}
				className={classNames}
				aria-hidden={!isActive}
				{...other}
			>
				{
					React.Children.map(children, (child) => {
						return React.cloneElement(child, { handleKeyUp });
					})
				}
			</div>
		);
	}
}
PopoverMenu.propTypes = {
	className: React.PropTypes.string,
	handleKeyDown: React.PropTypes.func,
	isActive: React.PropTypes.bool,
};

export default PopoverMenu;
