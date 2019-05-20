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
					'button--neutral': neutral,
					'button--disabled': disabled,
					'button--iconOnly': icon && !children,
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
	}
}

Button.defaultProps = {
	component: 'button',
	type: 'button',
};

Button.propTypes = {
	/** Behaves like a button in the browser, but just looks like regular text or icons */
	reset: PropTypes.bool,

	/** Forces button to span the full width of it's container */
	fullWidth: PropTypes.bool,

	/** Used to highlight the most important action on a screen. Not intended to be used more than once on a screen/modal/section. */
	primary: PropTypes.bool,

	/** The standard button for most use cases. Other styles are available for buttons that need more visual weight */
	neutral: PropTypes.bool,

	/** Takes an `Icon` element to render inside of the button */
	icon: PropTypes.any,

	/** Renders the icon on the right side of the button text */
	right: PropTypes.bool,

	/** Reduces the size of the button */
	small: PropTypes.bool,

	/** Sometimes used in place of a Neutral button on shaded backgrounds to maintain the appropriate visual weight */
	bordered: PropTypes.bool,

	/** Button "lifts" on hover with a shadow */
	hasHoverShadow: PropTypes.bool,

	/** Which component or html element type to use */
	component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

	/** Whether to use disabled attribute and disabled button styles */
	disabled: PropTypes.bool,

	/** HTML type attribute. e.g.: `<button type="submit"/>`  */
	type: PropTypes.string,
};
export default Button;
