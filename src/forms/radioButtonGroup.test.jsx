import React from 'react';
import { shallow } from 'enzyme';

import RadioButtonGroup from './RadioButtonGroup';
import RadioButton from './RadioButton';

describe('RadioButtonGroup', () => {
	const DEFAULT_PROPS = {
		direction: 'row',
		className: 'some-class',
		selectedValue: 'one',
		name: 'name',
	};
	const getWrapper = (props = {}) =>
		shallow(
			<RadioButtonGroup {...DEFAULT_PROPS} {...props}>
				<RadioButton value="one" label="label 1" />
				<RadioButton value="two" label="label 2" />
			</RadioButtonGroup>
		);

	it('should match the snapshot', () => {
		expect(getWrapper()).toMatchSnapshot();
	});

	it('should apply switchDirection and direction props', () => {
		expect(
			getWrapper({ switchDirection: 'medium', direction: 'column' })
		).toMatchSnapshot();
	});

	describe('componentWillReceiveProps', () => {
		it('should update state.selectedValue if the next props contain selectedValue', () => {
			const wrapper = getWrapper();
			const instance = wrapper.instance();
			instance.setState({ selectedValue: 'one' });
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
			const wrapper = getWrapper();
			const instance = wrapper.instance();
			instance.setState({ selectedValue: 'one' });
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
