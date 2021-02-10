import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import Avatar from './Avatar';
import Icon from './Icon';

export const AVATAR_PERSON_CLASS = 'avatar--person';
export const AVATAR_PERSON_ORG_CLASS = 'avatar--org';
export const AVATAR_PERSON_FB_CLASS = 'avatar--fbFriend';
export const AVATAR_PERSON_NOPHOTO_CLASS = 'avatar--noPhoto';
const AVATAR_ICON_BADGE_CLASS = 'svg--avatarBadge';

const AVATAR_IMAGE_SIZE_LIST = ['big', 'default'];

export const getPhoto = (photo, size) => {
	if (!photo) {
		return undefined;
	}
	switch (size) {
		case 'big':
			return photo.photo_link || photo.highres_link; // use highres_link as a fallback
		default:
			return photo.thumb_link;
	}
};

// Use `imageSize` prop to control image resolution independently from component size
export const getPhotoSize = (imageSize, isBig) => {
	if (imageSize) {
		return imageSize;
	}
	return isBig ? 'big' : 'default';
};

/**
 * An avatar for a member - just supply a member
 * @module AvatarMember
 */
class AvatarMember extends React.PureComponent {
	render() {
		const { member, org, fbFriend, className, imageSize, ...other } = this.props;
		const { big, large, xxlarge } = other;

		const photoSize = getPhotoSize(imageSize, big || large || xxlarge);
		const photoLink = getPhoto(member.photo, photoSize);
		const showNoPhoto = typeof photoLink !== 'string'; // _any_ non-string value should be considered invalid.

		const classNames = cx(
			AVATAR_PERSON_CLASS,
			{
				[AVATAR_PERSON_ORG_CLASS]: org,
				[AVATAR_PERSON_FB_CLASS]: fbFriend,
				[AVATAR_PERSON_NOPHOTO_CLASS]: showNoPhoto,
			},
			className
		);

		const allProps = {
			alt: member.name,
			className: classNames,
		};

		if (!showNoPhoto) {
			allProps.src = photoLink;
		}

		return (
			<Avatar {...allProps} {...other}>
				{showNoPhoto && (
					<Icon
						className="avatarIcon--noPhoto display--inlineFlex"
						shape="profile"
						size="m"
					/>
				)}
				{fbFriend &&
					!org && (
						<Icon
							className={AVATAR_ICON_BADGE_CLASS}
							shape="external-facebook"
							size="m"
						/>
					)}
				{org && (
					<Icon className={AVATAR_ICON_BADGE_CLASS} shape="badge" size="m" />
				)}
			</Avatar>
		);
	}
}

AvatarMember.propTypes = {
	/** Would like to deprecate this in favor of xxlarge */
	big: PropTypes.bool,

	/** Render Avatar at a medium size */
	medium: PropTypes.bool,

	/** Render Avatar at a larger size */
	large: PropTypes.bool,

	/** Render Avatar at a very large size */
	xxlarge: PropTypes.bool,

	/** Data for the person who's avatar we're displaying */
	member: PropTypes.object.isRequired,

	/** Whether this avatar is for an organizer */
	org: PropTypes.bool,

	/** Whether this avatar is for a person the user is friends with on FB */
	fbFriend: PropTypes.bool,

	/** Image size */
	imageSize: PropTypes.oneOf(AVATAR_IMAGE_SIZE_LIST),
};

export default AvatarMember;
