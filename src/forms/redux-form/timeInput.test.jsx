import React from 'react';
import { shallow } from 'enzyme';
import ReduxFormTimeInput from './TimeInput';

describe('redux-form TimeInput', function() {

	const formAttrs = {
		input: {
			label: 'What time is it?',
			name: 'partytime',
			value: '22:00',
			required: true
		},
		meta: {
			error: 'Now approaching midnight!!?'
		}
	};

	it('renders a TimeInput component with expected attributes from mock data', () => {
		const component = shallow(<ReduxFormTimeInput {...formAttrs} />);

		expect(component).toMatchSnapshot();
	});
});
