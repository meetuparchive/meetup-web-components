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
			'updateFocusBy',
			'openMenu',
			'closeMenu',
			'onClick',
			'onKeyDown',
			'onKeyDownMenuItem',
			'onClick',
			'onBodyClick'
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

	onClick(e) {
		e.preventDefault();
		this.openMenu();

		if (this.props.onClick) {
			this.props.onClick(e);
		}
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
			if (this._menuItems.get(this.state.selectedIndex) && this._menuItems.get(this.state.selectedIndex).props.onClick) {
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

	onBodyClick(e) {
		const isPopoverClick = [
			this.menuRef,
			this.triggerRef
		].includes(e.target);

		if (!isPopoverClick) {
			this.closeMenu();
		}
	}

	componentDidMount() {
		// fix for safari on ios
		if(navigator.userAgent.match(/(iPad|iPhone|iPod)/i)) {
			document.body.classList.add('clickable');
		}
		document.body.addEventListener('click', this.onBodyClick);
	}

	componentWillUnmount() {
		document.body.removeEventListener('click', this.onBodyClick);
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
					'trans-fadeIn--short': !isActive,
					'opacity--0': !isActive,
					'opacity--1': isActive,
					'trans-fadeOut--short': isActive,
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
				{...other}
			>

				<div
					ref={(el) => this.triggerRef = el}
					className={classNames.trigger}
					tabIndex='0'
					onClick={this.onClick}
				>
					{trigger}
				</div>

				<nav>
					<ul
						ref={(el) => this.menuRef = el}
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
