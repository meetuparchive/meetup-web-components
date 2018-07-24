import React from 'react';
import { storiesOf } from '@storybook/react';

import { decorateWithBasics, decorateWithInfo } from './utils/decorators';
import { SignupModal } from './SignupModal';

export const signupOptions = {
	orLabel: 'Or',
	title: 'Sign up',
	google: {
		link: 'google.com',
		label: 'Google',
	},
	facebook: {
		link: 'facebook.com',
		label: 'Facebook',
	},
	email: {
		link: 'meetup.com/email',
		label: 'Email',
	},
	login: {
		text: 'Already a member?',
		label: 'Login',
		link: 'meetup.com/login',
	},
};

storiesOf('Uncategorized/SignupModal', module)
	.addDecorator(decorateWithBasics)
	.addDecorator(decorateWithInfo)
	.add('default', () => (
		<SignupModal signupOptions={signupOptions} onDismiss={() => {}} />
	));
