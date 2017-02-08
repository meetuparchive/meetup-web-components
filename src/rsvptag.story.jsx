import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { InfoWrapper } from './utils/storyComponents';
import RsvpTag from './RsvpTag.jsx';

storiesOf('RsvpTag', module)
	.addWithInfo(
		'default',
		'This is the basic usage with the component.',
		() => (
			<InfoWrapper>
				<RsvpTag status='yes'></RsvpTag>
			</InfoWrapper>
		)
	)
	.add('no', () => <RsvpTag status='no'></RsvpTag>)
	.add('waiting', () => <RsvpTag status='waiting'></RsvpTag>);

