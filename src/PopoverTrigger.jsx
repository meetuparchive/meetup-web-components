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
			handleBlur,
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
				onBlur={handleBlur}
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
	handleClick: React.PropTypes.func,
	handleKeyDown: React.PropTypes.func,
	handleBlur: React.PropTypes.func,
	isActive: React.PropTypes.bool,
};

export default PopoverTrigger;
