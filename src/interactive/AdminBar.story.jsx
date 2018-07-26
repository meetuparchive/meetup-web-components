import React from 'react';
import { storiesOf } from '@storybook/react';
import { MOCK_GROUP } from 'meetup-web-mocks/lib/api';
import { decorateWithBasics, decorateWithInfo } from '../utils/decorators';

import AdminBar from './AdminBar';

storiesOf('Interactive/AdminBar', module)
	.addDecorator(decorateWithBasics)
	.addDecorator(decorateWithInfo)
	.add(
		'default: isAdmin={false} prod environment',
		() => <AdminBar nodeEnv="production" />,
		{
			info: {
				text:
					'Component is not rendered if props: isAdmin=false, nodeEnv=production',
			},
		}
	)
	.add('isAdmin and prod environment', () => (
		<AdminBar nodeEnv="production" group={MOCK_GROUP} isAdmin />
	))
	.add('isQL', () => <AdminBar group={MOCK_GROUP} self={{ id: '' }} isAdmin isQL />)
	.add('isProdApi', () => (
		<AdminBar group={MOCK_GROUP} self={{ id: '' }} isAdmin isProdApi />
	))
	.add('isProdApi and isQL', () => (
		<AdminBar group={MOCK_GROUP} self={{ id: '' }} isAdmin isProdApi isQL />
	))
	.add('isQL and prod environment', () => (
		<AdminBar group={MOCK_GROUP} self={{ id: '' }} isAdmin isQL />
	))
	.add('isProdApi and isAdmin=false on dev env', () => (
		<AdminBar self={{ id: '' }} isProdApi nodeEnv="development" />
	))
	.add('isProdApi and isAdmin=false on prod env', () => (
		<AdminBar self={{ id: '' }} isProdApi nodeEnv="production" />
	))
	.add('group is the optional param', () => (
		<AdminBar self={{ id: '' }} isAdmin isProdApi isQL />
	))
	.add('when QL on dev the bar color is green', () => (
		<AdminBar self={{ id: '' }} isAdmin isQL />
	))
	.add('when QL on prod the bar color is red', () => (
		<AdminBar self={{ id: '' }} isAdmin isProdApi isQL />
	));
