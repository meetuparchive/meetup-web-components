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
			url,
			className,
			handleKeyUp,
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
				onKeyUp={handleKeyUp}
				to={url}
				{...other}>
				{children}
			</Link>
		);
	}
}
PopoverMenuItem.propTypes = {
	onClick: React.PropTypes.func
};

export default PopoverMenuItem;
