
import React from 'react';
import { Tabs, TabsList, TabsListTab, TabsPanel } from './Tabs';
import { storiesOf } from '@kadira/storybook';
import { Annotate } from './utils/storyComponents';

storiesOf('Tabs', module)
	.add('first selected', () => {
		return (
			<Tabs>
				<TabsList>
					<TabsListTab
						ariaControls='badgerPanel'
						id='badgerTab'
						selected>
						Badger
					</TabsListTab>
					<TabsListTab
						ariaControls='shroomPanel'
						id='shroomTab'>
						Mushroom
					</TabsListTab>
					<TabsListTab
						ariaControls='snakePanel'
						id='snakeTab'>
						Snake
					</TabsListTab>
				</TabsList>

				<TabsPanel
					ariaLabelledBy='badgerTab'
					id='badgerPanel'
					selected>
					<p className='text--bold'>Badger content</p>
				</TabsPanel>
				<TabsPanel
					ariaLabelledBy='shroomTab'
					id='shroomPanel'>
					<p className='text--bold'>Mushroom content</p>
				</TabsPanel>
				<TabsPanel
					ariaLabelledBy='snakeTab'
					id='snakePanel'>
					<p className='text--bold'>Snake content</p>
				</TabsPanel>
			</Tabs>
		);
	})
	.add('full width tab control', () => {
		return (
		<Annotate notes='The boolean prop `full` on `TabsList` will make `Tabs` 100% width'>
			<Tabs>
				<TabsList full>
					<TabsListTab
						id='dogTab'
						ariaControls='dogPanel'
						selected>
						Dogs
					</TabsListTab>
					<TabsListTab
						id='catTab'
						ariaControls='catPanel'>
						Cats
					</TabsListTab>
				</TabsList>

				<TabsPanel
					id='dogPanel'
					ariaLabelledBy='dogTab'
					selected>
					<p className='chunk text--bold'>bark</p>
				</TabsPanel>
				<TabsPanel
					id='catPanel'
					ariaLabelledBy='catTab'>
					<p className='text--bold'>meow</p>
				</TabsPanel>
			</Tabs>
		</Annotate>
		);
	});
