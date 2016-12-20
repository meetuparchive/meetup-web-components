import React from 'react';
import cx from 'classnames';

/**
 * @module Popover
 */
class Popover extends React.Component {
	constructor(props) {
		super(props);

		this.state = { isActive: false }
	}

	openMenu() {
		if ( !this.state.isActive ) {
			this.setState({ isActive: true });
		}
	}

	closeMenu() {
		if ( this.state.isActive ) {
			this.setState({ isActive: false });
		}
	}

	handleKeyDown(e) {
		switch(e.key) {
			case 'ArrowDown':
				break;
			case 'ArrowUp':
				break;
			case 'Enter':
				this.openMenu();
				break;
			case 'Escape':
				this.closeMenu();
				break;
		}
	}

	renderTrigger() {
	}

	render() {
		const {
			children,
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
				aria-haspopup="true">
				{children}
			</div>
		);
	}
}
Popover.defaultProps = {
};
Popover.propTypes = {
};

export default Popover;
