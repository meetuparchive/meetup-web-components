import React from 'react';
import InlineBlockList from './InlineBlockList';
import { storiesOf } from '@kadira/storybook';
import { InfoWrapper } from './utils/storyComponents';

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
			<InlineBlockList
				style={{padding: '20px'}}
				items={basicItems}
			/>
		</InfoWrapper>
	))
	.addWithInfo(
		'with separator',
		'Basic usage of InlineBlockList with a middot between items',
		() => (
		<InfoWrapper>
			<InlineBlockList
				style={{padding: '20px'}}
				items={basicItems}
				separator='·'
			/>
		</InfoWrapper>
	))
	.addWithInfo(
		'using elements',
		'InlineBlockList using elements as items',
		() => (
		<InfoWrapper>
			<InlineBlockList
				style={{padding: '20px'}}
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
		</InfoWrapper>
	));
