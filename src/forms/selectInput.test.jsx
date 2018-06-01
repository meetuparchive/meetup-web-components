import React from 'react';
import { shallow, mount } from 'enzyme';
import { SelectInput } from './SelectInput';

const testOptions = [
	{ label: 'One', value: '1' },
	{ label: 'Two', value: '2' },
	{ label: 'Three', value: '3' },
	{ label: 'Four', value: '4', disabled: true },
];
const nameAttribute = 'testSelect';
const idAttribute = 'testSelectID';

const BasicSelect = (
	<SelectInput label="Test select" name={nameAttribute} options={testOptions} />
);
const BasicSelectWithId = (
	<SelectInput
		label="Test select"
		name={nameAttribute}
		id={idAttribute}
		options={testOptions}
	/>
);
const AdvancedSelect = ({ onChange, value }) => (
	<SelectInput
		label="Test select"
		name={nameAttribute}
		options={testOptions}
		onChange={onChange}
		value={value}
	/>
);

describe('SelectInput basic', () => {
	const component = shallow(BasicSelect);

	it('renders into the DOM', () => {
		expect(component).toMatchSnapshot();
	});
	it('should have a NAME attribute', () => {
		expect(component.find('select').prop('name')).toBe(nameAttribute);
	});
	it('default value should fall back on first option value', () => {
		expect(component.instance().state.value).toBe(testOptions[0].value);
	});
});

describe('SelectInput basic with an ID and a name', () => {
	const component = shallow(BasicSelect);
	const componentWithId = shallow(BasicSelectWithId);

	it('should have a ID attribute matching NAME when ID is not passed in', () => {
		expect(component.find('select').prop('id')).toBe(nameAttribute);
	});
	it('should have a ID attribute matching ID when ID is passed in', () => {
		expect(componentWithId.find('select').prop('id')).toBe(idAttribute);
	});
});

describe('SelectInput advanced', () => {
	it('should set correct value in state on change', () => {
		const newValue = '2';
		const onChange = jest.fn();
		const component = mount(<AdvancedSelect onChange={onChange} />);
		const selectWrapper = component.find('select');
		const changeEvent = { target: { value: newValue } };

		expect(onChange).not.toHaveBeenCalled();
		selectWrapper.simulate('change', changeEvent);
		expect(onChange).toHaveBeenCalled();

		// find the updated select to check value
		expect(component.find('select').prop('value')).toEqual(newValue);
	});

	it('should set correct value specified in props', () => {
		const CUSTOM_VALUE = '2';
		const component = mount(<AdvancedSelect value={CUSTOM_VALUE} />);
		expect(component.prop('value')).toBe(CUSTOM_VALUE);
	});

	it('should throw error for invalid default value', () => {
		global.console = { error: jest.fn() };

		expect(console.error).not.toBeCalled();
		shallow(<AdvancedSelect value="this is invalid" />);
		expect(console.error).toBeCalled();
	});
	it('should not throw error for undefined value', () => {
		global.console = { error: jest.fn() };

		expect(console.error).not.toBeCalled();
		shallow(<AdvancedSelect value={undefined} />);
		expect(console.error).not.toBeCalled();
	});
});
