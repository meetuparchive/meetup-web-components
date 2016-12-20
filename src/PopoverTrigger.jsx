import React from 'react';
import cx from 'classnames';

/**
 * @module PopoverTrigger
 */
class PopoverTrigger extends React.Component {
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

	render() {
		const {
			children,
			className,
			keyHandler,
			clickHandler,
			...other
		} = this.props;

		const classNames = cx(
			'popover-trigger',
			className
		);

		return (
			<div
				onClick={clickHandler}
				onKeyDown={keyHandler}
				className={classNames}>
				{children}
			</div>
		);
	}
}
PopoverTrigger.defaultProps = {
};
PopoverTrigger.propTypes = {
};

export default PopoverTrigger;
