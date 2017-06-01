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
 * SQ2 Button component
 * @see {@link https://github.com/meetup/sassquatch2/blob/develop/sass/ui-components/_buttons.scss}
 * @see {@link http://meetup.github.io/sassquatch2/ui_components.html#buttons}
 * @module Button
 */
class Button extends React.Component {

	render() {
		const {
			children,
			className,
			onClick,
			reset,
			fullWidth,
			icon,
			primary,
			right,
			small,
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
			<Flex className={classNames.iconWrap} {...opts}>
				{icon &&
					<FlexItem shrink className={`${BUTTON_ICON_CLASS} valign--middle flush--left`}>
						{icon}
					</FlexItem>
				}
				{children &&
					<FlexItem className={`${BUTTON_LABEL_CLASS} valign--middle align--center atMedium_align--left`}>
						{children}
					</FlexItem>
				}
			</Flex>
		);

		return (
			<button
				className={classNames.button}
				onClick={onClick}
				role='button'
				{...other}
			>
				{ icon ? iconChildren : children }
			</button>
		);
	}
}

Button.defaultProps = {
	right: false
};

Button.propTypes = {
	reset: PropTypes.bool,
	fullWidth: PropTypes.bool,
	primary: PropTypes.bool,
	small: PropTypes.bool,
	icon: PropTypes.any,
	right: PropTypes.bool,
};
export default Button;
