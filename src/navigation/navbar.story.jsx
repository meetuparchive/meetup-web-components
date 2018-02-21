import React from 'react';
import { storiesOf } from '@storybook/react';
import { decorateWithLocale, decorateWithInfo } from '../utils/decorators';

import NavItem from './components/NavItem';
import NavBar from './NavBar';

const CLASS_UNAUTH_ITEM = 'navItem--unauthenticated';
// const CLASS_AUTH_ITEM = 'navItem--authenticated';

const unauthItems = [
	<NavItem
		key={0}
		shrink
		linkTo="meetup.com"
		label="Login"
		className={`${CLASS_UNAUTH_ITEM} navItem--login`}
	/>,
	<NavItem
		key={1}
		shrink
		onAction={() => {}}
		label="Signup"
		className={CLASS_UNAUTH_ITEM}
	/>,
];

storiesOf('NavBar', module)
	.addDecorator(decorateWithLocale)
	.addDecorator(decorateWithInfo)
	.add('Authenticated', () => (
		<NavBar
			self={{
				id: 1234,
				name: 'John Q. Testington',
				status: 'active',
			}}
			authItems={unauthItems}
		/>
	))
	.add('Unauthenticated', () => (
		<NavBar
			self={{
				id: 1234,
				status: 'prereg',
			}}
			unauthItems={unauthItems}
		/>
	))
	.add('with Badge', () => (
		<NavBar
			self={{
				id: 1234,
				name: 'John Q. Testington',
				status: 'active',
			}}
			authItems={unauthItems}
		/>
	));
