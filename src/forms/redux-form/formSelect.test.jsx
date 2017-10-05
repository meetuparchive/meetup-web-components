import React from 'react';
import { shallow, mount } from 'enzyme';
import ReduxFormSelect from './FormSelect';

describe('redux-form FormSelect', () => {

	const formAttrs = {
		label: 'Countries',
		id: 'countriesSelect',
		name: 'formSelectCountries',
		options: ['Serbia', 'S. Korea', 'Johto'],
		required: true,
		meta: {
			error: 'Did you mean Batman and Robin?'
		}
	};

	it('renders a FormSelect component with expected attributes from mock data', () => {
		const component = shallow(<ReduxFormSelect {...formAttrs} />);
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
		const component = mount(<ReduxFormSelect {...props} />);
		expect(component.find('.text--error').exists()).toBe(false);
	});
});
