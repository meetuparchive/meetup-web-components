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
				poop: isActive
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
PopoverTrigger.propTypes = {
	handleClick: React.PropTypes.func.isRequired,
	handleKeyDown: React.PropTypes.func.isRequired,
	isActive: React.PropTypes.bool.isRequired,
};

export default PopoverTrigger;
