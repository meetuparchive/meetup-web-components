import React from 'react';
import cx from 'classnames';
//import { Link } from 'react-router';
import moment from 'moment';

import {
//	FormattedDate,
//	FormattedMessage,
//	defineMessages
} from 'react-intl';

import {
	Chunk,
	// Flex,
	// FlexItem,
	// Section,
} from './layoutUtils';

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
			'pseudoLine',
			'inverted',
			className
		);

		const photoUrl = group.duotoneUrl || (group.key_photo || group.group_photo || {}).photo_link;
		const backgroundImage = photoUrl && `url(${photoUrl})`;

		return (
				<div>
				<div
					className={cardClassNames}
					style={{ ...(style || {}), backgroundImage }}
					{...other}>

					<div className='card--group-content'>
						<h4 className='card--group-content-name'>{group.name}</h4>
					</div>

				</div>
				{showNextEvent &&
					<Chunk>
						<div className='text--small'>
							{group.next_event &&
								<div>
									<div>
										{group.next_event.name}
									</div>
									<div className='text--secondary'>
										{moment(group.next_event.time, 'x').format('dddd, MM/D LT')}
									</div>
								</div>
							}

							{!group.next_event &&
								<div>Next Meetup TBD</div>
							}
						</div>
					</Chunk>
				}
				</div>
		);
	}
}
GroupCard.propTypes = {
	group: React.PropTypes.object.isRequired,
};


/**
 *	SQ2 Group Card component
 *	@see {@link https://github.com/meetup/sassquatch2/blob/develop/sass/ui-components/_card.scss}
 *	@see {@link http://meetup.github.io/sassquatch2/ui_components.html#uiCard}
 *	@module GroupCard
*/
export class GroupCardAlt extends React.Component {
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
			'pseudoLine',
			'inverted',
			className
		);

		const photoUrl = group.duotoneUrl || (group.key_photo || group.group_photo || {}).photo_link;
		const backgroundImage = photoUrl && `url(${photoUrl})`;

		return (
				<Chunk>
					<div className='text--small'>
						{ group.next_event ? <span><span className='text--bold'>moment(group.next_event.time, 'x').format('dddd, MM/D LT')</span> <span className='text--secondary'>moment(group.next_event.time, 'x').format('dddd, MM/D LT')</span></span> : 'Next Meetup TBD'}
					</div>
					<div
						className={cardClassNames}
						style={{ ...(style || {}), backgroundImage }}
						{...other}>

						<div className='card--group-content'>
							<p className='card--group-content-name text--small'>{group.name}</p>
							{group.next_event &&
								<div>
									<h4>{group.next_event.name}</h4>
								</div>
							}
						</div>

					</div>
				</Chunk>
		);
	}
}

GroupCardAlt.propTypes = {
	group: React.PropTypes.object.isRequired,
};

export default GroupCard;
