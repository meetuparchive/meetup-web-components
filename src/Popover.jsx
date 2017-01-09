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
			'onKeyUp',
			'onKeyDown',
			'onClick',
			'onBlur'
		);

		this.state = {
			isActive: false,
			selectedIndex: 0
		};
	}

	updateFocusBy(delta) {
		const targetIndex = this.state.selectedIndex + delta;
		const optionsLength = this.props.options.length;

		if (targetIndex >= 0 && targetIndex < optionsLength) {
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

			// don't close the popover if we're moving focus to an option
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
			} else if (this.selectedItemEl && this.selectedItemEl.props.onClick) {
				this.selectedItemEl.props.onClick(e);
			}
			break;
		case 'Escape':
			this.closeMenu();
			break;
		}
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
		if (this.selectedItemEl) {
			ReactDOM.findDOMNode(this.selectedItemEl).focus();
		}
	}

	renderOptionItems() {
		return this.props.options.map((option,i) => {
			const isSelected = this.state.isActive && this.state.selectedIndex === i;

			return (
				<li
					key={i}
					className='popover-menu-option'
				>
					{/*
					* treat each user-provided option element as the
					* keyboard-navigable, focusable 'menuitem' role
					*/}
					{
						React.cloneElement(option,
							{
								ref: (el) => {
									if (isSelected) {
										this.selectedItemEl = el;
									}
								},
								role: 'menuitem',
								tabIndex: '-1',
								onKeyUp: this.onKeyUp,
								className: 'popover-menu-option-target'
							}
						)
					}
				</li>
			);
		});
	}

	render() {
		const isActive = this.state.isActive;
		const {
				trigger,
				options, // eslint-disable-line no-unused-vars
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
						{this.renderOptionItems()}
					</ul>
				</nav>
			</div>
		);
	}
}
Popover.propTypes = {
	trigger: React.PropTypes.element.isRequired,
	options: React.PropTypes.arrayOf(React.PropTypes.element).isRequired,
	className: React.PropTypes.string,
};
export default Popover;
