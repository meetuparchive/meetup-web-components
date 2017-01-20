
import React from 'react';
import Bounds from './Bounds';
import { storiesOf } from '@kadira/storybook';

storiesOf('Bounds', module)
	.add('default', () => (
		<div style={{width: '100%'}}>
			<Bounds>
				<h3 className='text--display2'>Bounds</h3>
				<p>Bounds is used as a non-visual content container that manages content measure and centers children.</p>
			</Bounds>
		</div>
	));
