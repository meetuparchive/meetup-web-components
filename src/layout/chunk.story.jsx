import React from 'react';
import { storiesOf } from '@storybook/react';
import { InfoWrapper } from '../utils/storyComponents';
import Chunk from './Chunk';

storiesOf('Chunk', module)
	.addWithInfo(
		'default',
		'This is the basic usage with the component.',
		() => (
			<InfoWrapper>
				<div style={{maxWidth: '850px', magin:'auto'}}>
					<Chunk>
						<h4 className='text--bold'>Chunks</h4>
						<p>Chunks are used to sub-divide content within a Section by adding space to the bottom of an element.</p>
					</Chunk>
					<Chunk>
						<h4 className='text--bold'>Tuesday, December 20</h4>
						<p>6:00pm</p>
					</Chunk>
					<Chunk>
						<h4 className='text--bold'>Galvanize NYC - West SoHo</h4>
						<p>315 Hudson Street · New York, NY</p>
					</Chunk>
					<Chunk>
						<button className='button button--primary' href='#'>Take action</button>
						<p className='text--caption'>It'll be super cool</p>
					</Chunk>
				</div>
			</InfoWrapper>
		)
	);
