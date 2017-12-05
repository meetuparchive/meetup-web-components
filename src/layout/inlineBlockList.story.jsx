import React from 'react';
import { storiesOf } from '@storybook/react';
import Bounds from '../layout/Bounds';
import Section from '../layout/Section';
import InlineBlockList from './InlineBlockList';

const basicItems = [
	'English',
	'English (Australian)',
	'Deutsch',
	'Español',
	'Español (España)',
	'Français',
	'Italiano',
	'Nederlands',
	'Português',
	'日本語',
	'한국어',
];

storiesOf('InlineBlockList', module)
	.addWithInfo(
		'default',
		'Basic usage of InlineBlockList',
		() => (
			<Bounds><Section>
				<InlineBlockList
					items={basicItems}
				/>
			</Section></Bounds>
		))
	.addWithInfo(
		'with separator',
		'Basic usage of InlineBlockList with a middot between items',
		() => (
			<Bounds>
				<Section>
					<InlineBlockList
						items={basicItems}
						separator='·'
					/>
				</Section>
				<Section>
					<InlineBlockList
						items={['any', 'glyph', 'will', 'work']}
						separator='👏'
					/>
				</Section>
			</Bounds>
		))
	.addWithInfo(
		'using elements',
		'InlineBlockList using elements as items',
		() => (
			<Bounds><Section>
				<InlineBlockList
					items={[
						<img src='https://placekitten.com/g/72/72' alt='fluffy kitten' />,
						<img src='https://placekitten.com/g/72/72' alt='fluffy kitten' />,
						<img src='https://placekitten.com/g/72/72' alt='fluffy kitten' />,
						<img src='https://placekitten.com/g/72/72' alt='fluffy kitten' />,
						<img src='https://placekitten.com/g/72/72' alt='fluffy kitten' />,
						<img src='https://placekitten.com/g/72/72' alt='fluffy kitten' />,
						<img src='https://placekitten.com/g/72/72' alt='fluffy kitten' />,
					]}
				/>
			</Section></Bounds>
		));
