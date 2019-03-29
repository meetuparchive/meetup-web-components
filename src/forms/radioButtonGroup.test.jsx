import React from 'react';
import { shallow } from 'enzyme';

import RadioButtonGroup from './RadioButtonGroup';
import RadioButton from './RadioButton';

const DEFAULT_PROPS = {
	className: 'some-class',
	selectedValue: 'one',
	name: 'name',
};

const getWrapper = (props = {}) =>
	shallow(
		<RadioButtonGroup {...DEFAULT_PROPS} {...props}>
			<RadioButton value="one" label="label 1" name="button1" />
			<RadioButton value="two" label="label 2" name="button2" />
		</RadioButtonGroup>
	);

describe('RadioButtonGroup', () => {
	it('should match the snapshot', () => {
		expect(getWrapper()).toMatchSnapshot();
	});

	describe('componentWillReceiveProps', () => {
		it('should update state.value if the next props contains selectedValue', () => {
			const wrapper = getWrapper({
				selectedValue: 'one',
			});
			const instance = wrapper.instance();

			instance.componentWillReceiveProps({ selectedValue: 'two' });
			expect(wrapper.state('selectedValue')).toBe('two');
		});

		it('should not update state for nextProps other than selectedValue', () => {
			const wrapper = getWrapper();
			const instance = wrapper.instance();

			jest.spyOn(instance, 'setState');
			instance.componentWillReceiveProps({ testProp: true, other: 'other' });
			expect(instance.setState).not.toHaveBeenCalled();
		});
	});

	describe('handleChange', () => {
		const MOCK_EVENT = {
			target: {
				value: 'two',
			},
		};

		it('should update the state for selectedValue', () => {
			const wrapper = getWrapper({
				selectedValue: 'one',
			});
			const instance = wrapper.instance();
			instance.handleChange(MOCK_EVENT);
			expect(wrapper.state('selectedValue')).toBe('two');
		});

		it('should call the onChange prop', () => {
			const onChange = jest.fn();
			const wrapper = getWrapper({ onChange });
			const instance = wrapper.instance();
			instance.handleChange(MOCK_EVENT);
			expect(onChange).toHaveBeenCalledWith(MOCK_EVENT);
		});
	});
});
