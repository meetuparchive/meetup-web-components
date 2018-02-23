import React from 'react';
import TextInput from './TextInput';
import Button from './Button';
import { storiesOf } from '@storybook/react';
import { decorateWithLocale } from '../utils/decorators';

storiesOf('TextInput', module)
	.addDecorator(decorateWithLocale)
	.addWithInfo('type "tel"', null, () => (
		<div className='span--50'>
			<TextInput
				type="tel"
				label="Telephone Number"
				id="telephone"
			/>
		</div>
	)
	)
	.addWithInfo('default', null, () => (
		<div className='span--50'>
			<TextInput
				label='Your name'
				id='fullname'
				name='name'
				placeholder='enter your name here'
			/>
		</div>
	)
	)
	.addWithInfo('with value', null, () => (
		<div className='span--50'>
			<TextInput
				label='Your name'
				id='fullname'
				name='name'
				defaultValue='Phife Dawg'
			/>
		</div>
	)
	)
	.addWithInfo('disabled', null, () => (
		<div className='span--50'>
			<TextInput
				label='Your name'
				id='fullname'
				name='name'
				defaultValue='Cannot focus'
				disabled />
		</div>
	)
	)
	.addWithInfo('error state', null, () => (
		<div className='span--50'>
			<TextInput
				label='Your name'
				id='fullname'
				name='name'
				defaultValue='#$%!$%!'
				error='Not so fast. You have an error.' />
		</div>
	)
	)
	.addWithInfo('error state as element', null, () => {
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
	.addWithInfo('with helper text', null, () => (
		<div className='span--50'>
			<TextInput
				label='Your name'
				id='fullname'
				name='name'
				helperText='Names cannot contain special characters' />
		</div>
	)
	)
	.addWithInfo('required', null, () => {
		return (
			<form className='span--50'>
				<TextInput
					label='Your name'
					id='fullname'
					name='name'
					placeholder='Not your email'
					required
					requiredText='required' />
				<Button
					contrast
					fullWidth>
					Submit
				</Button>
			</form>
		);
	})
	.addWithInfo('search', null, () => {
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
	.addWithInfo('with icon', null, () => (
		<div className='span--50'>
			<TextInput
				label='Your name'
				id='fullname'
				name='name'
				defaultValue='Phife Dawg'
				placeholder='Not your email'
				iconShape='search' />
		</div>
	)
	)
	.addWithInfo(
		'with char counter if you provide maxLength',
		`Note: updating field with charcounter relies on parent to give value,
			thats why you cant interact with the field in this story`,
		() => {
			const rules = {
				maxLength: 20,
				pattern:'.{5,10}'
			};
			return (
				<div className='span--50'>
					<TextInput
						label='Your name'
						id='fullname'
						name='name'
						value='how long is this'
						error='this is an error'
						{...rules} />
				</div>
			);
		}
	)
	.addWithInfo('has a pattern for min length', null, () => {
		const rules = {
			pattern:'.{5,10}'
		};
		return (
			<form>
				<TextInput
					label='Your name'
					id='fullname'
					name='name'
					defaultValue='>5'
					{...rules} />
				<Button
					contrast
					fullWidth>
					Submit
				</Button>
			</form>
		);
	});

