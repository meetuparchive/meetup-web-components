import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Annotate, InfoWrapper } from './utils/storyComponents';
import Footer from './Footer';

storiesOf('Footer', module)
	.addWithInfo(
		'default',
		'This is the basic usage with the component.',
		() => (
			<InfoWrapper>
				<Annotate
					notes='The Footer provides minimally-styled wrapper for other content'
					style={{ width: '100%' }}>
					<Footer>Footer content</Footer>
				</Annotate>
			</InfoWrapper>
		)
	);

