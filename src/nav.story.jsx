import React from 'react';
import Nav from './Nav.jsx';
import NavItem from './NavItem.jsx';
import { storiesOf, action } from '@kadira/storybook';
import { Annotate } from './utils/storyComponents';

const onClick = route => e => {
	e.preventDefault();
	action(`Nav to route: ${route}`)(e);
};
storiesOf('Nav.NavItem', module)
	.add('default', () => (
		<Annotate
			notes='Each item is clickable, but will throw errors without a React Router'
			style={{ width: '100%', textAlign: 'center' }}>
			<Nav style={{ border: '1px dashed #ccc' }}>
				<NavItem
					to='/'
					onClick={onClick('/')}>
					<img alt='Home' src='http://placekitten.com/g/200/100' className='margin--left' />
				</NavItem>
				<NavItem
					to='/'
					onClick={onClick('/')}>
					Home
				</NavItem>
				<NavItem
					to='/foo'
					onClick={onClick('/foo')}>
					Foo
				</NavItem>
			</Nav>
		</Annotate>
	));

