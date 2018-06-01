import React from 'react';
import { shallow } from 'enzyme';
import ReduxFormCheckbox from './Checkbox';

describe('redux-form Textarea', () => {
	const props = {
		input: {
			label: 'Do you want more?',
			name: 'want_more',
			value: true,
		},
	};

	it('renders a Checkbox component with expected attributes from mock data, should be checked', () => {
		const component = shallow(<ReduxFormCheckbox {...props} />);
		expect(component).toMatchSnapshot();
	});
});
