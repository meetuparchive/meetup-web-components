import React from 'react';
import { storiesOf } from '@storybook/react';
import { MOCK_GROUP } from 'meetup-web-mocks/lib/api';
import { decorateWithBasics } from '../utils/decorators';

import AdminBar from './AdminBar';

storiesOf('AdminBar', module)
	.addDecorator(decorateWithBasics)
	.addWithInfo(
		'default: isAdmin={false}',
		'Component is not rendered if props: isAdmin=false',
		() => <AdminBar isAdmin={false} />
	)
	.addWithInfo('isAdmin', () => <AdminBar group={MOCK_GROUP} isAdmin />)
	.addWithInfo('isQL', () => (
		<AdminBar group={MOCK_GROUP} self={{ id: '' }} isAdmin isQL />
	))
	.addWithInfo('isProdApi', () => (
		<AdminBar group={MOCK_GROUP} self={{ id: '' }} isAdmin isProdApi />
	))
	.addWithInfo('isProdApi and isQL', () => (
		<AdminBar group={MOCK_GROUP} self={{ id: '' }} isAdmin isProdApi isQL />
	))
	.addWithInfo('group is the optional param', () => (
		<AdminBar self={{ id: '' }} isAdmin isProdApi isQL />
	))
	.addWithInfo('when QL on dev the bar color is green', () => (
		<AdminBar self={{ id: '' }} isAdmin isQL />
	))
	.addWithInfo('when QL on prod the bar color is red', () => (
		<AdminBar self={{ id: '' }} isAdmin isProdApi isQL />
	));
