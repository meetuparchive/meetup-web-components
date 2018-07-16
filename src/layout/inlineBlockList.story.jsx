import React from 'react';
import { decorateWithInfo } from '../utils/decorators';
import { storiesOf } from '@storybook/react';
import Bounds from '../layout/Bounds';
import Section from '../layout/Section';
import Chunk from '../layout/Chunk';
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
	.addDecorator(decorateWithInfo)
	.add(
		'default',
		() => (
			<Bounds>
				<Section>
					<InlineBlockList items={basicItems} />
				</Section>
			</Bounds>
		),
		{ info: { text: 'Basic usage of InlineBlockList' } }
	)
	.add(
		'with separator',
		() => (
			<Bounds>
				<Section>
					<InlineBlockList items={basicItems} separator="·" />
				</Section>
				<Section>
					<InlineBlockList
						items={['any', 'glyph', 'will', 'work']}
						separator="👏"
					/>
				</Section>
			</Bounds>
		),
		{ info: { text: 'Basic usage of InlineBlockList with a middot between items' } }
	)
	.add(
		'using elements',
		() => (
			<Bounds>
				<Section>
					<InlineBlockList
						items={[
							<img
								src="https://placekitten.com/g/72/72"
								alt="fluffy kitten"
							/>,
							<img
								src="https://placekitten.com/g/72/72"
								alt="fluffy kitten"
							/>,
							<img
								src="https://placekitten.com/g/72/72"
								alt="fluffy kitten"
							/>,
							<img
								src="https://placekitten.com/g/72/72"
								alt="fluffy kitten"
							/>,
							<img
								src="https://placekitten.com/g/72/72"
								alt="fluffy kitten"
							/>,
							<img
								src="https://placekitten.com/g/72/72"
								alt="fluffy kitten"
							/>,
							<img
								src="https://placekitten.com/g/72/72"
								alt="fluffy kitten"
							/>,
						]}
					/>
				</Section>
			</Bounds>
		),
		{ info: { text: 'InlineBlockList using elements as items' } }
	)
	.add('isLoading', () => (
		<Bounds>
			<Section>
				<InlineBlockList isLoading items={basicItems} />
			</Section>
		</Bounds>
	))
	.add('isLoading with loadingProps', () => (
		<Bounds>
			<Section>
				<InlineBlockList
					isLoading
					loadingProps={{
						color: 'red',
						scrimColor: 'rgba(250, 250, 255, 0.8)',
						size: '64px',
					}}
					items={basicItems}
				/>
			</Section>
		</Bounds>
	))
	.add(
		'vertical alignment',
		() => (
			<Bounds>
				<Section>
					<Chunk>
						<InlineBlockList
							verticalAlign="top"
							items={[
								<code>verticalAlign="top"</code>,
								<img
									src="https://placeimg.com/80/120/animals"
									alt="animal"
								/>,
								<img
									src="https://placeimg.com/60/60/animals"
									alt="animal"
								/>,
								<img
									src="https://placeimg.com/80/120/animals"
									alt="animal"
								/>,
								<img
									src="https://placeimg.com/60/60/animals"
									alt="animal"
								/>,
							]}
						/>
					</Chunk>
					<Chunk>
						<InlineBlockList
							verticalAlign="middle"
							items={[
								<code>verticalAlign="middle"</code>,
								<img
									src="https://placeimg.com/80/120/animals"
									alt="animal"
								/>,
								<img
									src="https://placeimg.com/60/60/animals"
									alt="animal"
								/>,
								<img
									src="https://placeimg.com/80/120/animals"
									alt="animal"
								/>,
								<img
									src="https://placeimg.com/60/60/animals"
									alt="animal"
								/>,
							]}
						/>
					</Chunk>
					<Chunk>
						<InlineBlockList
							verticalAlign="bottom"
							items={[
								<code>verticalAlign="bottom"</code>,
								<img
									src="https://placeimg.com/80/120/animals"
									alt="animal"
								/>,
								<img
									src="https://placeimg.com/60/60/animals"
									alt="animal"
								/>,
								<img
									src="https://placeimg.com/80/120/animals"
									alt="animal"
								/>,
								<img
									src="https://placeimg.com/60/60/animals"
									alt="animal"
								/>,
							]}
						/>
					</Chunk>
				</Section>
			</Bounds>
		),
		{ info: { text: 'Elements as items; using `verticalAlign` prop' } }
	);
