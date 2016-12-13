import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { locale } from './utils/decorators';
import { Tabs, TabsTab } from './Tabs';

storiesOf('Tabs', module)
	.addDecorator(locale)
	.add('default', () => {
		return (
			<Tabs>
				<TabsTab isActive
					url='/foo'
					label='First Tab' />
				<TabsTab
					url='/bar'
					label='Second Tab' />
				<TabsTab
					url='/bar'
					label='Third Tab' />
			</Tabs>
		);
	});
