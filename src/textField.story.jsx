
import React from 'react';
import TextField from './TextField';
import { storiesOf } from '@kadira/storybook';


storiesOf('TextField', module)
	.add('default', () => <TextField
		label='Your name'
		elId='fullname'
		name='name'
		value='Q tip'
		placeholder='Not your email...' />)
	.add('has a value', () => <TextField
		label='Your name'
		elId='fullname'
		name='name'
		value='Phife Dawg'
		placeholder='Not your email...' />);
