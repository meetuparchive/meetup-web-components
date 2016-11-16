import React from 'react';
import cx from 'classnames';

/**
 * Site-wide header component using SQ2 styles
 * @see {@link http://meetup.github.io/sassquatch2/}
 * @module Header
 */
class Header extends React.Component {
	render() {
		const {
			children,
			className,
			...other
		} = this.props;


		const classNames = cx(
			'header',
			className
		);

		return (
			<header
				className={classNames}
				role='banner'
				aria-label='Site header'
				{...other}>
					{children}
			</header>
		);
	}
}

export default Header;
