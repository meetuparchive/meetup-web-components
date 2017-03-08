
import React from 'react';
import Textarea from './Textarea';
import { storiesOf } from '@kadira/storybook';

storiesOf('Textarea', module)
	.add('default', () => <Textarea
		label='Your biography'
		id='yourBio'
		name='bio'
		placeholder='Tell me about your life' />)
	.add('error state', () => <Textarea
		required
		label='Your biography'
		id='yourBio'
		name='bio'
		error='Not so fast. You have an error.'
		placeholder='Tell me about your life' />)
	.add('with character limit', () => <Textarea
		maxLength={140}
		label='Your biography'
		id='yourBio'
		name='bio'
		placeholder='Tell me about your life' />)
	.add('autoheight', () => <Textarea
		autoheight
		label='Your biography'
		id='yourBio'
		name='bio'
		placeholder='Tell me about your life' />)
	.add('autoheight with min and max height', () => <Textarea
		autoheight
		minHeight={100}
		maxHeight={300}
		label='Your biography'
		id='yourBio'
		name='bio'
		placeholder='Tell me about your life' />)
	.add('min and max height', () => <Textarea
		minHeight={100}
		maxHeight={300}
		label='Your biography'
		id='yourBio'
		name='bio'
		placeholder='Tell me about your life' />);
