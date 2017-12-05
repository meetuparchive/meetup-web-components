import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import Avatar from './Avatar';
import Icon from './Icon';

export const AVATAR_PERSON_CLASS = 'avatar--person';
export const AVATAR_PERSON_ORG_CLASS = 'avatar--org';
export const AVATAR_PERSON_FB_CLASS = 'avatar--fbFriend';
export const AVATAR_PERSON_NOPHOTO_CLASS = 'avatar--noPhoto';

/**
 * An avatar for a member - just supply a member
 * @module AvatarMember
 */
class AvatarMember extends React.PureComponent {
	render() {
		const { member, org, fbFriend, className, ...other } = this.props;
		const { big, large, xxlarge } = other;

		const photoLink = big || large || xxlarge ? 'photo_link' : 'thumb_link';
		const showNoPhoto = (member.photo || {})[photoLink] == undefined;

		const classNames = cx(
			AVATAR_PERSON_CLASS,
			{
				[AVATAR_PERSON_ORG_CLASS]: org,
				[AVATAR_PERSON_FB_CLASS]: fbFriend,
				[AVATAR_PERSON_NOPHOTO_CLASS]: showNoPhoto,
			},
			className
		);

		const noPhotoIcon = (<Icon
			shape="profile"
			size="m"
		/>);

		const allProps = {
			alt: member.name,
			className: classNames,
			children: showNoPhoto && noPhotoIcon,
		};

		if (!showNoPhoto) {
			allProps.src = member.photo[photoLink];
		}

		return <Avatar {...allProps} {...other} />;
	}
}

AvatarMember.propTypes = {
	big: PropTypes.bool,
	large: PropTypes.bool,
	xxlarge: PropTypes.bool,
	member: PropTypes.object.isRequired,
	org: PropTypes.bool,
	fbFriend: PropTypes.bool,
};

export default AvatarMember;
