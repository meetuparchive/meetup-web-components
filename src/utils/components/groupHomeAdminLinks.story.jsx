import React from 'react';
import { storiesOf } from '@storybook/react';
import { MOCK_GROUP } from 'meetup-web-mocks/lib/api';

import GroupHomeAdminLinks from './GroupHomeAdminLinks';

storiesOf('GroupHomeAdminLinks', module)
	.add('default: isAdmin={false}', () => (
		<div>
			<GroupHomeAdminLinks isAdmin={false} />
			<p>Component is not rendered if props: isAdmin=false</p>
		</div>
	))
	.add('isAdmin', () => (
		<div>
			<GroupHomeAdminLinks group={MOCK_GROUP} isAdmin />
			<p>Props: isAdmin, group</p>
		</div>
	))
	.add('isQL', () => (
		<div>
			<GroupHomeAdminLinks group={MOCK_GROUP} self={{ id: '' }} isAdmin isQL />
			<p>Props: isAdmin, isQL, group, self</p>
		</div>
	))
	.add('isProd', () => (
		<div>
			<GroupHomeAdminLinks group={MOCK_GROUP} self={{ id: '' }} isAdmin isProd />
			<p>Props: isProd, isAdmin, group, self</p>
		</div>
	))
	.add('isProd and isQL', () => (
		<div>
			<GroupHomeAdminLinks
				group={MOCK_GROUP}
				self={{ id: '' }}
				isAdmin
				isProd
				isQL
			/>
			<p>Props: isProd, isQL, isAdmin, group, self</p>
		</div>
	));
