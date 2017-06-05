import React from 'react';
import TextInput from './TextInput';
import Button from './Button';
import { storiesOf } from '@kadira/storybook';
import {
	IntlProvider,
	FormattedMessage,
	defineMessages,
} from 'react-intl';

storiesOf('TextInput', module)
	.add('default', () => (<TextInput
		label='Your name'
		id='fullname'
		name='name'
		placeholder='Not your email' />))
	.add('with value', () => (<TextInput
		label='Your name'
		id='fullname'
		name='name'
		value='Phife Dawg'
		placeholder='Not your email' />))
	.add('disabled', () => (<TextInput
		label='Your name'
		id='fullname'
		name='name'
		value='Phife Dawg'
		placeholder='Not your email'
		disabled />))
	.add('error state', () => (<TextInput
		label='Your name'
		id='fullname'
		name='name'
		error='Not so fast. You have an error.'
		placeholder='Not your email' />))
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
				<TextInput label='Your name'
					id='fullname'
					name='name'
					error={<FormattedMessage {...trn.error} />}
					placeholder='Not your email' />
			</IntlProvider>
		);
	})
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
	.add('search', () => {
		return (<form>
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
				{...rules} />
			<Button
				contrast
				fullWidth>
				Submit
			</Button>
		</form>);
	});

