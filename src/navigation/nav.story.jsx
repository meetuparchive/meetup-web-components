import React from 'react';
import { storiesOf } from '@storybook/react';

import { decorateWithInfo } from '../utils/decorators';
import Icon from '../media/Icon';
import NavItem from './components/NavItem';
import Nav from './Nav';

const CLASS_UNAUTH_ITEM = 'navItem--unauthenticated';
const CLASS_AUTH_ITEM = 'navItem--authenticated';

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
const authItems = [
	<NavItem
		key={0}
		shrink
		linkTo="meetup.com"
		label="Explore"
		className={`${CLASS_AUTH_ITEM} flush--left`}
		icon={<Icon shape="search" size="s" className="atMedium_display--none" />}
	/>,
	<NavItem
		key={1}
		shrink
		label="Notifications"
		className={`navItem--notifications ${CLASS_AUTH_ITEM}`}
		dropdownContent={
			<ul>
				<li> Notif 1 </li>
				<li> Notif 2 </li>
				<li> Notif 3 </li>
			</ul>
		}
	/>,
	<NavItem
		key={2}
		shrink
		linkTo="meetup.com"
		label="Messages"
		className={`navItem--messages ${CLASS_AUTH_ITEM}`}
		icon={
			<Icon
				shape="messages"
				size="s"
				className="display--block atMedium_display--none"
			/>
		}
		hasUpdates
	/>,
];

storiesOf('Nav', module)
	.addDecorator(decorateWithInfo)
	.add('authenticated', () => (
		<Nav
			self={{
				id: 1234,
				name: 'John Q. Testington',
				status: 'active',
			}}
			unauthItems={unauthItems}
			authItems={authItems}
		/>
	))
	.add('unauthenticated', () => (
		<Nav
			self={{
				status: 'prereg',
			}}
			unauthItems={unauthItems}
			authItems={authItems}
		/>
	));
