import React from 'react';
import cx from 'classnames';
import Avatar from './Avatar';
import Icon from './Icon';
// import { getIconAsBase64Uri } from './utils/base64';

// const NO_PHOTO_SRC = getIconAsBase64Uri('profile');

/**
 * An avatar for a member - just supply a member
 * @module AvatarMember
 */
class AvatarMember extends React.Component {
	render() {
		const {
			member,
			org,
			fbFriend,
			className,
			...other
		} = this.props;

		const showNoPhoto = (member.photo || {}).photo_link == undefined;
		const classNames = cx(
			'avatar--person',
			{
				'avatar--org': org,
				'avatar--fbFriend': fbFriend,
				'avatar--noPhoto': showNoPhoto
			},
			className);

		return (
			<Avatar
				alt={member.name}
				src={(member.photo || {}).photo_link || ''}
				className={classNames}
				{...other}
			>
				{showNoPhoto &&
					<Icon shape='profile' />
				}
			</Avatar>
		);
	}
}

AvatarMember.propTypes = {
	member: React.PropTypes.object.isRequired,
	org: React.PropTypes.bool,
	fbFriend: React.PropTypes.bool,
};

export default AvatarMember;

