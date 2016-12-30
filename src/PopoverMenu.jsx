import React from 'react';
import bindAll from './utils/bindAll';
import cx from 'classnames';

/**
 * @module PopoverMenu
 */
class PopoverMenu extends React.Component {
	constructor(props) {
		super(props);

		bindAll(this,
			'updateFocusBy',
			'onKeyUp'
		);

		this.state = {
			selectedIndex: 0
		};
	}

	updateFocusBy(delta) {
		const targetIndex = this.state.selectedIndex + delta;
		const itemLength = React.Children.toArray(this.props.children).length;

		if (targetIndex >= 0 && targetIndex <= itemLength) {
			this.setState({ selectedIndex: targetIndex });
		}
	}

	onKeyUp(e) {
		switch(e.key) {
		case 'ArrowDown':
			this.updateFocusBy(1);
			break;
		case 'ArrowUp':
			this.updateFocusBy(-1);
			break;
		}
	}

	render() {
		const {
			children,
			className,
			onKeyDown,
			isActive,
			...other
		} = this.props;

		const { onKeyUp } = this;

		const classNames = cx(
			'popover-container',
			'popover-container--menu',
			{
				'display--none': !isActive
			},
			className
		);

		return (
			<div
				role='menu'
				onKeyDown={onKeyDown}
				className={classNames}
				aria-hidden={!isActive}
				{...other}
			>
				{
					React.Children.map(children, (child, i) => {
						const isSelected = isActive && this.state.selectedIndex === i;
						const newProps = Object.assign({},
							{ onKeyUp },
							{ isSelected }
						);
						return React.cloneElement(child, newProps);
					})
				}
			</div>
		);
	}
}
PopoverMenu.propTypes = {
	className: React.PropTypes.string,
	onKeyDown: React.PropTypes.func,
	isActive: React.PropTypes.bool,
};

export default PopoverMenu;
