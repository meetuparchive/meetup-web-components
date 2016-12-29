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
			onClick,
			onKeyDown,
			onBlur,
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
				onClick={onClick}
				onKeyDown={onKeyDown}
				className={classNames}
				onBlur={onBlur}
				tabIndex='0'
				{...other}
			>
				{children}
			</div>
		);
	}
}
PopoverTrigger.propTypes = {
	className: React.PropTypes.string,
	onClick: React.PropTypes.func,
	onKeyDown: React.PropTypes.func,
	onBlur: React.PropTypes.func,
	isActive: React.PropTypes.bool,
};

export default PopoverTrigger;
