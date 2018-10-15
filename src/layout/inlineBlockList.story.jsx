import React from 'react';

import { withKnobs, boolean, object, select, text } from '@storybook/addon-knobs';

import { withInfo } from '@storybook/addon-info';
import { storiesOf } from '@storybook/react';
import Bounds from '../layout/Bounds';
import Section from '../layout/Section';
import Chunk from '../layout/Chunk';
import InlineBlockList, { InlineBlockListComponent } from './InlineBlockList';
import { C_COOLGRAYMEDIUM } from 'swarm-constants/dist/js/constants';
import { MEDIA_SIZES } from '../utils/designConstants';

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

storiesOf('Layout/InlineBlockList', module)
	.addDecorator(withInfo)
	.addDecorator(withKnobs)
	.add(
		'default',
		() => (
			<Bounds>
				<Section>
					<InlineBlockList
						separator={text('separator', undefined)}
						className={text('className', undefined)}
						verticalAlign={select(
							'verticalAlign',
							['top', 'middle', 'bottom'],
							undefined
						)}
						isLoading={boolean('isLoading', false)}
						loadingProps={object('loadingProps', {
							color: C_COOLGRAYMEDIUM,
							size: `${MEDIA_SIZES.l}px`,
						})}
						items={basicItems}
					/>
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
					<InlineBlockListComponent
						items={basicItems}
						separator={text('separator', '.')}
						className={text('className', undefined)}
						verticalAlign={select(
							'verticalAlign',
							['top', 'middle', 'bottom'],
							undefined
						)}
						isLoading={boolean('isLoading', false)}
						loadingProps={object('loadingProps', {
							color: C_COOLGRAYMEDIUM,
							size: `${MEDIA_SIZES.l}px`,
						})}
					/>
				</Section>
				<Section>
					<InlineBlockListComponent
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
						separator={text('separator', undefined)}
						className={text('className', undefined)}
						verticalAlign={select(
							'verticalAlign',
							['top', 'middle', 'bottom'],
							undefined
						)}
						isLoading={boolean('isLoading', false)}
						loadingProps={object('loadingProps', {
							color: C_COOLGRAYMEDIUM,
							size: `${MEDIA_SIZES.l}px`,
						})}
					/>
				</Section>
			</Bounds>
		),
		{ info: { text: 'InlineBlockList using elements as items' } }
	)
	.add('isLoading', () => (
		<Bounds>
			<Section>
				<InlineBlockList
					separator={text('separator', undefined)}
					className={text('className', undefined)}
					verticalAlign={select(
						'verticalAlign',
						['top', 'middle', 'bottom'],
						undefined
					)}
					isLoading={boolean('isLoading', true)}
					loadingProps={object('loadingProps', {
						color: C_COOLGRAYMEDIUM,
						size: `${MEDIA_SIZES.l}px`,
					})}
					items={basicItems}
				/>
			</Section>
		</Bounds>
	))
	.add('isLoading with loadingProps', () => (
		<Bounds>
			<Section>
				<InlineBlockList
					separator={text('separator', undefined)}
					className={text('className', undefined)}
					verticalAlign={select(
						'verticalAlign',
						['top', 'middle', 'bottom'],
						undefined
					)}
					isLoading={boolean('isLoading', false)}
					loadingProps={object('loadingProps', {
						color: 'red',
						scrimColor: 'rgba(250, 250, 255, 0.8)',
						size: '64px',
					})}
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
							separator={text('separator', undefined)}
							className={text('className', undefined)}
							verticalAlign={select(
								'verticalAlign',
								['top', 'middle', 'bottom'],
								'top'
							)}
							isLoading={boolean('isLoading', false)}
							loadingProps={object('loadingProps', {
								color: C_COOLGRAYMEDIUM,
								size: `${MEDIA_SIZES.l}px`,
							})}
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
