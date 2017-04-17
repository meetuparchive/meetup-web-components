import React from 'react';
import cx from 'classnames';

export const AVATAR_CLASS = 'avatar';
/**
 * SQ2 Avatar component
 *
 * In general, you should use a higher-order component instead of this base
 * component, e.g. `AvatarMember` or `AvatarGroup`
 *
 * @see {@link https://github.com/meetup/sassquatch2/blob/develop/sass/ui-components/_avatar.scss}
 * @see {@link http://meetup.github.io/sassquatch2/ui_components.html#avatar}
 * @module Avatar
 */
class Avatar extends React.PureComponent {
	render() {
		const {
			small,
			big,
			src,
			alt,
			className,
			style,
			children,
			...other
		} = this.props;

		const classNames = cx(
			'avatar',
			{
				'avatar--small': small,
				'avatar--big': big
			},
			className
		);

		const backgroundImage = src;
		const allStyles = style || {};
		if (backgroundImage) {
			allStyles.backgroundImage = `url(${backgroundImage})`;
		}

		const aria = {
			role: 'img',
		};

		const computedProps = {
			className: classNames,
			style: allStyles
		};

		const allProps = {
			...computedProps,
			...aria,
			...other
		};

		if (this.props.to || this.props.href) {
			return <a {...allProps}>{alt}{children}</a>;
		}

		return <span {...allProps}>{alt}{children}</span>;
	}
}

Avatar.propTypes = {
	small: React.PropTypes.bool,
	big: React.PropTypes.bool,
	src: React.PropTypes.string, /** The image source URL for the Avatar */
	href: React.PropTypes.string, /** Link to arbitrary URL outside app */
	alt: React.PropTypes.string, /** the image label, mainly for accessibility */
	to: React.PropTypes.string,  /** For linking to app routes */
};

export default Avatar;
