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
						currentTarget: { ...inputTarget },
					});
					inputWrapper.simulate('blur', {
						currentTarget: { ...inputTarget },
					});
					expect(MOCK_PROPS.onChange).toHaveBeenCalledTimes(2);
					expect(MOCK_PROPS.onChange.mock.calls).toMatchSnapshot();
				});
			});

			// 	describe('getTimeParts', () => {
			// 		it('returns an object of hours, min, meridian from a time string', () => {
			// 			const result = getTimeParts('13:00');
			// 			const expected = {
			// 				hours: '13',
			// 				minutes: '00',
			// 				meridian: 'PM',
			// 			};
			// 			expect(result).toEqual(expected);
			// 		});
			// 	});

			// 	describe('parseValueForState', () => {
			// 		it('takes a value string for 24Hr time and returns an object with hours, min, meridian, value', () => {
			// 			const value = '13:00',
			// 				is24Hr = true;
			// 			const result = FieldsetTime.prototype.parseValueIntoState(value, is24Hr);
			// 			const expected = {
			// 				hours: '13',
			// 				minutes: '00',
			// 				meridian: false,
			// 				value,
			// 			};
			// 			expect(result).toEqual(expected);
			// 		});
			// 		it('takes a value string, is24hr as false, and returns an object with hours, min, meridian, value', () => {
			// 			const value = '13:15',
			// 				is24Hr = false;
			// 			const result = FieldsetTime.prototype.parseValueIntoState(value, is24Hr);
			// 			const expected = {
			// 				hours: '01',
			// 				minutes: '15',
			// 				meridian: 'PM',
			// 				value,
			// 			};
			// 			expect(result).toEqual(expected);
			// 		});
			// 	});

			// 	describe('constrainValue', () => {
			// 		it('returns the same value if no min and max', () => {
			// 			const value = '10';
			// 			const result = FieldsetTime.prototype.constrainValue(
			// 				undefined,
			// 				undefined,
			// 				value
			// 			);
			// 			expect(result).toEqual(parseInt(value));
			// 		});
			// 		it('returns the same value if within min and max', () => {
			// 			const value = '10';
			// 			const result = FieldsetTime.prototype.constrainValue(2, 22, value);
			// 			expect(result).toEqual(parseInt(value));
			// 		});
			// 		it('returns the constrained value if min', () => {
			// 			const value = '10';
			// 			const min = 20;
			// 			const result = FieldsetTime.prototype.constrainValue(
			// 				min,
			// 				undefined,
			// 				value
			// 			);
			// 			expect(result).toEqual(min);
			// 		});
			// 		it('returns the constrained value if max', () => {
			// 			const value = '10';
			// 			const max = 5;
			// 			const result = FieldsetTime.prototype.constrainValue(
			// 				undefined,
			// 				max,
			// 				value
			// 			);
			// 			expect(result).toEqual(max);
			// 		});
		});
	});
});
