import React from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

/**
 * @module PopoverMenuItem
 */
class PopoverMenuItem extends React.Component {

	render() {
		const {
			children,
			to,
			className,
			onKeyUp,
			...other
		} = this.props;

		const classNames = cx(
			'popover-menu-item',
			className
		);

		return (
			<Link
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
