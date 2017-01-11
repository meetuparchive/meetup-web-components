import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import bindAll from './utils/bindAll';

/**
 * @module Popover
 */
class Popover extends React.Component {
	constructor(props) {
		super(props);

		bindAll(this,
			'updateFocusBy',
			'openMenu',
			'closeMenu',
			'onClick',
			'onKeyDown',
			'onKeyDownMenuItem',
			'onClick',
			'onBlur'
		);

		this.state = {
			isActive: false,
			selectedIndex: 0
		};

		this._menuItems = new Map();
	}

	updateFocusBy(delta) {
		const targetIndex = this.state.selectedIndex + delta;
		if (targetIndex >= 0 && targetIndex < this.menuItems.length) {
			this.setState({ selectedIndex: targetIndex });
		}
	}

	openMenu() {
		this.setState({ isActive: true });
	}

	closeMenu() {
		this.setState({ isActive: false });
	}

	onBlur() {
		// On blur, browsers always focus `<body>` before moving focus
		// to the next actual focused element.
		//
		// This zero-length timeout ensures the browser will return the
		// actual focused element instead of `<body>`
		window.setTimeout(() => {
			const focusedOptionClass = document.activeElement.parentNode.classList;

			// don't close the popover if we're moving focus to an menu item
			if (focusedOptionClass && focusedOptionClass.contains('popover-menu-option')) {
				return;
			}

			this.closeMenu();
		}, 0);
	}

	onClick(e) {
		this.openMenu();
	}

	onKeyDown(e) {
		switch(e.key) {
		case 'Enter':
			if (!this.state.isActive) {
				this.openMenu();
			}
			break;
		case 'Escape':
			this.closeMenu();
			break;
		}
	}

	onKeyDownMenuItem(e) {
		switch(e.key) {
		case 'ArrowDown':
			this.updateFocusBy(1);
			break;
		case 'ArrowUp':
			this.updateFocusBy(-1);
			break;
		case 'Enter':
			if (this._menuItems.get(this.state.selectedIndex)) {
				this._menuItems.get(this.state.selectedIndex).props.onClick(e);
			}
			break;
		}
	}

	componentDidUpdate() {
		const selectedItemEl = this._menuItems.get(this.state.selectedIndex);
		if (selectedItemEl) {
			ReactDOM.findDOMNode(selectedItemEl).focus();
		}
	}

	renderMenuItems() {
		this.menuItems = this.props.menuItems.map((menuItem, i) => {
			return (
				<li
					key={i}
					className='popover-menu-option arg'
					role='menuitem'
					onKeyDown={this.onKeyDownMenuItem}
				>
					{
						/*
						* treat each user-provided menu item element as the
						* keyboard-navigable, focusable 'menuitem' role
						*/
						React.cloneElement(menuItem,
							{
								tabIndex: '-1',
								onKeyDown: this.onKeyDownMenuItem,
								className: cx('popover-menu-option-target', menuItem.props.className)
								ref: (el) => this._menuItems.set(i, el),
							}
						)
					}
				</li>
			);
		});

		return this.menuItems;
	}

	render() {
		const isActive = this.state.isActive;
		const {
				trigger,
				menuItems, // eslint-disable-line no-unused-vars
				className,
				...other
			} = this.props;

		const classNames = {
			popover: cx(
				'popover',
				className
			),
			trigger: cx(
				'popover-trigger',
				{
					'popover-trigger--active': isActive
				}
			),
			menu: cx(
				'popover-container',
				'popover-container--menu',
				{
					'display--none': !isActive
				}
			)
		};

		return (
			<div
				className={classNames.popover}
				aria-haspopup='true'
				onKeyDown={this.onKeyDown}
				onBlur={this.onBlur}
				{...other}
			>

				<div
					className={classNames.trigger}
					tabIndex='0'
					onClick={this.onClick}
				>
					{trigger}
				</div>

				<nav>
					<ul
						className={classNames.menu}
						role='menu'
						aria-hidden={!isActive}
					>
						{this.renderMenuItems()}
					</ul>
				</nav>
			</div>
		);
	}
}

Popover.propTypes = {
	trigger: React.PropTypes.element.isRequired,
	menuItems: React.PropTypes.arrayOf(React.PropTypes.element).isRequired,
	className: React.PropTypes.string,
};

export default Popover;
