import React from 'react';
import cx from 'classnames';
import Flex from './Flex';
import FlexItem from './FlexItem';

export const BUTTON_CLASS = 'button';

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
			contrast,
			fullWidth,
			icon,
			primary,
			right,
			small,
			...other
		} = this.props;

		const classNames = cx(
			BUTTON_CLASS,
			{
				'button--contrast': contrast,
				'button--fullWidth': fullWidth,
				'button--primary': primary,
				'button--small': small,
				'button--reset': reset,
			},
			className
		);
		const opts = right ? { rowReverse: 'all' } : {};

		const iconChildren = (
			<Flex className='button--icon-wrapper' {...opts}>
				{icon &&
					<FlexItem shrink className='button--icon valign--middle'>
						{icon}
					</FlexItem>
				}
				{children &&
					<FlexItem className='button--label valign--middle align--center atMedium_align--left'>
						{children}
					</FlexItem>
				}
			</Flex>
		);

		return (
			<button
				className={classNames}
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
	reset: React.PropTypes.bool,
	contrast: React.PropTypes.bool,
	fullWidth: React.PropTypes.bool,
	primary: React.PropTypes.bool,
	small: React.PropTypes.bool,
	icon: React.PropTypes.any,
	right: React.PropTypes.bool,
};
export default Button;
