import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import bindAll from '../utils/bindAll';

/**
 * @module Dropdown
 */
class Dropdown extends React.Component {
	constructor(props) {
		super(props);

		bindAll(this,
			'openContent',
			'closeContent',
			'onClick',
			'onKeyDown',
			'onClick',
			'onBlur'
		);

		this.state = { isActive: false };
	}

	openContent() {
		this.setState(() => ({ isActive: true }));
	}

	closeContent() {
		this.setState(() => ({ isActive: false }));
	}

	focusCheck() {
		// const focusedOptionClass = document.activeElement.parentNode.classList;

		// TODO: bail out if active element is the content el
		/*
		 *if (focusedOptionClass && focusedOptionClass.contains(POPOVER_MENU_CLASS)) {
		 *    return;
		 *}
		 */

		this.closeContent();
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
		this.openContent();
	}

	onKeyDown(e) {
		switch(e.key) {
		case 'Enter':
			if (!this.state.isActive) {
				this.openContent();
			}
			break;
		case 'Escape':
			this.closeContent();
			break;
		}
	}

	render() {
		const isActive = this.state.isActive;
		const {
				className,
				trigger,
				content,
				...other
			} = this.props;

		const classNames = {
			dropdown: cx(
				className,
				'dropdown'
			),
			trigger: cx(
				'dropdown-trigger',
				{
					'dropdown-trigger--active': isActive
				}
			),
			menu: 'dropdown-content'
		};

		return (
			<div
				className={classNames.dropdown}
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

				{/* TODO: fix aria attributes */}
				<div
					className={classNames.content}
					role='menu'
					aria-hidden={!isActive}
				>
					{content}
				</div>
			</div>
		);
	}
}

Dropdown.propTypes = {
	trigger: PropTypes.element.isRequired,
	content: PropTypes.element.isRequired,
	className: PropTypes.string,
};

export default Dropdown;
