import React from 'react';
import Icon from '../media/Icon';
import NavItem from './NavItem';

export const NavBar = () => (
	<NavItem
		key={0}
		shrink
		linkTo="meetup.com"
		label="Explore"
		className="explore"
		hasUpdates
		icon={<Icon shape="search" size="s" className="atMedium_display--none" />}
	/>
);

export default NavBar;
