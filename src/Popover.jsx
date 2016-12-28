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
		this.closeMenu = this.closeMenu.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleBlur = this.handleBlur.bind(this);

		this.state = { isActive: false };
	}

	toggleMenu() {
		this.setState({ isActive: !this.state.isActive });
	}

	closeMenu() {
		this.setState({ isActive: false });
	}

	handleBlur() {
		// On blur, browsers always focus `<body>` before moving focus
		// to the next actual focused element.
		//
		// This zero-length timeout ensures the browser will return the
		// actual focused element instead of `<body>`
		window.setTimeout(() => {
			const focusedElementClass = document.activeElement.getAttribute('class');

			// don't close the popover if we're moving focus to an option
			if (focusedElementClass && focusedElementClass.indexOf('popover-menu-item') > -1) {
				return;
			}

			this.closeMenu();
		}, 0);
	}

	handleClick(e) {
		this.toggleMenu();
	}

	handleKeyDown(e) {
		switch(e.key) {
		case 'Enter':
			this.toggleMenu();
			break;
		case 'Escape':
			this.closeMenu();
			break;
		}
	}

	renderTrigger() {
		const { handleKeyDown, handleClick, handleBlur } = this;
		const isActive = this.state.isActive;
		let trigger;
		React.Children.forEach(this.props.children, function(child) {
			if (child.type === PopoverTrigger) {
				trigger = React.cloneElement(child, { handleKeyDown, handleClick, handleBlur, isActive });
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
			'popover',
			className
		);

		return (
			<div
				className={classNames}
				aria-haspopup='true'
				onBlur={this.handleBlur}
				{...other}>
				{this.renderTrigger()}
				{this.renderMenu()}
			</div>
		);
	}
}

export default Popover;
