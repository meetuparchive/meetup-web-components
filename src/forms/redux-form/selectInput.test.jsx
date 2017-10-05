import React from 'react';
import { shallow, mount } from 'enzyme';
import ReduxFormSelectInput from './SelectInput';

describe('redux-form SelectInput', () => {
	const testOptions = [
		{ label: 'One', value: '1' },
		{ label: 'Two', value: '2' },
		{ label: 'Three', value: '3' }
	];
	const formAttrs = {
		label: 'Countries',
		name: 'formSelectCountries',
		options: testOptions,
		required: true,
		meta: {
			error: 'Did you mean Batman and Robin?'
		}
	};

	it('renders a SelectInput component with expected attributes from mock data', () => {
		const component = shallow(<ReduxFormSelectInput {...formAttrs} />);
		expect(component).toMatchSnapshot();
	});

	it('does not render error if field is not touched and validateAfterTouched is true', () => {
		const props = {
			...formAttrs,
			validateAfterTouched: true,
			meta: {
				...formAttrs.meta,
				touched: false
			}
		};
		const component = mount(<ReduxFormSelectInput {...props} />);
		expect(component.find('.field--error').exists()).toBe(false);
	});
});
