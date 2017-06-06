import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import bindAll from '../utils/bindAll';

const POPOVER_MENU_CLASS = 'popover-menu-option';
/**
 * @module Popover
 */
class Popover extends React.Component {
	constructor(props) {
		super(props);

		bindAll(this,
			'open',
			'close',
			'onClick',
			'onKeyDown',
			'onClick',
			'onBlur'
		);

		this.state = {
			isActive: false,
			selectedIndex: 0
		};

		this._menuItems = new Map();
	}

	open() {
		this.setState({ isActive: true });
	}

	close() {
		this.setState({ isActive: false });
	}

	focusCheck() {
		const focusedOptionClass = document.activeElement.parentNode.classList;
		// don't close the popover if we're moving focus to an menu item
		if (focusedOptionClass && focusedOptionClass.contains(POPOVER_MENU_CLASS)) {
			return;
		}

		this.closeMenu();
	}

	onBlur() {
		// On blur, browsers always focus `<body>` before moving focus
		// to the next actual focused element.
		//
		// This zero-length timeout ensures the browser will return the
		// actual focused element instead of `<body>`
		window.setTimeout(() => this.focusCheck(), 0);
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
					className={POPOVER_MENU_CLASS}
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
								className: cx('popover-menu-option-target', menuItem.props.className),
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
				className,
				trigger,
				menuItems, // eslint-disable-line no-unused-vars
				align,
				...other
			} = this.props;

		const classNames = {
			popover: cx(
				className,
				'popover'
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
					'display--none': !isActive,
					'popover-container--horizontal-left': (align === 'left'),
					'popover-container--horizontal-right': (align === 'right')
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
	trigger: PropTypes.element.isRequired,
	menuItems: PropTypes.arrayOf(PropTypes.element).isRequired,
	align: PropTypes.oneOf(['right', 'left']),
	className: PropTypes.string,
};

export default Popover;
