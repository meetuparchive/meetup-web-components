import React from 'react';
import cx from 'classnames';

import PopoverTrigger from './PopoverTrigger';
import PopoverMenu from './PopoverMenu';

/**
 * @module Popover
 */
class Popover extends React.Component {
	constructor(props) {
		super(props);

		this.toggleMenu = this.toggleMenu.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleClick = this.handleClick.bind(this);

		this.state = { isActive: false };
	}

	toggleMenu() {
		this.setState({ isActive: !this.state.isActive });
	}

	handleClick(e) {
		this.toggleMenu();
	}

	handleKeyDown(e) {
		switch(e.key) {
		case 'ArrowDown':
			break;
		case 'ArrowUp':
			break;
		case 'Enter':
			this.toggleMenu();
			break;
		case 'Escape':
			this.setState({ isActive: false });
			break;
		}
	}

	renderTrigger() {
		const { handleKeyDown, handleClick } = this;
		let trigger;
		React.Children.forEach(this.props.children, function(child) {
			if (child.type === PopoverTrigger) {
				trigger = React.cloneElement(child, { handleKeyDown, handleClick });
			}
		});
		return trigger;
	}

	renderMenu() {
		const { handleKeyDown } = this;
		const isActive = this.state.isActive;
		let menu;
		React.Children.forEach(this.props.children, function(child) {
			if (child.type === PopoverMenu) {
				menu = React.cloneElement(child, { handleKeyDown, isActive });
			}
		});
		return menu;
	}

	render() {
		const {
			className,
			...other
		} = this.props;

		const classNames = cx(
			'menu',
			className
		);

		return (
			<div
				className={classNames}
				aria-haspopup='true'
				{...other}>
				{this.renderTrigger()}
				{this.renderMenu()}
			</div>
		);
	}
}
Popover.defaultProps = {
};
Popover.propTypes = {
};

export default Popover;
