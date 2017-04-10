import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { InfoWrapper } from '../utils/storyComponents';
import Bounds from './Bounds';

storiesOf('Bounds', module)
	.addWithInfo(
		'default',
		'By default, `Bounds` is wide',
		() => (
			<InfoWrapper>
				<div style={{width: '100%'}}>
					<Bounds>
						<h3 className='text--display2'>Normal (wide) Bounds</h3>
						<p>Bounds is used as a non-visual content container that manages content measure and centers children.</p>
					</Bounds>
				</div>
			</InfoWrapper>
		)
	)
	.addWithInfo(
		'narrow',
		'Use the boolean prop `narrow` to create a narrow bounds with a smaller `max-width`',
		() => (
			<InfoWrapper>
				<div style={{width: '100%'}}>
					<Bounds narrow>
						<h3 className='text--display2'>Narrow Bounds</h3>
						<p>Bounds is used as a non-visual content container that manages content measure and centers children.</p>
					</Bounds>
				</div>
			</InfoWrapper>
		)
	);
