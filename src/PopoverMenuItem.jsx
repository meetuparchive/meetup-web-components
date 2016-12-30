import React from 'react';
import { Link } from 'react-router';
import ReactDOM from 'react-dom';
import cx from 'classnames';

/**
 * @module PopoverMenuItem
 */
class PopoverMenuItem extends React.Component {

	componentDidUpdate() {
		if (this.selectedItem) {
			ReactDOM.findDOMNode(this.selectedItem).focus();
		}
	}

	render() {
		const {
			children,
			to,
			className,
			onKeyUp,
			isSelected,
			...other
		} = this.props;

		const classNames = cx(
			'popover-menu-item',
			className
		);

		return (
			<Link
				ref={(item) => {
					if (isSelected) {
						this.selectedItem = item;
					}
				}}
				role='menuitem'
				tabIndex='0'
				className={classNames}
				onKeyUp={onKeyUp}
				to={to}
				{...other}
			>
				{children}
			</Link>
		);
	}
}
PopoverMenuItem.propTypes = {
	to: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.object
	]),
	onClick: React.PropTypes.func,
	onKeyUp: React.PropTypes.func,
};

export default PopoverMenuItem;
