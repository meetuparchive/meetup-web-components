import React from 'react';
import TextInput from './TextInput';
import Button from './Button';
import { storiesOf } from '@storybook/react';
import { decorateWithBasics } from '../utils/decorators';

storiesOf('TextInput', module)
	.addDecorator(decorateWithBasics)
	.addWithInfo('type "tel"', null, () => (
		<TextInput
			type="tel"
			label="Telephone Number"
			id="telephone"
		/>
	)
	)
	.addWithInfo('default', null, () => (
		<TextInput
			label='Your name'
			id='fullname'
			name='name'
			placeholder='enter your name here'
		/>
	)
	)
	.addWithInfo('with value', null, () => (
		<TextInput
			label='Your name'
			id='fullname'
			name='name'
			defaultValue='Phife Dawg'
		/>
	)
	)
	.addWithInfo('disabled', null, () => (
		<TextInput
			label='Your name'
			id='fullname'
			name='name'
			defaultValue='Cannot focus'
			disabled />
	)
	)
	.addWithInfo('error state', null, () => (
		<TextInput
			label='Your name'
			id='fullname'
			name='name'
			defaultValue='#$%!$%!'
			error='Not so fast. You have an error.' />
	)
	)
	.addWithInfo('error state as element', null, () => {
		return (
			<TextInput label='Your name'
				id='fullname'
				name='name'
				error={<span>This error is an element</span>}
				placeholder='not your email' />

		);
	})
	.addWithInfo('with helper text', null, () => (
		<TextInput
			label='Your name'
			id='fullname'
			name='name'
			helperText='Names cannot contain special characters' />
	)
	)
	.addWithInfo('required', null, () => {
		return (
			<form>
				<TextInput
					label='Your name'
					id='fullname'
					name='name'
					placeholder='Not your email'
					required
					requiredText='(required)' />
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
		<TextInput
			label='Your name'
			id='fullname'
			name='name'
			defaultValue='Phife Dawg'
			placeholder='Not your email'
			iconShape='search' />
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
				<TextInput
					label='Your name'
					id='fullname'
					name='name'
					value='how long is this'
					error='this is an error'
					{...rules} />
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
					validityMessage='Must be more than 5 characters and less than 10'
					{...rules}
				/>
				<Button
					contrast
					fullWidth>
					Submit
				</Button>
			</form>
		);
	});

