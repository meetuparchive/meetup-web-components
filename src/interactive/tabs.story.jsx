import React from 'react';
import { storiesOf } from '@storybook/react';
import { InfoWrapper, StoryLink } from '../utils/storyComponents';
import { decorateWithLocale } from '../utils/decorators';
import { Tabs, TabsTab } from './Tabs';

storiesOf('Tabs', module)
	.addDecorator(decorateWithLocale)
	.addWithInfo('default', 'This is the basic usage with the component.', () => (
		<InfoWrapper>
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
		</InfoWrapper>
	))
	.addWithInfo('Tabs without btm border', () => {
		return (
			<InfoWrapper>
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
			</InfoWrapper>
		);
	})
	.addWithInfo('Full width tabs', () => {
		return (
			<InfoWrapper>
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
			</InfoWrapper>
		);
	});
