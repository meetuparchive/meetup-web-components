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
			'toggleContent',
			'onClick',
			'onKeyDown',
			'onClick',
			'onBlur'
		);

		this.state = { isActive: false };
	}

	toggleContent() {
		this.setState(() => ({ isActive: !this.state.isActive}));
	}

	focusCheck() {
		// const focusedOptionClass = document.activeElement.parentNode.classList;

		// TODO: bail out if active element is the content el
		/*
		 *if (focusedOptionClass && focusedOptionClass.contains(POPOVER_MENU_CLASS)) {
		 *    return;
		 *}
		 */

		this.toggleContent();
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
		this.toggleContent();
	}

	onKeyDown(e) {
		switch(e.key) {
		case 'Enter':
			this.toggleContent();
			break;
		case 'Escape':
			this.toggleContent();
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
			content: cx(
				'dropdown-content',
				{
					'display--none': !isActive,
					'display--block': isActive
				}
			)
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
