import React from 'react';
import { storiesOf } from '@storybook/react';
import Bounds from './Bounds';

storiesOf('Bounds', module)
	.addWithInfo('default', 'By default, `Bounds` is wide', () => (
		<div style={{ width: '100%' }}>
			<Bounds>
				<h3 className="text--sectionTitle">Normal (wide) Bounds</h3>
				<p>
					Bounds is used as a non-visual content container that manages content
					measure and centers children.
				</p>
			</Bounds>
		</div>
	))
	.addWithInfo(
		'narrow',
		'Use the boolean prop `narrow` to create a narrow bounds with a smaller `max-width`',
		() => (
			<div style={{ width: '100%' }}>
				<Bounds narrow>
					<h3 className="text--sectionTitle">Narrow Bounds</h3>
					<p>
						Bounds is used as a non-visual content container that manages
						content measure and centers children.
					</p>
				</Bounds>
			</div>
		)
	)
	.addWithInfo('isLoading', () => (
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
	.addWithInfo('isLoading with loadingProps', () => (
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
