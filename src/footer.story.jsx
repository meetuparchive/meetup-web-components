import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { WithNotes } from '@kadira/storybook-addon-notes';
import { InfoWrapper } from './utils/storyComponents';
import Footer from './Footer';

storiesOf('Footer', module)
	.addWithInfo(
		'default',
		'This is the basic usage with the component.',
		() => (
			<InfoWrapper>
				<WithNotes notes='The Footer provides minimally-styled wrapper for other content'>
					<Footer>Footer content</Footer>
				</WithNotes>
			</InfoWrapper>
		)
	);

