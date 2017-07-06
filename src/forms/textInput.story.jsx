import React from 'react';
import TextInput from './TextInput';
import Button from './Button';
import { storiesOf } from '@kadira/storybook';
import { IntlProvider, FormattedMessage, defineMessages } from 'react-intl';

storiesOf('TextInput', module)
	.add('default', () => (
		<IntlProvider defaultLocale='en-US' locale='en-US'>
			<div className='span--50'>
				<TextInput
					label='Your name'
					id='fullname'
					name='name'
					placeholder='Not your email' />
			</div>
		</IntlProvider>)
	)
	.add('with value', () => (
		<IntlProvider defaultLocale='en-US' locale='en-US'>
			<div className='span--50'>
				<TextInput
					label='Your name'
					id='fullname'
					name='name'
					value='Phife Dawg'
					placeholder='Not your email' />
			</div>
		</IntlProvider>)
	)
	.add('disabled', () => (
		<IntlProvider defaultLocale='en-US' locale='en-US'>
			<div className='span--50'>
				<TextInput
					label='Your name'
					id='fullname'
					name='name'
					value='Cannot focus'
					disabled />
			</div>
		</IntlProvider>)
	)
	.add('error state', () => (
		<IntlProvider defaultLocale='en-US' locale='en-US'>
			<div className='span--50'>
				<TextInput
					label='Your name'
					id='fullname'
					name='name'
					error='Not so fast. You have an error.' />
			</div>
		</IntlProvider>)
	)
	.add('error state formatted', () => {
		const trn = defineMessages({
			error: {
				defaultMessage: 'This error is a formatted message.',
				id: 'storybook.anError',
				description: { jira: 'SDS-204' },
			}
		});
		return (
			<IntlProvider defaultLocale='en-US' locale='en-US'>
				<div className='span--50'>
					<TextInput label='Your name'
						id='fullname'
						name='name'
						error={<FormattedMessage {...trn.error} />} />
				</div>
			</IntlProvider>
		);
	})
	.add('required', () => {
		return (
			<IntlProvider defaultLocale='en-US' locale='en-US'>
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
			</IntlProvider>
		);
	})
	.add('search', () => {
		return (
			<IntlProvider defaultLocale='en-US' locale='en-US'>
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
			</IntlProvider>
		);
	})
	.add('with char counter (maxLength)', () => {
		const rules = {
			maxLength: 10,
			pattern:'.{5,10}'
		};
		return (
			<IntlProvider defaultLocale='en-US' locale='en-US'>
				<div className='span--50'>
					<TextInput
						label='Your name'
						id='fullname'
						name='name'
						value=''
						{...rules} />
				</div>
			</IntlProvider>
		);
	})
	.add('has a pattern for min length', () => {
		const rules = {
			pattern:'.{5,10}'
		};
		return (
			<IntlProvider defaultLocale='en-US' locale='en-US'>
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
			</IntlProvider>
		);
	});

