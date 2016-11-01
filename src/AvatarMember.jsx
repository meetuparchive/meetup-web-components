import React from 'react';
import cx from 'classnames';
import Avatar from './Avatar';

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
			},
			className);

		return (
			<Avatar
				alt={member.name}
				src={(member.photo || {}).photo_link}
				className={classNames}
				{...other} />
		);
	}
}

AvatarMember.propTypes = {
	member: React.PropTypes.object.isRequired,
	org: React.PropTypes.bool,
	fbFriend: React.PropTypes.bool,
};

export default AvatarMember;

