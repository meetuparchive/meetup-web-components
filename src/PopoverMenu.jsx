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
			'onKeyUp'
		);

		this.state = {
			selectedIndex: 0
		};
	}

	updateFocusBy(delta) {
		const menuItems = findDOMNode(this).querySelectorAll('.popover-menu-item');
		const targetIndex = this.state.selectedIndex + delta;

		if (menuItems[targetIndex] == undefined) {
			return;
		}

		this.setState({ selectedIndex: targetIndex });
		menuItems[targetIndex].focus();
	}

	onKeyUp(e) {
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
			onKeyDown,
			isActive,
			...other
		} = this.props;

		const { onKeyUp } = this;

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
				onKeyDown={onKeyDown}
				className={classNames}
				aria-hidden={!isActive}
				{...other}
			>
				{
					React.Children.map(children, (child) => {
						return React.cloneElement(child, { onKeyUp });
					})
				}
			</div>
		);
	}
}
PopoverMenu.propTypes = {
	className: React.PropTypes.string,
	onKeyDown: React.PropTypes.func,
	isActive: React.PropTypes.bool,
};

export default PopoverMenu;
