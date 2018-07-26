import React from 'react';
import { storiesOf } from '@storybook/react';
import { decorateWithInfo } from '../utils/decorators';
import Chunk, { ChunkComponent } from './Chunk';

storiesOf('Layout/Chunk', module)
	.addDecorator(decorateWithInfo)
	.addParameters({ info: { propTables: [ChunkComponent], propTablesExclude: [Chunk] } })
	.add(
		'default',
		() => (
			<div style={{ maxWidth: '850px', magin: 'auto' }}>
				<ChunkComponent>
					<h4 className="text--bold">Chunks</h4>
					<p>
						Chunks are used to sub-divide content within a Section by adding
						space to the bottom of an element.
					</p>
				</ChunkComponent>
				<ChunkComponent>
					<h4 className="text--bold">Tuesday, December 20</h4>
					<p>6:00pm</p>
				</ChunkComponent>
				<ChunkComponent>
					<h4 className="text--bold">Galvanize NYC - West SoHo</h4>
					<p>315 Hudson Street · New York, NY</p>
				</ChunkComponent>
				<ChunkComponent>
					<button className="button button--primary" href="#">
						Take action
					</button>
					<p className="text--caption">It'll be super cool</p>
				</ChunkComponent>
			</div>
		),
		{ info: { text: 'This is the basic usage with the component.' } }
	)
	.add('isLoading', () => (
		<div style={{ maxWidth: '850px', magin: 'auto' }}>
			<Chunk isLoading>
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
				isLoading
				loadingProps={{
					color: 'red',
					scrimColor: 'rgba(250, 250, 255, 0.8)',
					size: '64px',
				}}
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
