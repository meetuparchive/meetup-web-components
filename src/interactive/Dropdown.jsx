import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import bindAll from '../utils/bindAll';

/**
 * @module Dropdown
 */
class Dropdown extends React.PureComponent {
	constructor(props) {
		super(props);

		bindAll(this,
			'toggleContent',
			'onClick',
			'onKeyDown',
			'onClick',
			'onBodyClick',
			'onBodyKeyDown'
		);

		this.state = { isActive: false };
	}

	closeContent() {
		this.setState(() => ({ isActive: false }));
	}

	toggleContent() {
		this.setState(() => ({ isActive: !this.state.isActive }));
	}

	onClick(e) {
		this.toggleContent();
	}

	onKeyDown(e) {
		if (e.key === 'Enter') {
			this.toggleContent();
		}
	}

	onBodyClick(e) {
		const isNotDropdownClick = [
			this.contentRef,
			this.triggerRef
		].every(ref => !ref.contains(e.target));

		if (isNotDropdownClick) {
			this.closeContent();
		}
	}

	onBodyKeyDown(e) {
		if (e.key === 'Escape') {
			this.closeContent();
		}
	}

	componentDidMount() {
		document.body.addEventListener('click', this.onBodyClick);
		document.body.addEventListener('keydown', this.onBodyKeyDown);
	}

	componentWillUnmount() {
		document.body.removeEventListener('click', this.onBodyClick);
		document.body.removeEventListener('keydown', this.onBodyKeyDown);
	}

	render() {
		const isActive = this.state.isActive;
		const {
				className,
				trigger,
				content,
				align, // eslint-disable-line no-unused-vars
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
					'dropdown-content--right': (align == 'right'),
					'dropdown-content--left': (align == 'left'),
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

				<div
					ref={(el) => this.contentRef = el}
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
	align: PropTypes.oneOf(['left', 'right']).isRequired,
	className: PropTypes.string,
};

export default Dropdown;
