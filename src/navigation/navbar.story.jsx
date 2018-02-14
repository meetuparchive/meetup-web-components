import React from 'react';
import { storiesOf } from '@storybook/react';
import {
	decorateWithLocale,
	decorateWithInfo,
} from '../utils/decorators';

import NavBar from './NavBar';

const group = [{
	id: 6622782,
	name: "Whiskey Wednesdays",
	status: "active",
	link: "https://www.dev.meetup.com/Whiskey-Wednesdays/",
	urlname: "Whiskey-Wednesdays",
	description: "This is a description",
}];

storiesOf('NavBar', module)
	.addDecorator(decorateWithLocale)
	.addDecorator(decorateWithInfo)
	.add('Default', () => (
		<NavBar
			self={{
				id: 1234,
				name: 'John Q. Testington',
				status: 'active'
			}}
			groups={group}
		/>
	)
	);
