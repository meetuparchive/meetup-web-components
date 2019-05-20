import React from 'react';
import { shallow } from 'enzyme';
import { NumberInput } from './NumberInput';

describe('NumberInput', function() {
	const onChange = jest.fn();
	const LABEL_TEXT = 'Are you bringing any guests?',
		VALUE = 2,
		NAME_ATTR = 'amountCount',
		PLACEHOLDER = 'Guests',
		MAX_ATTR = 10,
		MIN_ATTR = 1;

	const MOCK_PROPS = {
		name: NAME_ATTR,
		label: LABEL_TEXT,
		value: VALUE,
		onChange,
		id: NAME_ATTR,
		min: MIN_ATTR,
		max: MAX_ATTR,
		required: true,
	};
	const render = (props = MOCK_PROPS) => shallow(<NumberInput {...props} />);

	describe('basic', function() {
		it('exists', () => {
			expect(render()).toMatchSnapshot();
		});

		it('input should have expected props', () => {
			const wrapper = render();
			const inputEl = wrapper.find(`#${NAME_ATTR}`);
			expect(inputEl.props()).toMatchSnapshot();
		});
		it('can be initialized to 0', () => {
			const wrapper = render({ ...MOCK_PROPS, value: 0 });
			const inputEl = wrapper.find(`#${NAME_ATTR}`);
			expect(inputEl.props()).toMatchSnapshot();
		});

		it('should specify attributes that are passed in', function() {
			const wrapper = shallow(
				<NumberInput
					id={NAME_ATTR}
					name={NAME_ATTR}
					label={LABEL_TEXT}
					value={VALUE}
					onChange={onChange}
					placeholder={PLACEHOLDER}
				/>
			);
			const inputEl = wrapper.find(`#${NAME_ATTR}`);
			expect(inputEl).toMatchSnapshot();
		});
	});

	describe('onChange/onFocus', function() {
		it('should not update its value when new value is `e` or `E`', function() {
			const wrapper = render();
			const inputEl = wrapper.find(`#${NAME_ATTR}`);
			expect(inputEl.prop('value')).toEqual(VALUE);
			inputEl.simulate('keyDown', {
				which: 'e',
				key: 'e',
				preventDefault: () => {},
			});
			expect(inputEl.prop('value')).toEqual(VALUE);
			inputEl.simulate('keyDown', {
				which: 'E',
				key: 'e',
				preventDefault: () => {},
			});
			expect(inputEl.prop('value')).toEqual(VALUE);
		});
	});
});
