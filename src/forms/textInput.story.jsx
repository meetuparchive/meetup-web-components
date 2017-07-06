import React from 'react';
import TextInput from './TextInput';
import Button from './Button';
import { storiesOf } from '@kadira/storybook';
import { InfoWrapper } from '../utils/storyComponents';
import {
	IntlProvider,
	FormattedMessage,
	defineMessages,
} from 'react-intl';

storiesOf('TextInput', module)
	.addWithInfo(
		'default',
		'Basic usage',
		() => (
			<InfoWrapper>
				<TextInput
					label='Your name'
					id='fullname'
					name='name'
				/>
			</InfoWrapper>
		)
	)
	.addWithInfo(
		'with value',
		'value set with prop',
		() => (
			<InfoWrapper>
				<TextInput
					label='Your name'
					id='fullname'
					name='name'
					value='Phife Dawg'
				/>
			</InfoWrapper>
		)
	)
	.addWithInfo(
		'with placeholder',
		'add a placeholder with the `placeholder` prop (accepts string or element for i18n)',
		() => (
			<InfoWrapper>
				<TextInput
					label='Your name'
					id='fullname'
					name='name'
					placeholder='Phife Dawg'
				/>
			</InfoWrapper>
		)
	)
	.addWithInfo(
		'disabled',
		'disabled via boolean prop',
		() => (
			<InfoWrapper>
				<TextInput
					label='Your name'
					id='fullname'
					name='name'
					value='Phife Dawg'
					disabled
				/>
			</InfoWrapper>
		)
	)
	.addWithInfo(
		'error state',
		'error via `error` prop',
		() => (
			<InfoWrapper>
				<TextInput
					label='Your name'
					id='fullname'
					name='name'
					error='Not so fast. You have an error.'
				/>
			</InfoWrapper>
		)
	)
	.addWithInfo(
		'error state formatted',
		'the `error` prop also accepts an `element` for FormattedMessage',
		() => {
			const trn = defineMessages({
				error: {
					defaultMessage: 'This error is a formatted message.',
					id: 'storybook.anError',
					description: { jira: 'SDS-204' },
				}
			});
			return (
				<IntlProvider defaultLocale='en-US' locale='en-US'>
					<InfoWrapper>
						<TextInput label='Your name'
							id='fullname'
							name='name'
							error={<FormattedMessage {...trn.error} />}
						/>
					</InfoWrapper>
				</IntlProvider>
			);
		})
	.addWithInfo(
		'required',
		'mark fields required with the `required` boolean prop',
		() => {
			return (<form>
				<InfoWrapper>
					<TextInput
						label='Your name'
						id='fullname'
						name='name'
						required
					/>
				</InfoWrapper>
				<Button
					contrast
					fullWidth>
					Submit
				</Button>
			</form>);
		})
	.addWithInfo(
		'search',
		'search variant of TextInput',
		() => {
			return (<form>
				<InfoWrapper>
					<TextInput
						label='Search the world wide web'
						id='search'
						name='search'
						isSearch
					/>
				</InfoWrapper>
				<Button
					contrast
					fullWidth>
					Submit
				</Button>
			</form>);
		})
	.addWithInfo(
		'with char counter (maxLength)',
		'the `maxLength` prop enables a character counter',
		() => {
			const rules = {
				maxLength: 10,
				pattern:'.{5,10}'
			};
			return (
				<InfoWrapper>
					<TextInput
						label='Your name'
						id='fullname'
						name='name'
						value=''
						{...rules}
					/>
				</InfoWrapper>
			);
		})
	.addWithInfo(
		'has a pattern for min length',
		'html5 style `pattern` matching is supported',
		() => {
			const rules = {
				pattern:'.{5,10}'
			};
			return (<form>
				<InfoWrapper>
					<TextInput
						label='Your name'
						id='fullname'
						name='name'
						value='>5'
						{...rules}
					/>
				</InfoWrapper>
				<Button
					contrast
					fullWidth>
					Submit
				</Button>
			</form>);
		});

