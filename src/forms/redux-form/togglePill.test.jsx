import React from 'react';
import { shallow, mount } from 'enzyme';
import ReduxFormTogglePill from './TogglePill';
import TogglePill from '../TogglePill';

describe('redux-form TogglePill', function() {
	// props given in the structure that
	// redux form would
	const togglePillProps = {
		input: {
			id: 'parenting',
			label: 'Parenting',
			name: 'parenting',
			children: 'Parenting!',
			value: false, // as a checkbox, redux form will pass true / false for values
		},
	};

	it('renders a TogglePill component with expected attributes from mock data', () => {
		const component = shallow(<ReduxFormTogglePill {...togglePillProps} />);
		expect(component).toMatchSnapshot();
	});

	it('renders a TogglePill with isActive prop as false when value is false', () => {
		const component = mount(<ReduxFormTogglePill {...togglePillProps} />);
		expect(component.find(TogglePill).prop('isActive')).toBe(false);
	});

	it('renders a TogglePill with isActive prop as true when value is true', () => {
		togglePillProps.input.value = true;
		const component = mount(<ReduxFormTogglePill {...togglePillProps} />);
		expect(component.find(TogglePill).prop('isActive')).toBe(true);
	});
});
