import React from 'react';
import cx from 'classnames';
import Flex from './Flex';
import FlexItem from './FlexItem';

/**
 *	SQ2 Group Card component
 *	@see {@link https://github.com/meetup/sassquatch2/blob/develop/sass/ui-components/_card.scss}
 *	@see {@link http://meetup.github.io/sassquatch2/ui_components.html#uiCard}
 *	@module GroupCard
*/
export class GroupCard extends React.Component {
	render() {
		const {
			group,
			className,
			style,
			...other
		} = this.props;

		const cardClassNames = cx(
			'card',
			'card--group',
			'inverted',
			className
		);

		const photoUrl = group.duotoneUrl || (group.key_photo || group.group_photo || {}).thumb_link;
		const backgroundImage = photoUrl && `url(${photoUrl})`;

		const CardContent = ({group}) => (
			<div>
				<h4 className='card--group-content-name'>{group.name}</h4>
				<p className='card--group-content-members'>{group.members} {group.who}</p>
			</div>
		);

		const CardContentWithAction = ({group, action}) => (
			<Flex>
				<FlexItem>
					<CardContent group={group} />
				</FlexItem>
				<FlexItem shrink>
					{action}
				</FlexItem>
			</Flex>
		);

		return (
			<span
				className={cardClassNames}
				style={{ ...(style || {}), backgroundImage }}
				{...other}>

				<div className='card--group-content'>
					{this.props.action ? (
						<CardContentWithAction group={this.props.group} action={this.props.action} />
					) : (
						<CardContent group={this.props.group} />
					)}

				</div>

			</span>
		);
	}
}

GroupCard.propTypes = {
	group: React.PropTypes.object.isRequired,
	action: React.PropTypes.object,
};

export default GroupCard;
