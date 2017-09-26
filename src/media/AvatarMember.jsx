import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import Avatar from './Avatar';

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
		const { member, org, fbFriend, className, big, large, xxlarge, ...other } = this.props;

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

		const noPhotoImage = require('base64-image-loader!swarm-icons/dist/optimized/profile.svg');

		return (
			<Avatar
				alt={member.name}
				src={showNoPhoto ? noPhotoImage : member.photo[photoLink]}
				className={classNames}
				big={big}
				large={large}
				xxlarge={xxlarge}
				{...other}
			/>
		);
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
