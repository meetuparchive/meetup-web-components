import React from 'react';
import { shallow } from 'enzyme';
import FieldsetTime, {
	HOURS_INPUT_CLASS,
	HOURS_INPUT_NAME,
	MINUTES_INPUT_CLASS,
	MINUTES_INPUT_NAME,
	UP_ARROW,
	DOWN_ARROW,
} from './FieldsetTime';

// TODO: could use some inline snapshots here - upgrade Jest to make it happen
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
					expect(MOCK_PROPS.onChange.mock.calls[0][0]).toMatchSnapshot();
				});
				[UP_ARROW, DOWN_ARROW].forEach(keyCode => {
					['00:00', '23:59'].forEach(value => {
						it(`increments/wraps ${value} on keyboard input (${keyCode}) in ${name} input`, () => {
							// this test verifies general up/down behavior as well
							MOCK_PROPS.onChange.mockClear();
							const target = {
								name,
								value: '11',
							};
							const event = {
								target,
								currentTarget: target,
								keyCode,
								preventDefault: jest.fn(),
							};
							const wrapper = render({
								...MOCK_PROPS,
								value: '00:00',
								is24Hr,
							});
							const inputWrapper = wrapper.find(`input.${className}`);
							expect(MOCK_PROPS.onChange).not.toHaveBeenCalled();
							inputWrapper.simulate('keydown', event);
							expect(MOCK_PROPS.onChange).toHaveBeenCalled();
							expect(event.preventDefault).toHaveBeenCalled();
							expect(
								MOCK_PROPS.onChange.mock.calls[0][0]
							).toMatchSnapshot();
						});
					});
				});
			});
		});
	});
	const AMPM_MAP = {
		0: 'AM',
		1: 'PM',
	};
	Object.keys(AMPM_MAP).forEach(value => {
		['12:00', '01:00', '00:00'].forEach(time => {
			it(`updates ${time} value based on meridian change to ${
				AMPM_MAP[value]
			}`, () => {
				MOCK_PROPS.onChange.mockClear();
				const target = { name: 'meridian', value };
				const wrapper = render({ ...MOCK_PROPS, is24Hr: false, value: time });
				expect(MOCK_PROPS.onChange).not.toHaveBeenCalled();
				wrapper.instance().onMeridianChange({ target });
				expect(MOCK_PROPS.onChange).toHaveBeenCalled();
				expect(MOCK_PROPS.onChange.mock.calls[0][0]).toMatchSnapshot();
			});
		});
	});
});
