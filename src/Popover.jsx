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
			'toggleMenu',
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

		if (targetIndex >= 0 && targetIndex <= optionsLength) {
			this.setState({ selectedIndex: targetIndex });
		}
	}

	toggleMenu() {
		this.setState({ isActive: !this.state.isActive });
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
			const focusedElementClass = document.activeElement.getAttribute('class');

			// don't close the popover if we're moving focus to an option
			if (focusedElementClass && focusedElementClass.indexOf('popover-menu-item') > -1) {
				return;
			}

			this.closeMenu();
		}, 0);
	}

	onClick(e) {
		this.toggleMenu();
	}

	onKeyDown(e) {
		switch(e.key) {
		case 'Enter':
			this.toggleMenu();
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

	render() {
		const isActive = this.state.isActive,
			{
				trigger,
				options,
				className,
				...other
			} = this.props,
			{
				onClick,
				onKeyUp,
				onKeyDown,
				onBlur
			} = this;

		const popoverClassNames = cx(
			'popover',
			className
		);
		const triggerClassNames = cx(
			'popover-trigger',
			{
				'popover-trigger--active': isActive
			}
		);
		const menuClassNames = cx(
			'popover-container',
			'popover-menu',
			{
				'display--none': !isActive
			}
		);

		return (
			<div
				className={popoverClassNames}
				aria-haspopup='true'
				onKeyDown={onKeyDown}
				onBlur={onBlur}
				{...other}
			>

				<div
					className={triggerClassNames}
					tabIndex='0'
					onClick={onClick}
				>
					{trigger}
				</div>

				<nav>
					<ul
						className={menuClassNames}
						role='menu'
						aria-hidden={!isActive}
					>
						{
							options.map((option,i) => {
								const isSelected = isActive && this.state.selectedIndex === i;
								return(
									<li
										key={i}
										ref={(item) => {
											if (isSelected) {
												this.selectedItemEl = item;
											}
										}}
										role='menuitem'
										tabIndex='0'
										className='popover-menu-item'
										onKeyUp={onKeyUp}
										>
										{option}
									</li>
								);
							})
						}
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
