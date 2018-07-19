import React from 'react';
import { storiesOf } from '@storybook/react';
import { decorateWithBasics, decorateWithInfo } from '../utils/decorators';
import { StoryLink } from '../utils/storyComponents';
import { Tabs, TabsTab } from './Tabs';

storiesOf('Tabs', module)
	.addDecorator(decorateWithBasics)
	.addDecorator(decorateWithInfo)
	.addParameters({ info: { propTablesExclude: [StoryLink] } })
	.add(
		'default',
		() => (
			<Tabs>
				<TabsTab>
					<StoryLink>First tab</StoryLink>
				</TabsTab>
				<TabsTab isSelected>
					<StoryLink>Second tab</StoryLink>
				</TabsTab>
				<TabsTab>
					<StoryLink>Third tab</StoryLink>
				</TabsTab>
			</Tabs>
		),
		{ info: { text: 'This is the basic usage with the component.' } }
	)
	.add('Tabs without btm border', () => {
		return (
			<Tabs noBorder>
				<TabsTab isSelected>
					<StoryLink>First tab</StoryLink>
				</TabsTab>
				<TabsTab>
					<StoryLink>Second tab</StoryLink>
				</TabsTab>
				<TabsTab>
					<StoryLink>Third tab</StoryLink>
				</TabsTab>
			</Tabs>
		);
	})
	.add('Full width tabs', () => {
		return (
			<Tabs full>
				<TabsTab>
					<StoryLink>First tab</StoryLink>
				</TabsTab>
				<TabsTab>
					<StoryLink>Second tab</StoryLink>
				</TabsTab>
				<TabsTab isSelected>
					<StoryLink>Third tab</StoryLink>
				</TabsTab>
			</Tabs>
		);
	})
	.add('Vertical tabs', () => {
		return (
			<Tabs isVertical>
				<TabsTab isSelected>
					<StoryLink>First tab</StoryLink>
				</TabsTab>
				<TabsTab>
					<StoryLink>Second tab</StoryLink>
				</TabsTab>
				<TabsTab>
					<StoryLink>Third tab</StoryLink>
				</TabsTab>
			</Tabs>
		);
	});
