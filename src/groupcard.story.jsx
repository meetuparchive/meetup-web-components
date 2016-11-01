import React from 'react';
import GroupCard from './GroupCard.jsx';
import { storiesOf } from '@kadira/storybook';
import { MOCK_GROUP } from 'meetup-web-platform/util/mocks/api';

storiesOf('GroupCard', module)
	.add('default', () => (
			<GroupCard group={ MOCK_GROUP } />
		)
	)
	.add('no group photo', () => {
		const testGroup = Object.assign({}, MOCK_GROUP, { group_photo: null, key_photo: null });
		return (<GroupCard group={ testGroup } />);
	})
	.add('long name', () => {
		const testGroup = Object.assign({}, MOCK_GROUP, { name: 'Fake Foreign Androids Feel Forever Frustrated of New York City' });
		return (<GroupCard group={ testGroup } />);
	});
