import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Annotate } from './utils/storyComponents';
import { decorateWithLocale } from './utils/decorators';
import Tabs from './Tabs';
import TabsTab from './TabsTab';

storiesOf('Tabs', module)
	.addDecorator(decorateWithLocale)
	.add('default', () => {
		return (
			<Tabs>
				<TabsTab
					isActive
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
	})
	.add('Bordered tabs', () => {
		return (
			<Annotate notes='For bordered tabs, add the boolean prop `bordered` to `Tabs`'>
				<Tabs bordered>
					<TabsTab
						isActive
						url='/foo'
						label='First Tab' />
					<TabsTab
						url='/bar'
						label='Second Tab' />
					<TabsTab
						url='/bar'
						label='Third Tab' />
				</Tabs>
			</Annotate>
		);
	})
	.add('Full width tabs', () => {
		return (
			<Annotate notes='For full-width tabs, add the boolean prop `full` to `Tabs`'>
				<Tabs full>
					<TabsTab
						isActive
						url='/foo'
						label='First Tab' />
					<TabsTab
						url='/bar'
						label='Second Tab' />
					<TabsTab
						url='/bar'
						label='Third Tab' />
				</Tabs>
			</Annotate>
		);
	});
