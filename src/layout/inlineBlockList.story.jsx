import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { InfoWrapper } from '../utils/storyComponents';
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
		<InfoWrapper>
			<Bounds><Section>
				<InlineBlockList
					items={basicItems}
				/>
			</Section></Bounds>
		</InfoWrapper>
	))
	.addWithInfo(
		'with separator',
		'Basic usage of InlineBlockList with a middot between items',
		() => (
		<InfoWrapper>
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

		</InfoWrapper>
	))
	.addWithInfo(
		'using elements',
		'InlineBlockList using elements as items',
		() => (
		<InfoWrapper>
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
		</InfoWrapper>
	));
