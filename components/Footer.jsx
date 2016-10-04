import React from 'react';
import cx from 'classnames';

/**
 * Site-wide footer component using SQ2 styles
 * @see {@link http://meetup.github.io/sassquatch2/}
 * @module Footer
 */
class Footer extends React.Component {
	render() {
		const {
			children,
			className,
			...other
		} = this.props;

		const classNames = cx(
			'stripe--inverted',
			'inverted',
			className
		);

		return (
			<footer
				className={classNames}
				role='contentinfo'
				aria-label='Site footer'
				{...other}>
					<div className='padding--all'>
						{children}
					</div>
			</footer>
		);
	}
}

export default Footer;
