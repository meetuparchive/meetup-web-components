import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { InfoWrapper } from './utils/storyComponents';
import { MOCK_GROUP } from 'meetup-web-mocks/lib/api';
import GroupCard from './GroupCard.jsx';
import Icon from './Icon.jsx';
import { decorateWithLocale } from './utils/decorators';

storiesOf('GroupCard', module)
	.addDecorator(decorateWithLocale)
	.addWithInfo(
		'default',
		'This is the basic usage with the component.',
		() => (
			<InfoWrapper>
				<GroupCard group={ MOCK_GROUP } />
			</InfoWrapper>
		)
	)
	.add('no group photo', () => {
		const testGroup = Object.assign({}, MOCK_GROUP, { group_photo: null, key_photo: null });
		return (<GroupCard group={ testGroup } />);
	})
	.add('long name', () => {
		const testGroup = Object.assign({}, MOCK_GROUP, { name: 'Fake Foreign Androids Feel Forever Frustrated of New York City' });
		return (<GroupCard group={ testGroup } />);
	})
	.add('with action', () => {
		const testGroup = Object.assign({}, MOCK_GROUP, { name: 'Fake Foreign Androids Feel Forever Frustrated of New York City' });
		return (
			<GroupCard
				group={ testGroup }
				action={(
					<Icon shape='heart-outline' size='s' />
				)}
			/>
		);
	});
