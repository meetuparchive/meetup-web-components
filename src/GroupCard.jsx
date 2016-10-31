import React from 'react';
import Link from 'react-router/lib/Link';
import cx from 'classnames';

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

		return (
			<Link
				to={`/${group.urlname}`}
				className={cardClassNames}
				style={{ ...(style || {}), backgroundImage }}
				{...other}>

				<div className='card--group-content'>
					<h4 className='card--group-content-name'>{group.name}</h4>
					<p className='card--group-content-members'>{group.members} {group.who}</p>
				</div>

			</Link>
		);
	}
}

GroupCard.propTypes = {
	group: React.PropTypes.object.isRequired,
};

export default GroupCard;
