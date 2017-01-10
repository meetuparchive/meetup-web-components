import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { decorateWithLocale } from './utils/decorators';
import { Link } from 'react-router';
import Popover from './Popover';
import Button from './Button';

const logSelection = e => {
	console.log('yowerewr');
	action(`Selected option ${e.target}`);
};

storiesOf('Popover', module)
	.addDecorator(decorateWithLocale)
	.add('Button trigger with Link menu items', () => {
		return (
			<Popover
				trigger={
					<Button>Open</Button>
				}
				menuItems={[
					<Link to='somepath/' onClick={logSelection}>First option</Link>,
					<Link to='somepath/' onClick={logSelection}>Second option</Link>,
					<Link to='somepath/' onClick={logSelection}>Third option</Link>,
				]}
			/>
		);
	})
	.add('DIV trigger with SPAN menu items', () => {
		return (
			<Popover
				trigger={<div>Open</div>}
				menuItems={[
					<span onClick={logSelection}>First option</span>,
					<span to='somepath/' onClick={logSelection}>Second option</span>,
					<span to='somepath/' onClick={logSelection}>Third option</span>,
				]}
			/>
		);
	});
