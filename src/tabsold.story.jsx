
import React from 'react';
import { Tabs, TabsList, TabsListTab, TabsPanel } from './Tabs';
import { storiesOf } from '@kadira/storybook';
import { Annotate } from './utils/storyComponents';

storiesOf('Tabs', module)
	.add('first selected', () => {
		return (
			<Annotate notes='The `tabsRef` prop of `Tabs` will generate aria attributes'>
				<Tabs tabsRef='fauna'>
					<TabsList>
						<TabsListTab selected>Badger</TabsListTab>
						<TabsListTab>Mushroom</TabsListTab>
						<TabsListTab>Snake</TabsListTab>
					</TabsList>

					<TabsPanel selected>
						<p className='text--bold'>Badger content</p>
					</TabsPanel>
					<TabsPanel>
						<p className='text--bold'>Mushroom content</p>
					</TabsPanel>
					<TabsPanel>
						<p className='text--bold'>Snake content</p>
					</TabsPanel>
				</Tabs>
			</Annotate>
		);
	})
	.add('full width tab control', () => {
		return (
			<Annotate notes='The boolean prop `full` on `TabsList` will make `Tabs` 100% width'>
				<Tabs tabsRef='pets'>
					<TabsList full>
						<TabsListTab selected>Dogs</TabsListTab>
						<TabsListTab>Cats</TabsListTab>
					</TabsList>

					<TabsPanel selected>
						<p className='chunk text--bold'>bark</p>
					</TabsPanel>
					<TabsPanel>
						<p className='text--bold'>meow</p>
					</TabsPanel>
				</Tabs>
			</Annotate>
		);
	});
