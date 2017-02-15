import React from 'react';
import TextInput from './TextInput';
import Button from './Button';
import { storiesOf } from '@kadira/storybook';

storiesOf('TextInput', module)
	.add('default', () => <TextInput
		label='Your name'
		id='fullname'
		name='name'
		placeholder='Not your email' />)
	.add('with value', () => <TextInput
		label='Your name'
		id='fullname'
		name='name'
		value='Phife Dawg'
		placeholder='Not your email' />)
	.add('error state', () => <TextInput
		label='Your name'
		id='fullname'
		name='name'
		error='Not so fast. You have an error.'
		placeholder='Not your email' />)
	.add('required', () => {
		return (<form>
			<TextInput
				label='Your name'
				id='fullname'
				name='name'
				required
				placeholder='Not your email' />
			<Button
				contrast
				fullWidth>
				Submit
			</Button>
		</form>);
	})
	.add('with char counter (maxLength)', () => {
		const rules = {
			maxLength: 10,
			pattern:'.{5,10}'
		};
		return (<TextInput
			label='Your name'
			id='fullname'
			name='name'
			value=''
			placeholder='Not your email'
			{...rules} />);
	})
	.add('has a pattern for min length', () => {
		const rules = {
			pattern:'.{5,10}'
		};
		return (<form>
			<TextInput
				label='Your name'
				id='fullname'
				name='name'
				value='>5'
				placeholder='Not your email'
				customValidityMessage='not long enough'
				{...rules} />
			<Button
				contrast
				fullWidth>
				Submit
			</Button>
		</form>);
	});

