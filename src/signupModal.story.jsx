import React from 'react';
import { storiesOf } from '@storybook/react';

import { decorateWithBasics } from './utils/decorators';
import { SignupModal } from './SignupModal';

const signupOptions = {
	orLabel: 'Or',
	title: 'Signup',
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
	},
};

storiesOf('SignupModal', module)
	.addDecorator(decorateWithBasics)
	.add('default', () => <SignupModal signupOptions={signupOptions} />);
