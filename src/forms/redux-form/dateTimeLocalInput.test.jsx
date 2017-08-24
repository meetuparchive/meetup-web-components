import React from 'react';
import { shallow } from 'enzyme';
import ReduxFormDateTimeLocalInput from './DateTimeLocalInput';

describe('redux-form DateTimeLocalInput', () => {

	// props structured like redux form will pass them
	const fieldProps = {
		input: {
			label: 'Y2K',
			name: 'y2k_date',
			required: true,
			value:' 2000-01-01T00:01',
			min: '1999-12-31T23:55',
			max: '2017-06-30T16:30',
		},
		meta: {
			error: 'Too soon.'
		}
	};

	it('renders a DateTimeLocalInput with expected props from mock data', () => {
		const component = shallow(<ReduxFormDateTimeLocalInput {...fieldProps} />);
		expect(component).toMatchSnapshot();
	});

});
