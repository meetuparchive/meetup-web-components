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
			'onClick'
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
		switch(e.key) {
		case 'Enter':
			this.toggleContent();
			break;
		case 'Escape':
			this.closeContent();
			break;
		}
	}

	componentDidMount() {
	}

	componentWillUnmount() {
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
					ref={(el) => this.contentEl}
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
