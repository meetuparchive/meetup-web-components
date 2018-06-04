import React from 'react';
import { shallow } from 'enzyme';
import ReduxFormSelectInput from './SelectInput';

describe('redux-form SelectInput', () => {
	const testOptions = [
		{ label: 'One', value: '1' },
		{ label: 'Two', value: '2' },
		{ label: 'Three', value: '3' },
	];
	const formAttrs = {
		required: true,
		meta: {
			touched: false,
			error: 'Did you mean Batman and Robin?',
		},
		input: {
			label: 'Countries',
			name: 'formSelectCountries',
			options: testOptions,
		},
	};

	it('renders a SelectInput component with expected attributes from mock data', () => {
		const component = shallow(<ReduxFormSelectInput {...formAttrs} />);
		expect(component).toMatchSnapshot();
	});
});
