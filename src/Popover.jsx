import React from 'react';
import cx from 'classnames';
// import bindAll from './utils/bindAll';

/**
 * @module Popover
 */
class Popover extends React.Component {
	constructor(props) {
		super(props);

		// bindAll();

		this.state = {
			isActive: false,
			selectedIndex: 0
		};
	}

	render() {
		const isActive = this.state.isActive,
			{
				trigger,
				options,
				className,
				...other
			} = this.props;

		const popoverClassNames = cx(
			'popover',
			className
		);
		const triggerClassNames = cx(
			'popover-trigger',
			{
				'popover-trigger--active': isActive
			}
		);
		const menuClassNames = cx(
			'popover-container',
			'popover-menu',
			{
				'display--none': !isActive
			}
		);

		return (
			<div
				className={popoverClassNames}
				aria-haspopup='true'
				{...other}
			>

				<div
					className={triggerClassNames}
					tabIndex='0'
					onClick={() => false}
					onKeyDown={() => false}
					onBlur={() => false}
				>
					{trigger}
				</div>

				<nav>
					<ul
						className={menuClassNames}
						role='menu'
						aria-hidden={!isActive}
					>
						{
							options.map((option,i) => {
								const isSelected = isActive && this.state.selectedIndex === i;
								return(
									<li
										ref={(item) => {
											if (isSelected) {
												this.selectedItemEl = item;
											}
										}}
										role='menuitem'
										tabIndex='0'
										className='popover-menu-item'
										onKeyUp={() => false}
										isSelected={isSelected}
										>
										{option}
									</li>
								);
							})
						}
					</ul>
				</nav>
			</div>
		);
	}
}
Popover.propTypes = {
	trigger: React.PropTypes.element.isRequired,
	options: React.PropTypes.arrayOf(React.PropTypes.element).isRequired,
	className: React.PropTypes.string,
};
export default Popover;
