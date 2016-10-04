import React from 'react';
import Link from 'react-router/lib/Link';
import cx from 'classnames';

/**
 * Navigation item component using SQ2 styles
 * @see {@link http://meetup.github.io/sassquatch2/}
 * @module NavItem
 */
class NavItem extends React.Component {
	render() {
		const {
			className,
			to,
			children,
			...other
		} = this.props;

		const classNames = cx(
			'row-item',
			'row-item--shrink',
			'row-item--alignMiddle',
			'padding--all',
			'text--big',
			className
		);

		return (
			<li
				className={classNames}
				{...other}>
					<Link to={to}>
						{children}
					</Link>
			</li>
		);
	}
}

NavItem.propTypes = {
	to: React.PropTypes.string.isRequired,
};

export default NavItem;
