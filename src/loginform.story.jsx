import React from 'react';
import LoginForm from './LoginForm';
import { storiesOf, action } from '@kadira/storybook';
import { Inverted } from './utils/storyComponents';

const loginAction = ({ password, email }) => {
	action(`Log in submitted for ${email}:${password}`)({});
};
storiesOf('LoginForm', module)
	.add('default', () => (
		<LoginForm
			loginAction={loginAction} />
	))
	.add('pre-populated', () => (
		<LoginForm
			email='foo@example.com'
			loginAction={loginAction} />
	))
	.add('errors', () => (
		<LoginForm
			loginAction={loginAction}
			errors={[new Error('error message')]} />
	))
	.add('disabled', () => (
		<LoginForm
			loginAction={loginAction}
			disabled />
	))
	.add('inverted', () => (
		<Inverted>
			<LoginForm
				loginAction={loginAction} />
		</Inverted>
	));

