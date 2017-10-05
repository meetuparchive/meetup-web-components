import React from 'react';
import { shallow } from 'enzyme';
import FormSelect from './FormSelect';

const onChangeMock = jest.fn();
const FAVORITE_LINE = 'If thou dost seek to have what thou dost hide,';
const MOCK_OPTIONS = [
	'Love is my sin and thy dear virtue hate',
	'Hate of my sin, grounded on sinful loving:',
	'O, but with mine compare thou thine own state,',
	'And thou shalt find it merits not reproving;',
	'Or, if it do, not from those lips of thine,',
	'That have profaned their scarlet ornaments',
	'And seal\'d false bonds of love as oft as mine,',
	'Robb\'d others\' beds\' revenues of their rents.',
	'Be it lawful I love thee, as thou lovest those',
	'Whom thine eyes woo as mine importune thee:',
	'Root pity in thy heart, that when it grows',
	'Thy pity may deserve to pitied be.',
	FAVORITE_LINE,
	'By self-example mayst thou be denied!'
];
const MOCK_PROPS = {
	id: 'sonnet',
	name: 'sonnets',
	label: 'Shakespearean Sonnet',
	labelClassName: 'labelForSonnet',
	className: 'classForSonnet',
	options: MOCK_OPTIONS,
	onChange: onChangeMock,
	selectedOption: FAVORITE_LINE,
	disabled: true,
	required: true
};
describe('FormSelect', () => {
	it('renders correctly', () => {
		expect(shallow(<FormSelect {...MOCK_PROPS} />)).toMatchSnapshot();
	});
	describe('passing props', () => {
		const component = shallow(<FormSelect {...MOCK_PROPS} />);
		const select = component.find('select');
		it('should have the correct id', () => {
			expect(select.prop('id')).toEqual(MOCK_PROPS.id);
		});
		it('should have the correct name', () => {
			expect(select.prop('name')).toEqual(MOCK_PROPS.name);
		});
		it('should have the correct required status', () => {
			expect(select.prop('required')).toEqual(MOCK_PROPS.required);
		});
		it('should have the correct disabled status', () => {
			expect(select.prop('disabled')).toEqual(MOCK_PROPS.disabled);
		});
		it('should have the correct label', () => {
			expect(component.find('label').text()).toEqual(MOCK_PROPS.label);
		});
	});
	describe('onChange', () => {
		it('calls onChange when option is selected', () => {
			const select = shallow(<FormSelect {...MOCK_PROPS} />).find('select');
			expect(onChangeMock).not.toHaveBeenCalled();
			select.simulate('change');
			expect(onChangeMock).toHaveBeenCalled();
		});
	});
	describe('error', () => {
		it('shows an error when error is a prop', () => {
			const props = {...MOCK_PROPS, error: 'I am erroneous' };
			const component = shallow(<FormSelect {...props} />);
			expect(component.find('.text--error').exists()).toBe(true);
			expect(component.find('.text--error').text()).toBe(props.error);
		});
	});
});
