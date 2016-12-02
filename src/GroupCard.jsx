import React from 'react';
import cx from 'classnames';
// import { Link } from 'react-router';
import moment from 'moment';

import {
//	FormattedDate,
//	FormattedMessage,
//	defineMessages
} from 'react-intl';

import {
	Chunk,
	Flex,
	FlexItem,
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
			'card--groupAlt',
			'padding--none',
			'text--bodySize',
			className
		);

		const photoUrl = group.duotoneUrl || (group.key_photo || group.group_photo || {}).photo_link;
		const backgroundImage = photoUrl && `url(${photoUrl})`;

		return (
				<div
					className={cardClassNames}
					style={{ ...(style || {})}}
					{...other}>

					<Flex direction='column' style={{height: '100%'}}>
						<FlexItem growFactor={4}>
							{ group.next_event &&
								<div className='padding--all'>
									<p>
										<span className='text--bold'>{moment(group.next_event.time, 'x').format('dddd')}</span>
										<span className='text--secondary'> {moment(group.next_event.time, 'x').format('LT')}</span>
									</p>
									<p className='lineClamp'>
										{group.next_event.name}
									</p>
								</div>
							}
						</FlexItem>
						<FlexItem growFactor={6}
							style={{
								backgroundImage,
								backgroundPosition: 'center center',
								backgroundSize: 'cover'
							}}
							className=''
							>
							<Flex direction='column' style={{height: '100%'}} justify='flexEnd'>
								<FlexItem className='align--right' shrink style={{width: '100%'}}>
									<div className='inverted padding--all'>
										<h4>{group.name}</h4>
									</div>
								</FlexItem>
							</Flex>
						</FlexItem>
					</Flex>
				</div>
		);
	}
}
GroupCardAlt.propTypes = {
	group: React.PropTypes.object.isRequired,
};

export default GroupCard;
