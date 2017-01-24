import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { WithNotes } from '@kadira/storybook-addon-notes';
import { InfoWrapper } from './utils/storyComponents';
import Header from './Header';

storiesOf('Header', module)
	.addWithInfo(
		'default',
		'This is the basic usage with the component.',
		() => (
			<InfoWrapper>
				<WithNotes notes='The header provides minimally-styled wrapper for other content'>
					<Header>Header content</Header>
				</WithNotes>
			</InfoWrapper>
		)
	);

