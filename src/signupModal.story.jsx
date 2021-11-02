import React from 'react';
import { storiesOf } from '@storybook/react';

import { decorateWithBasics, decorateWithInfo } from './utils/decorators';
import { SignupModal } from './SignupModal';

export const signupOptions = {
	orLabel: 'Or',
	title: 'Sign up',
	apple: {
		link: 'apple.com',
		label: 'Continue with Apple',
		shouldRender: true,
	},
	google: {
		link: 'google.com',
		label: 'Continue with Google',
	},
	facebook: {
		link: 'facebook.com',
		label: 'Continue with Facebook',
	},
	email: {
		link: 'meetup.com/email',
		label: 'Sign up with email',
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
		<SignupModal
			signupOptions={signupOptions}
			onDismiss={() => {}}
			focusTrapActive={false}
		/>
	));
