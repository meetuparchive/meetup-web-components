import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Annotate, InfoWrapper } from './utils/storyComponents';
import Header from './Header';

storiesOf('Header', module)
	.addWithInfo(
		'default',
		'This is the basic usage with the component.',
		() => (
			<InfoWrapper>
				<Annotate
					notes='The header provides minimally-styled wrapper for other content'
					style={{ width: '100%' }}>
					<Header>Header content</Header>
				</Annotate>
			</InfoWrapper>
		)
	);

