import React from 'react';
import { WithNotes } from '@kadira/storybook-addon-notes';
import { storiesOf, action } from '@kadira/storybook';
import { InfoWrapper } from './utils/storyComponents';
import Nav from './Nav.jsx';
import NavItem from './NavItem.jsx';

const onClick = route => e => {
	e.preventDefault();
	action(`Nav to route: ${route}`)(e);
};
storiesOf('Nav.NavItem', module)
	.addWithInfo(
		'default',
		'This is the basic usage with the component.',
		() => (
			<InfoWrapper>
				<WithNotes notes='Each item is clickable, but will throw errors without a React Router'>
					<Nav style={{ border: '1px dashed #ccc' }}>
						<NavItem
							to='/'
							onClick={onClick('/')}>
							<img alt='Home' src='https://placekitten.com/g/200/100' className='margin--left' />
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
				</WithNotes>
			</InfoWrapper>
		)
	);

