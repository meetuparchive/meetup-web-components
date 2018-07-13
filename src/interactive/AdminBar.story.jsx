import React from 'react';
import { storiesOf } from '@storybook/react';
import { MOCK_GROUP } from 'meetup-web-mocks/lib/api';
import { decorateWithBasics, decorateWithInfo } from '../utils/decorators';

import AdminBar from './AdminBar';

storiesOf('AdminBar', module)
	.addDecorator(decorateWithBasics)
	.addDecorator(decorateWithInfo)
	.add('default: isAdmin={false}', () => <AdminBar isAdmin={false} />, {
		info: { text: 'Component is not rendered if props: isAdmin=false' },
	})
	.add('isAdmin', () => <AdminBar group={MOCK_GROUP} isAdmin />)
	.add('isQL', () => <AdminBar group={MOCK_GROUP} self={{ id: '' }} isAdmin isQL />)
	.add('isProdApi', () => (
		<AdminBar group={MOCK_GROUP} self={{ id: '' }} isAdmin isProdApi />
	))
	.add('isProdApi and isQL', () => (
		<AdminBar group={MOCK_GROUP} self={{ id: '' }} isAdmin isProdApi isQL />
	));
