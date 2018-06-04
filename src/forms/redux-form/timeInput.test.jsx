import React from 'react';
import { shallow } from 'enzyme';
import ReduxFormTimeInput from './TimeInput';

describe('redux-form TimeInput', function() {
	// props given in the structure that
	// redux form would
	const reduxFormProps = {
		input: {
			label: 'What time is it?',
			name: 'partytime',
			value: '22:00',
			required: true,
		},
		meta: {
			error: 'Now approaching midnight!!?',
		},
	};

	it('renders a TimeInput component with expected attributes from mock data', () => {
		const component = shallow(<ReduxFormTimeInput {...reduxFormProps} />);

		expect(component).toMatchSnapshot();
	});
});
