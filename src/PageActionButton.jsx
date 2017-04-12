import React from 'react';
import Button from './forms/Button';
import Flex from './layout/Flex';
import FlexItem from './layout/FlexItem';

export const PAGE_ACTION_BUTTON_CLASS = 'pageActionButton';

/**
 * @description  Design System Component: Provides `PageActionButtion` button which offers a larger button
 * with stacked icon/label or side by side view options. It differs from `Button` in that there
 * is now visible button border and offers more enhanced stacking options. Common usage would be
 * with `PageHead` component
 * @module PageActionButton
 */
class PageActionButton extends React.Component {
	render() {
		const {
			children,
			className,
			icon,
			label,
			stackVertical,
			stackVerticalAtMedium,
			onClick,
			...other
		} = this.props;

		let direction,
			switchDirection,
			justify;

		// if (direction is column)
		// icons and labels in stacked rows,
		// Otherwise, always labels and icons
		// are side by side in a row
		if (stackVertical || stackVerticalAtMedium) {
			direction = 'column';
			justify = 'center';
			switchDirection = stackVerticalAtMedium ? 'medium' : '';
		}

		return (
			<Button
				className={PAGE_ACTION_BUTTON_CLASS}
				onClick={onClick}
			>
				<Flex
					direction={direction}
					switchDirection={switchDirection}
					justify={justify}
					className={className}
					{...other}
				>
					{icon &&
						<FlexItem shrink className='valign--middle'>
							{icon}
						</FlexItem>
					}
					{label &&
						<FlexItem shrink className='valign--middle align--center atMedium_align--left'>
							<div className='text--small text--hint'>{label}</div>
						</FlexItem>
					}
					{children}
				</Flex>
			</Button>
		);
	}
}

PageActionButton.propTypes = {
	icon: React.PropTypes.element.isRequired,
	label: React.PropTypes.oneOfType([
		React.PropTypes.element,
		React.PropTypes.string
	]).isRequired,
	stackVertical: React.PropTypes.bool,
	stackVerticalAtMedium: React.PropTypes.bool,
	onClick: React.PropTypes.func,
};

export default PageActionButton;
