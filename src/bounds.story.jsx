import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { InfoWrapper } from './utils/storyComponents';
import Bounds from './Bounds';

storiesOf('Bounds', module)
	.addWithInfo(
		'default',
		'This is the basic usage with the component.',
		() => (
			<InfoWrapper>
				<div style={{width: '100%'}}>
					<Bounds>
						<h3 className='text--display2'>Bounds</h3>
						<p>Bounds is used as a non-visual content container that manages content measure and centers children.</p>
					</Bounds>
				</div>
			</InfoWrapper>
		)
	);
