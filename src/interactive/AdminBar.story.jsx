import React from 'react';
import { storiesOf } from '@storybook/react';
import { MOCK_GROUP } from 'meetup-web-mocks/lib/api';
import { decorateWithBasics } from '../utils/decorators';

import AdminBar from './AdminBar';

storiesOf('AdminBar', module)
	.addDecorator(decorateWithBasics)
	.addWithInfo('default: isAdmin={false}', 'Component is not rendered if props: isAdmin=false', () => (
			<AdminBar isAdmin={false} />
	))
	.addWithInfo('isAdmin', () => (
			<AdminBar group={MOCK_GROUP} isAdmin />
	))
	.addWithInfo('isQL', () => (
			<AdminBar group={MOCK_GROUP} self={{ id: '' }} isAdmin isQL />
	))
	.addWithInfo('isProd', () => (
			<AdminBar group={MOCK_GROUP} self={{ id: '' }} isAdmin isProd />
	))
	.addWithInfo('isProd and isQL', () => (
			<AdminBar group={MOCK_GROUP} self={{ id: '' }} isAdmin isProd isQL />
	));
