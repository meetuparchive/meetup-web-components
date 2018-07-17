import React from 'react';
import { storiesOf } from '@storybook/react';
import { decorateWithInfo } from '../utils/decorators';
import Bounds, { BoundsComponent } from './Bounds';

storiesOf('Bounds', module)
	.addDecorator(decorateWithInfo)
	.addParameters({ info: { propTables: [BoundsComponent] } })
	.add(
		'default',
		() => (
			<div style={{ width: '100%' }}>
				<BoundsComponent>
					<h3 className="text--sectionTitle">Normal (wide) Bounds</h3>
					<p>
						Bounds is used as a non-visual content container that manages
						content measure and centers children.
					</p>
				</BoundsComponent>
			</div>
		),
		{ info: { text: 'By default, `Bounds` is wide' } }
	)
	.add(
		'narrow',
		() => (
			<div style={{ width: '100%' }}>
				<BoundsComponent narrow>
					<h3 className="text--sectionTitle">Narrow Bounds</h3>
					<p>
						Bounds is used as a non-visual content container that manages
						content measure and centers children.
					</p>
				</BoundsComponent>
			</div>
		),
		{
			info: {
				text:
					'Use the boolean prop `narrow` to create a narrow bounds with a smaller `max-width`',
			},
		}
	)
	.add('isLoading', () => (
		<div style={{ width: '100%' }}>
			<Bounds isLoading>
				<h3 className="text--sectionTitle">Loading Bounds</h3>
				<p>
					Bounds is used as a non-visual content container that manages content
					measure and centers children.
				</p>
				<p>
					Bounds is used as a non-visual content container that manages content
					measure and centers children.
				</p>
			</Bounds>
		</div>
	))
	.add('isLoading with loadingProps', () => (
		<div style={{ width: '100%' }}>
			<Bounds
				isLoading
				loadingProps={{
					color: 'red',
					scrimColor: 'rgba(250, 250, 255, 0.8)',
					size: '96px',
				}}
			>
				<h3 className="text--sectionTitle">Loading Bounds</h3>
				<p>
					Bounds is used as a non-visual content container that manages content
					measure and centers children.
				</p>
				<p>
					Bounds is used as a non-visual content container that manages content
					measure and centers children.
				</p>
			</Bounds>
		</div>
	));
