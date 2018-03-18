import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import Flex from '../layout/Flex';
import FlexItem from '../layout/FlexItem';

export const BUTTON_CLASS = 'button';
export const BUTTON_ICON_WRAPPER_CLASS = 'button-icon-wrapper';
export const BUTTON_LABEL_CLASS = 'button-label';
export const BUTTON_ICON_CLASS = 'button-icon';

/**
 * @module Button
 */
const Button = ({
	children,
	className,
	reset,
	fullWidth,
	primary,
	neutral,
	icon,
	right,
	small,
	bordered,
	hasHoverShadow,
	component,
	disabled,
	type,
	...other
}) => {
	const classNames = {
		button: cx(
			BUTTON_CLASS,
			{
				'button--fullWidth': fullWidth,
				'button--primary': primary,
				'button--small': small,
				'button--reset': reset,
				'button--bordered': bordered,
				'button--hasHoverShadow': hasHoverShadow,
				'button--neutral': neutral,
				'button--disabled': disabled,
			},
			className
		),
		iconWrap: cx(BUTTON_ICON_WRAPPER_CLASS, {
			[`${BUTTON_ICON_WRAPPER_CLASS}--right`]: right,
		}),
	};
	const opts = right ? { rowReverse: 'all' } : {};

	const iconChildren = (
		<Flex className={classNames.iconWrap} justify="center" {...opts}>
			{icon && (
				<FlexItem
					shrink
					className={`${BUTTON_ICON_CLASS} valign--middle flush--left`}
				>
					{icon}
				</FlexItem>
			)}
			{children && (
				<FlexItem
					shrink
					className={`${BUTTON_LABEL_CLASS} valign--middle align--center atMedium_align--left`}
				>
					{children}
				</FlexItem>
			)}
		</Flex>
	);

	const Component = component;

	if (disabled) {
		delete other.onClick;
	}

	return (
		<Component className={classNames.button} type={type} {...other}>
			{icon ? iconChildren : children}
		</Component>
	);
};

Button.defaultProps = {
	component: 'button',
	type: 'button',
};

Button.propTypes = {
	reset: PropTypes.bool,
	fullWidth: PropTypes.bool,
	primary: PropTypes.bool,
	neutral: PropTypes.bool,
	icon: PropTypes.any,
	right: PropTypes.bool,
	small: PropTypes.bool,
	bordered: PropTypes.bool,
	hasHoverShadow: PropTypes.bool,
	component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	disabled: PropTypes.any,
	type: PropTypes.string,
};
export default Button;
