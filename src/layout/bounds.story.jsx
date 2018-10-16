import React from 'react';
import { storiesOf } from '@storybook/react';
import Bounds, { BoundsComponent } from './Bounds';
import { withKnobs, object, boolean } from '@storybook/addon-knobs';

import { withInfo } from '@storybook/addon-info';
import { MEDIA_SIZES } from '../utils/designConstants';
import { C_COOLGRAYMEDIUM } from 'swarm-constants/dist/js/constants';

storiesOf('Layout/Bounds', module)
	.addDecorator(withInfo)
	.addDecorator(withKnobs)
	.addParameters({
		info: { propTables: [BoundsComponent] },
	})
	.add(
		'default',
		() => (
			<div style={{ width: '100%' }}>
				<Bounds
					narrow={boolean('narrow', false)}
					isLoading={boolean('isLoading', false)}
					loadingProps={object('loadingProps', {
						color: C_COOLGRAYMEDIUM,
						size: `${MEDIA_SIZES.l}px`,
					})}
				>
					<h3 className="text--sectionTitle">Normal (wide) Bounds</h3>
					<p>
						Bounds is used as a non-visual content container that manages
						content measure and centers children.
					</p>
				</Bounds>
			</div>
		),
		{ info: { text: 'By default, `Bounds` takes up 100% of its parent.' } }
	)
	.add(
		'narrow',
		() => (
			<div style={{ width: '100%' }}>
				<Bounds
					narrow={boolean('narrow', true)}
					isLoading={boolean('isLoading', false)}
					loadingProps={object('loadingProps', {
						color: C_COOLGRAYMEDIUM,
						size: `${MEDIA_SIZES.l}px`,
					})}
				>
					<h3 className="text--sectionTitle">Narrow Bounds</h3>
					<p>
						Bounds is used as a non-visual content container that manages
						content measure and centers children.
					</p>
				</Bounds>
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
			<Bounds
				narrow={boolean('narrow', false)}
				isLoading={boolean('isLoading', true)}
				loadingProps={object('loadingProps', {
					color: C_COOLGRAYMEDIUM,
					size: `${MEDIA_SIZES.l}px`,
				})}
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
	))
	.add(
		'isLoading with loadingProps',
		() => (
			<div style={{ width: '100%' }}>
				<Bounds
					narrow={boolean('narrow', true)}
					isLoading={boolean('isLoading', true)}
					loadingProps={object('loadingProps', {
						color: 'red',
						scrimColor: 'rgba(250, 250, 255, 0.8)',
						size: '96px',
					})}
				>
					<h3 className="text--sectionTitle">Loading Bounds</h3>
					<p>
						Bounds is used as a non-visual content container that manages
						content measure and centers children.
					</p>
					<p>
						Bounds is used as a non-visual content container that manages
						content measure and centers children.
					</p>
				</Bounds>
			</div>
		),
		{
			info: {
				text:
					'Use the object prop `loadingProps` to pass down different props to the `<Loading /> component.',
			},
		}
	);
