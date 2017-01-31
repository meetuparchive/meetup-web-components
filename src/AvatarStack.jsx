import React from 'react';
import cx from 'classnames';

import AvatarMember from './AvatarMember';

import Flex from './Flex';
import FlexItem from './FlexItem';
/**
 * @module AvatarStack
 */
class AvatarStack extends React.Component {

	/**
	 * @return The array of avatars passed in as <FlexItem>s
	 */
	renderAvatars() {

		this.avatars = this.props.memberList.map((member, i) => {
			return (
				<FlexItem
					shrink
					className={
						cx('avatarStack-item', {
							'avatarStack-item--big': this.props.size == 'big'
						})
					}>
					<AvatarMember
						member={member}
						label={member.name}
						small={this.props.size == 'small'}
						big={this.props.size == 'big'}
					/>
				</FlexItem>
			);
		});

		return this.avatars;
	}

	/**
	 * @return {React.element} this component
	 */
	render() {
		const {
			size,
			memberList, // eslint-disable-line no-unused-vars
			stackThreshold, // eslint-disable-line no-unused-vars
			className,
			...other
		} = this.props;

		const classNames = cx(
			'avatarStack',
			{
				[`avatarStack--${size}`]: size !== 'default'
			},
			className
		);

		const rowJustify = () => {
			// if stackThreshold is not set
			// if stackThreshold is set AND memberlist.length is greater than or equal to it
				// justify avatars (return 'spaceBetween')

			// if stackThreshold is set AND memberlist.length is less than it
				// flesh avatars left (return 'flexStart')
			if (this.props.stackThreshold) {
				return this.props.memberList.length >= this.props.stackThreshold ? 'spaceBetween' : 'flexStart';
			} else {
				return 'spaceBetween';
			}
		};

		return (
			<Flex
				wrap
				justify={rowJustify()}
				className={classNames}
				{...other}>
					{this.renderAvatars()}
			</Flex>
		);

	}
}

AvatarStack.defaultProps = {
	size: 'default',
	stackThreshold: false
};

AvatarStack.propTypes = {
	memberList: React.PropTypes.array.isRequired,
	size: React.PropTypes.oneOf([
		'default',
		'small',
		'big'
	]),
};

export default AvatarStack;
