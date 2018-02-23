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
class Button extends React.PureComponent {

	render() {
		const {
			children,
			className,
			onClick,
			reset,
			fullWidth,
			primary,
			neutral,
			icon,
			right,
			small,
			bordered,
			hasHoverShadow,
			buttonTag,
			linkTo,
			...other
		} = this.props;

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
					'button--neutral': neutral
				},
				className
			),
			iconWrap: cx(
				BUTTON_ICON_WRAPPER_CLASS,
				{
					[`${BUTTON_ICON_WRAPPER_CLASS}--right`]: right
				}
			)
		};
		const opts = right ? { rowReverse: 'all' } : {};

		const iconChildren = (
			<Flex className={classNames.iconWrap} justify='center' {...opts}>
				{icon &&
					<FlexItem shrink className={`${BUTTON_ICON_CLASS} valign--middle flush--left`}>
						{icon}
					</FlexItem>
				}
				{children &&
					<FlexItem shrink className={`${BUTTON_LABEL_CLASS} valign--middle align--center atMedium_align--left`}>
						{children}
					</FlexItem>
				}
			</Flex>
		);

		const ButtonTag = buttonTag;
		const hrefAttr = buttonTag === 'Link' && buttonTag !== 'button' ? 'to' : 'href';
		const buttonProps = {
			className: classNames.button,
			onClick: onClick,
			role: buttonTag ? 'button' : null,
			[hrefAttr]: linkTo,
			...other
		};

		return (
			<ButtonTag
				{...buttonProps}
			>
				{ icon ? iconChildren : children }
			</ButtonTag>
		);
	}
}

Button.defaultProps = {
	buttonTag: 'button'
};

Button.propTypes = {
	reset: PropTypes.bool,
	fullWidth: PropTypes.bool,
	primary: PropTypes.bool,
	small: PropTypes.bool,
	icon: PropTypes.any,
	right: PropTypes.bool,
	buttonTag: PropTypes.oneOf(['button', 'a', 'Link']),
	linkTo: PropTypes.string
};
export default Button;
