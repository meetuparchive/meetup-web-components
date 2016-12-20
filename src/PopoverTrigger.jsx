import React from 'react';
import cx from 'classnames';

/**
 * @module PopoverTrigger
 */
class PopoverTrigger extends React.Component {

	render() {
		const {
			children,
			className,
			handleClick,
			handleKeyDown,
			isActive,
			...other
		} = this.props;

		const classNames = cx(
			'popover-trigger',
			{
				'popover-trigger--active': isActive
			},
			className
		);

		return (
			<div
				onClick={handleClick}
				onKeyDown={handleKeyDown}
				className={classNames}
				tabIndex='0'
				{...other}>
				{children}
			</div>
		);
	}
}

export default PopoverTrigger;
