import React from 'react';
import { shallow } from 'enzyme';

import { NotificationsDropdownComponent } from './NotificationsDropdown';


describe('Notifications Dropdown', () => {
	it('renders to DOM', () => {
		const wrapper = shallow(
			<NotificationsDropdownComponent
				self={{ id: '1234' }}
				notifications={[]}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});
});
