import React from 'react';
import { Link } from 'react-router';
import { storiesOf, action } from '@kadira/storybook';
import { InfoWrapper } from '../utils/storyComponents';
import { decorateWithLocale } from '../utils/decorators';
import Popover from './Popover';
import Button from '../forms/Button';

const logSelection = e => {
	action(`Selected option ${e.target}`);
};

storiesOf('Popover', module)
	.addDecorator(decorateWithLocale)
	.addWithInfo(
		'default - Button trigger with Link menu items',
		'This is the basic usage with the component. ',
		() => (
			<InfoWrapper>
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
			</InfoWrapper>
		)
	)
	.add('DIV trigger with SPAN menu items', () => {
		return (
			<Popover
				trigger={<div>Open</div>}
				menuItems={[
					<span className='first-option' onClick={logSelection}>First option</span>,
					<span className='second-option' onClick={logSelection}>Second option</span>,
					<span className='third-option' onClick={logSelection}>Third option</span>,
				]}
			/>
		);
	})
	.add('Left aligned menu items', () => {
		return (
			<Popover
				trigger={
					<Button>Open</Button>
				}
				align='left'
				menuItems={[
					<Link to='somepath/' onClick={logSelection}>First option</Link>,
					<Link to='somepath/' onClick={logSelection}>Second option</Link>,
					<Link to='somepath/' onClick={logSelection}>Third option</Link>,
				]}
			/>
		);
	})
	.add('Right aligned menu items', () => {
		return (
			<Popover
				trigger={
					<Button>Open</Button>
				}
				align='right'
				menuItems={[
					<Link to='somepath/' onClick={logSelection}>First option</Link>,
					<Link to='somepath/' onClick={logSelection}>Second option</Link>,
					<Link to='somepath/' onClick={logSelection}>Third option</Link>,
				]}
			/>
		);
	});
