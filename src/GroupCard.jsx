import React from 'react';
import cx from 'classnames';
//import { Link } from 'react-router';
import moment from 'moment';

import {
//	FormattedDate,
//	FormattedMessage,
//	defineMessages
} from 'react-intl';

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
			showNextEvent,
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

		const photoUrl = group.duotoneUrl || (group.key_photo || group.group_photo || {}).photo_link;
		const backgroundImage = photoUrl && `url(${photoUrl})`;

		return (
				<div
					className={cardClassNames}
					style={{ ...(style || {}), backgroundImage }}
					{...other}>

					<div className='card--group-content'>
						<h4 className='card--group-content-name'>{group.name}</h4>
						{/*
							<p className='card--group-content-members'>{group.members} {group.who}</p>
						*/}
					</div>

				</div>
				{showNextEvent &&
					<div className='text--small'>
						{group.next_event &&
							<div>
								<div className='lineClamp'>{group.next_event.name}</div>
								<div className='text--secondary'>
									{moment(group.next_event.time, 'x').format('dddd, MM D LT')}
								</div>
							</div>
						}

						{!group.next_event &&
							<div>Next Meetup TBD</div>
						}
					</div>
				}
		);
	}
}

GroupCard.propTypes = {
	group: React.PropTypes.object.isRequired,
};

export default GroupCard;
