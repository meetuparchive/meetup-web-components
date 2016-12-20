import React from 'react';
import cx from 'classnames';

/**
 * @module PopoverMenu
 */
class PopoverMenu extends React.Component {

	render() {
		const {
			className,
			handleKeyDown,
			isActive,
			...other
		} = this.props;

		const classNames = cx(
			'menu-actions',
			{
				'menu-actions--active': !isActive
			},
			className
		);

		return (
			<ul
				onKeyDown={handleKeyDown}
				className={classNames}
				{...other}>
				<li role='menuitem' className='menu-actions-item text--red'>I'm a fucking menu item</li>
				<li role='menuitem' className='menu-actions-item text--blue'>I'm another fucking menu item</li>
			</ul>
		);
	}
}
PopoverMenu.defaultProps = {
};
PopoverMenu.propTypes = {
};

export default PopoverMenu;
