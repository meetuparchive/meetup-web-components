import React from 'react';
import { storiesOf } from '@storybook/react';
import { decorateWithLocale, decorateWithInfo } from '../utils/decorators';
import cx from 'classnames';

import Icon from '../media/Icon';
import NavItem from './NavItem';

const CLASS_AUTH_ITEM = 'navItem--authenticated';

storiesOf('NavItem', module)
	.addDecorator(decorateWithLocale)
	.addDecorator(decorateWithInfo)
	.add('default', () => (
		<NavItem
			shrink
			linkTo="meetup.com"
			label="Explore"
			className={cx(CLASS_AUTH_ITEM, 'flush--left')}
			icon={<Icon shape="search" size="s" className="atMedium_display--none" />}
		/>
	))
	.add('w/ dropdown', () => (
		<NavItem
			shrink
			label="Notifications"
			className={cx('navItem--notifications', CLASS_AUTH_ITEM)}
			dropdownContent={
				<ul>
					<li> Notif 1 </li>
					<li> Notif 2 </li>
					<li> Notif 3 </li>
				</ul>
			}
		/>
	))
	.add('with Badge', () => (
		<NavItem
			shrink
			linkTo="meetup.com"
			label="Messages"
			className={cx('navItem--messages', CLASS_AUTH_ITEM)}
			icon={
				<Icon
					shape="messages"
					size="s"
					className="display--block atMedium_display--none"
				/>
			}
			hasUpdates
		/>
	));
