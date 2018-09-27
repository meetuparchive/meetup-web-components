import React from 'react';
import { storiesOf } from '@storybook/react';
import Chunk, { ChunkComponent } from './Chunk';
import { withKnobs, boolean, text, object } from '@storybook/addon-knobs';

import { withInfo } from '@storybook/addon-info';
import { C_COOLGRAYMEDIUM } from 'swarm-constants/dist/js/constants';
import { MEDIA_SIZES } from '../utils/designConstants';

storiesOf('Layout/Chunk', module)
	.addDecorator(withInfo)
	.addDecorator(withKnobs)
	.addParameters({ info: { propTables: [ChunkComponent] } })
	.add(
		'default',
		() => (
			<div style={{ maxWidth: '850px', magin: 'auto' }}>
				<Chunk
					isLoading={boolean('isLoading', false)}
					loadingProps={object('loadingProps', {
						color: C_COOLGRAYMEDIUM,
						size: `${MEDIA_SIZES.l}px`,
					})}
				>
					<h4 className="text--bold">Chunks</h4>
					<p>
						Chunks are used to sub-divide content within a Section by adding
						space to the bottom of an element.
					</p>
				</Chunk>
				<Chunk>
					<h4 className="text--bold">Tuesday, December 20</h4>
					<p>6:00pm</p>
				</Chunk>
				<Chunk>
					<h4 className="text--bold">Galvanize NYC - West SoHo</h4>
					<p>315 Hudson Street · New York, NY</p>
				</Chunk>
				<Chunk>
					<button className="button button--primary" href="#">
						Take action
					</button>
					<p className="text--caption">
						{text('demoContent', "It'll be super cool")}
					</p>
				</Chunk>
			</div>
		),
		{ info: { text: 'This is the basic usage with the component.' } }
	)
	.add('isLoading', () => (
		<div style={{ maxWidth: '850px', magin: 'auto' }}>
			<Chunk isLoading={boolean('isLoading', true)}>
				<h4 className="text--bold">This Chunk is loading</h4>
				<p>
					Chunks are used to sub-divide content within a Section by adding space
					to the bottom of an element.
				</p>
			</Chunk>
			<Chunk>
				<h4 className="text--bold">Tuesday, December 20</h4>
				<p>6:00pm</p>
			</Chunk>
			<Chunk>
				<h4 className="text--bold">Galvanize NYC - West SoHo</h4>
				<p>315 Hudson Street · New York, NY</p>
			</Chunk>
			<Chunk>
				<button className="button button--primary" href="#">
					Take action
				</button>
				<p className="text--caption">It'll be super cool</p>
			</Chunk>
		</div>
	))
	.add('isLoading with loadingProps', () => (
		<div style={{ maxWidth: '850px', magin: 'auto' }}>
			<Chunk
				isLoading={boolean('isLoading', true)}
				loadingProps={object('loadingProps', {
					color: 'red',
					scrimColor: 'rgba(250, 250, 255, 0.8)',
					size: '64px',
				})}
			>
				<h4 className="text--bold">This Chunk is loading</h4>
				<p>
					Chunks are used to sub-divide content within a Section by adding space
					to the bottom of an element.
				</p>
			</Chunk>
			<Chunk>
				<h4 className="text--bold">Tuesday, December 20</h4>
				<p>6:00pm</p>
			</Chunk>
			<Chunk>
				<h4 className="text--bold">Galvanize NYC - West SoHo</h4>
				<p>315 Hudson Street · New York, NY</p>
			</Chunk>
			<Chunk>
				<button className="button button--primary" href="#">
					Take action
				</button>
				<p className="text--caption">It'll be super cool</p>
			</Chunk>
		</div>
	));
