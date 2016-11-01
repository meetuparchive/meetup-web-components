import React from 'react';
import cx from 'classnames';

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
			contrast,
			fullWidth,
			icon,
			primary,
			right,
			small,
			...other
		} = this.props;

		const classNames = cx(
			'button',
			{
				'button--contrast': contrast,
				'button--fullWidth': fullWidth,
				'button--primary': primary,
				'button--small': small,
			},
			className
		);

		const iconChildren = [
			<span className='button--icon' key={0}>{icon}</span>,
			'\u00a0',  // non-breaking space
			<span className='button--label' key={2}>{children}</span>
		];
		if (right) {
			iconChildren.reverse();
		}

		return (
			<button
				className={classNames}
				onClick={onClick}
				role='button'
				{...other}>
				{ icon ? iconChildren : children }
			</button>
		);
	}
}

Button.defaultProps = {
	right: false
};

Button.propTypes = {
	contrast: React.PropTypes.bool,
	fullWidth: React.PropTypes.bool,
	primary: React.PropTypes.bool,
	small: React.PropTypes.bool,
	icon: React.PropTypes.any,
	right: React.PropTypes.bool
};

export default Button;
