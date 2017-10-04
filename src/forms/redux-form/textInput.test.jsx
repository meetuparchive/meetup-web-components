import React from 'react';
import { shallow } from 'enzyme';
import ReduxFormTextInput from './TextInput';

describe('redux-form TextInput', function() {

	const MOCK_ERROR = 'Did you mean Batman and Robin?';
	const formAttrs = {
		input: {
			label: 'Super Hero',
			name: 'superhero',
			value: 'Wonder Woman and Robin',
			maxLength: 20,
			required: true
		},
		meta: {
			error: MOCK_ERROR
		}
	};

	it('renders a TextInput component with expected attributes from mock data', () => {
		const component = shallow(<ReduxFormTextInput {...formAttrs} />);

		expect(component).toMatchSnapshot();
	});

	describe('validateAfterTouched', () => {
		it('always renders the error when `validateAfterTouched` is not true', () => {
			const component = shallow(<ReduxFormTextInput {...formAttrs} />);
			expect(component.prop('error')).toBe(MOCK_ERROR);
		});
		describe('when true', () => {
			it('does not render the error when touched is false', () => {
				const props = {
					...formAttrs,
					meta: {
						touched: false,
						error: MOCK_ERROR
					},
					validateAfterTouched: true
				};
				const component = shallow(<ReduxFormTextInput {...props} />);
				expect(component.prop('error')).toBe(null);
			});
			it('does render the error when touched is true', () => {
				const props = {
					...formAttrs,
					meta: {
						touched: true,
						error: MOCK_ERROR
					},
					validateAfterTouched: true
				};
				const component = shallow(<ReduxFormTextInput {...props} />);
				expect(component.prop('error')).toBe(MOCK_ERROR);
			});
		});
	});

});
