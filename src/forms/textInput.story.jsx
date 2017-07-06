import React from 'react';
import TextInput from './TextInput';
import Button from './Button';
import { storiesOf } from '@kadira/storybook';

storiesOf('TextInput', module)
	.add('default', () => (
			<div className='span--50'>
				<TextInput
					label='Your name'
					id='fullname'
					name='name'
					placeholder='Not your email' />
			</div>
		)
	)
	.add('with value', () => (
			<div className='span--50'>
				<TextInput
					label='Your name'
					id='fullname'
					name='name'
					value='Phife Dawg'
					placeholder='Not your email' />
			</div>
		)
	)
	.add('disabled', () => (
			<div className='span--50'>
				<TextInput
					label='Your name'
					id='fullname'
					name='name'
					value='Cannot focus'
					disabled />
			</div>
		)
	)
	.add('error state', () => (
			<div className='span--50'>
				<TextInput
					label='Your name'
					id='fullname'
					name='name'
					error='Not so fast. You have an error.' />
			</div>
		)
	)
	.add('error state as element', () => {
		return (
			<div className='span--50'>
				<TextInput label='Your name'
					id='fullname'
					name='name'
					error={<span>This error is an element</span>}
					placeholder='not your email' />
			</div>
		);
	})
	.add('required', () => {
		return (
			<form className='span--50'>
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
			</form>
		);
	})
	.add('search', () => {
		return (
			<form>
				<TextInput
					label='Search the world wide web'
					id='search'
					name='search'
					placeholder='What will it be?'
					isSearch />
				<Button
					contrast
					fullWidth>
					Submit
				</Button>
			</form>
		);
	})
	.add('with char counter (maxLength)', () => {
		const rules = {
			maxLength: 10,
			pattern:'.{5,10}'
		};
		return (
			<div className='span--50'>
				<TextInput
					label='Your name'
					id='fullname'
					name='name'
					value=''
					{...rules} />
			</div>
		);
	})
	.add('has a pattern for min length', () => {
		const rules = {
			pattern:'.{5,10}'
		};
		return (
			<form>
				<TextInput
					label='Your name'
					id='fullname'
					name='name'
					value='>5'
					{...rules} />
				<Button
					contrast
					fullWidth>
					Submit
				</Button>
			</form>
		);
	});

