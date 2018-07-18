import React from 'react';
import { shallow } from 'enzyme';
import FieldsetTime, {
	HOURS_INPUT_CLASS,
	HOURS_INPUT_NAME,
	MINUTES_INPUT_CLASS,
	MINUTES_INPUT_NAME,
} from './FieldsetTime';

describe('FieldsetTime', () => {
	const MOCK_PROPS = {
		name: 'mocktime',
		value: '12:15',
		onChange: jest.fn(),
		required: true,
	};

	const render = (props = MOCK_PROPS) => shallow(<FieldsetTime {...props} />);
	[true, false].forEach(is24Hr => {
		describe(`FieldsetTime with is24hr=${is24Hr}`, () => {
			it('renders expected elements', () => {
				expect(render({ ...MOCK_PROPS, is24Hr })).toMatchSnapshot();
			});
			[
				{ name: HOURS_INPUT_NAME, className: HOURS_INPUT_CLASS },
				{ name: MINUTES_INPUT_NAME, className: MINUTES_INPUT_CLASS },
			].forEach(({ name, className }) => {
				it(`calls props.onChange with full time value when ${name} value is changed`, () => {
					MOCK_PROPS.onChange.mockClear();
					const inputTarget = {
						name,
						value: '11',
					};
					const wrapper = render({ ...MOCK_PROPS, is24Hr });
					const inputWrapper = wrapper.find(`input.${className}`);
					expect(MOCK_PROPS.onChange).not.toHaveBeenCalled();
					inputWrapper.simulate('change', {
						target: { ...inputTarget },
					});
					expect(MOCK_PROPS.onChange).toHaveBeenCalled();
					expect(MOCK_PROPS.onChange.mock.calls[0]).toMatchSnapshot();
				});
			});
		});
	});
});
