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

			// 		it('onNumberChange does not update state when receiving non-numeric characters', () => {
			// 			const initialHrStateValue = component.instance().state.hours;
			// 			hoursInputEl.simulate('change', { target: { value: '2h' } });
			// 			component.update();
			// 			expect(onNumberChangeSpy).toHaveBeenCalled();
			// 			expect(component.instance().state.hours).toBe(initialHrStateValue);
			// 		});

			// 		it('calls onChange prop when value is changed', () => {
			// 			component.instance().onChange(newHour);
			// 			hoursInputEl.simulate('blur');

			// 			expect(onChangePropMock).toHaveBeenCalledWith(newTime);
			// 		});

			// 		it('calls onChange prop with appropriately formatted time', () => {
			// 			component.setState(
			// 				component.instance().parseValueIntoState('15:15', true)
			// 			);
			// 			onChangePropMock.mockClear();

			// 			hoursInputEl.instance().value = '1';
			// 			hoursInputEl.simulate('change');
			// 			hoursInputEl.simulate('blur');

			// 			expect(onChangePropMock).toHaveBeenCalledWith('01:15');
			// 		});

			// 		it('calls onChange prop with appropriately formatted time, hours from 12 into 24Hr', () => {
			// 			const hoursInputEl_12Hr = component12Hr.find(`.${HOURS_INPUT_CLASS}`);
			// 			const meridianInputEl = component12Hr.find(
			// 				`select.${MERIDIAN_INPUT_CLASS}`
			// 			);

			// 			component12Hr.setState(
			// 				component.instance().parseValueIntoState('15:15', false)
			// 			);
			// 			onChangePropMock.mockClear();

			// 			meridianInputEl.instance().value = 'PM';
			// 			meridianInputEl.simulate('change');

			// 			hoursInputEl_12Hr.instance().value = '1';
			// 			hoursInputEl_12Hr.simulate('change');
			// 			hoursInputEl_12Hr.simulate('blur');

			// 			expect(onChangePropMock).toHaveBeenCalledWith('13:15');
			// 		});

			// 		it('renders the meridian input for 12hr time', function() {
			// 			const meridianInputEl = component12Hr.find(
			// 				`select.${MERIDIAN_INPUT_CLASS}`
			// 			);
			// 			meridianInputEl.simulate('change', { target: { value: 'PM' } });

			// 			expect(onMeridianChangeSpy).toHaveBeenCalled();
			// 		});

			// 		it('does not render meridian input for 24hr time', function() {
			// 			expect(component.find(`select.${MERIDIAN_INPUT_CLASS}`).length).toBe(0);
			// 		});

			// 		it('does not accept hour values outside the minimum or maximum', function() {
			// 			hoursInputEl.instance().value = overMax;
			// 			hoursInputEl.simulate('change');
			// 			hoursInputEl.simulate('blur');

			// 			expect(parseInt(hoursInputEl.instance().value, 10)).toEqual(
			// 				hoursInputEl.prop('max')
			// 			);

			// 			// We don't allow charcters other than 0 through 9, therefore it is impossible to
			// 			// enter a value less than the min (no negative signs accepted)
			// 		});

			// 		it('does not accept minute values outside the minimum or maximum', function() {
			// 			minutesInputEl.instance().value = overMax;
			// 			minutesInputEl.simulate('change');
			// 			minutesInputEl.simulate('blur');

			// 			expect(parseInt(minutesInputEl.instance().value, 10)).toEqual(
			// 				minutesInputEl.prop('max')
			// 			);

			// 			// We don't allow charcters other than 0 through 9, therefore it is impossible to
			// 			// enter a value less than the min (no negative signs accepted)
			// 		});

			// 		it('should update time value when receiving hours or minutes prop', () => {
			// 			const instance = component.instance();
			// 			const newProps = { value: '23:00', is24Hr: true };
			// 			const expected = FieldsetTime.prototype.parseValueIntoState(
			// 				newProps.value,
			// 				newProps.is24Hr
			// 			);
			// 			jest.spyOn(instance, 'setState');
			// 			instance.componentWillReceiveProps(newProps);
			// 			expect(instance.setState).toHaveBeenCalledWith(expected);
			// 		});

			// 		it('should increase hours or minutes value when pressing up key', () => {
			// 			const newHourValue = parseInt(hourValue, 10) + 1;
			// 			const newMinuteValue = parseInt(minuteValue, 10) + 1;

			// 			expect(parseInt(hoursInputEl.instance().value, 10)).toEqual(
			// 				parseInt(hourValue)
			// 			);
			// 			hoursInputEl.simulate('keyDown', { keyCode: 38 });
			// 			expect(parseInt(hoursInputEl.instance().value, 10)).toEqual(
			// 				parseInt(newHourValue)
			// 			);

			// 			expect(parseInt(minutesInputEl.instance().value, 10)).toEqual(
			// 				parseInt(minuteValue)
			// 			);
			// 			minutesInputEl.simulate('keyDown', { keyCode: 38 });
			// 			expect(parseInt(minutesInputEl.instance().value, 10)).toEqual(
			// 				parseInt(newMinuteValue)
			// 			);
			// 		});

			// 		it('should highlight hours or minutes input text when clicking', () => {
			// 			hoursInputEl.simulate('mouseUp');
			// 			expect(highlightInputTextSpy).toHaveBeenCalled();
			// 		});
			// 	});
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
