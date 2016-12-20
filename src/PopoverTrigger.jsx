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
			...other
		} = this.props;

		const classNames = cx(
			'menu-toggle',
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
PopoverTrigger.defaultProps = {
};
PopoverTrigger.propTypes = {
};

export default PopoverTrigger;
