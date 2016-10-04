import React from 'react';
import RsvpTag from './RsvpTag.jsx';
import { storiesOf } from '@kadira/storybook';

storiesOf('RsvpTag', module)
	.add('yes', () => <RsvpTag status='yes'></RsvpTag>)
	.add('no', () => <RsvpTag status='no'></RsvpTag>)
	.add('waiting', () => <RsvpTag status='waiting'></RsvpTag>);

