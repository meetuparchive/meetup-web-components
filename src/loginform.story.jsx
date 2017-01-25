import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { InfoWrapper, Inverted } from './utils/storyComponents';
import LoginForm from './LoginForm';

const loginAction = ({ password, email }) => {
	action(`Log in submitted for ${email}:${password}`)({});
};
storiesOf('LoginForm', module)
	.addWithInfo(
		'default',
		'This is the basic usage with the component.',
		() => (
			<InfoWrapper>
				<LoginForm loginAction={loginAction} />
			</InfoWrapper>
		)
	)
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

