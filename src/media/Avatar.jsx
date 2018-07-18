import PropTypes from 'prop-types';
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
			large,
			big, // would like to deprecate this
			xxlarge,
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
				'avatar--large': large,
				'avatar--xxlarge': big || xxlarge,
			},
			className
		);

		const backgroundImage = src;
		const allStyles = style || {};
		if (backgroundImage) {
			allStyles.backgroundImage = `url(${backgroundImage})`;
		}

		const aria = {
			role: 'presentation',
		};

		const computedProps = {
			className: classNames,
			style: allStyles,
		};

		const allProps = {
			...computedProps,
			...aria,
			...other,
		};

		// hidden by default;
		// displayed only for print media
		const printPhoto = src && <img className="avatar-print" src={src} alt={alt} />;

		if (this.props.to || this.props.href) {
			return (
				<a {...allProps}>
					<span className="visibility--a11yHide">{alt}</span>
					{children}
					{printPhoto}
				</a>
			);
		}

		return (
			<span {...allProps}>
				<span className="visibility--a11yHide">{alt}</span>
				{children}
				{printPhoto}
			</span>
		);
	}
}

Avatar.propTypes = {
	small: PropTypes.bool,
	large: PropTypes.bool,
	big: PropTypes.bool /** Would like to deprecate this in favor of xxlarge */,
	xxlarge: PropTypes.bool,
	src: PropTypes.string /** The image source URL for the Avatar */,
	href: PropTypes.string /** Link to arbitrary URL outside app */,
	alt: PropTypes.string /** the image label, mainly for accessibility */,
	to: PropTypes.string /** For linking to app routes */,
};

export default Avatar;
