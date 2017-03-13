import React from 'react';
import cx from 'classnames';
import Avatar from './Avatar';
import { getIconAsBase64Uri } from './utils/getIconAsBase64Uri';

const NO_PHOTO_SRC = getIconAsBase64Uri('profile');  // 'http://placehold.it/100x100'

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

		const classNames = cx(
			'avatar--person',
			{
				'avatar--org': org,
				'avatar--fbFriend': fbFriend,
				'avatar--noPhoto': (member.photo || {}).photo_link == undefined
			},
			className);

		console.log(NO_PHOTO_SRC);

		return (
			<Avatar
				alt={member.name}
				src={(member.photo || {}).photo_link || NO_PHOTO_SRC}
				className={classNames}
				{...other}/>
		);
	}
}

AvatarMember.propTypes = {
	member: React.PropTypes.object.isRequired,
	org: React.PropTypes.bool,
	fbFriend: React.PropTypes.bool,
};

export default AvatarMember;

