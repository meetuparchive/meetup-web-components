
import React from 'react';
import { mount } from 'enzyme';
import TimeInput, {
	HIDDEN_INPUT_CLASS,
	HOURS_INPUT_CLASS,
	MINUTES_INPUT_CLASS,
	MERIDIAN_INPUT_CLASS
} from './TimeInput';


describe('TimeInput', function() {

	let component,
		component12Hr,
		hiddenInputEl,
		hoursInputEl,
		minutesInputEl,
		inputEl,
		onChangeSpy,
		onNumberChangeSpy,
		onMeridianChangeSpy;

	const onChangePropMock = jest.fn(),
		newTime = '23:00',
		overMax = 666,
		underMax = -666;

	const props = {
		name: 'time',
		value: '22:12',
		onChange: onChangePropMock,
		required: true
	};

	describe('TimeInput, with input[time] support', () => {
		beforeEach(() => {
			onChangeSpy = jest.spyOn(TimeInput.prototype, 'onChange');
			component = mount(<TimeInput {...props} />);
			inputEl = component.find('input');
		});

		afterEach(() => {
			component = null;
			inputEl = null;
			onChangeSpy.mockClear();
		});

		it('renders a time html input with expected props', function() {
			expect(component).toMatchSnapshot();
		});

		it('calls internal onChange when value is changed', function() {
			inputEl.simulate('change', { target: { value: newTime } });
			expect(onChangeSpy).toHaveBeenCalled();
		});

		it('calls onChange prop when value is changed', function() {
			const e = { target: { value: newTime } };
			component.instance().onChange(e);
			expect(onChangePropMock).toHaveBeenCalledWith(e);
		});
	});

	describe('TimeInput, without input[time] support', () => {
		beforeEach(() => {
			onChangeSpy = jest.spyOn(TimeInput.prototype, 'onChange');
			onNumberChangeSpy = jest.spyOn(TimeInput.prototype, 'onNumberChange');
			onMeridianChangeSpy = jest.spyOn(TimeInput.prototype, 'onMeridianChange');
			component = mount(<TimeInput {...props} />);
			component12Hr = mount(<TimeInput is24Hr={false} {...props} />);
			component.setState({supportsTime: false});
			component12Hr.setState({supportsTime: false});
			hiddenInputEl = component.find(`.${HIDDEN_INPUT_CLASS}`);
			hoursInputEl = component.find(`.${HOURS_INPUT_CLASS}`);
			minutesInputEl = component.find(`.${MINUTES_INPUT_CLASS}`);
		});

		afterEach(() => {
			component = null;
			hiddenInputEl = null;
			hoursInputEl = null;
			minutesInputEl = null;
			onChangeSpy.mockClear();
			onNumberChangeSpy.mockClear();
		});

		it('renders fallback html inputs', function() {
			expect(hiddenInputEl.length).toBe(1);
		});

		it('calls internal onChange when value is changed', function() {
			hiddenInputEl.simulate('change', { target: { value: newTime } });
			expect(onChangeSpy).toHaveBeenCalled();
		});

		it('calls onChange prop when value is changed', function() {
			const e = { target: { value: newTime } };
			component.instance().onChange(e);
			expect(onChangePropMock).toHaveBeenCalledWith(e);
		});

		it('renders the meridian input for 12hr time', function() {
			const meridianInput = component12Hr.find(`select.${MERIDIAN_INPUT_CLASS}`);

			console.log(meridianInput);

			meridianInput.simulate('change', { target: { value: 'PM' } });

			expect(onMeridianChangeSpy).toHaveBeenCalled();
		});

		it('does not render meridian input for 24hr time', function() {
			expect(component.find(`.${MERIDIAN_INPUT_CLASS}`).length).toBe(0);
		});

		it('reflects the correct time, in 24hr format, in the hidden input', function() {
			const hoursVal = hoursInputEl.prop('value');
			const minutesVal = minutesInputEl.prop('value');
			const hiddenVal = hiddenInputEl.prop('value');

			expect(`${hoursVal}:${minutesVal}`).toEqual(hiddenVal);
		});

		it('does not accept hour values outside the minimum or maximum', function() {
			hoursInputEl.instance().value = overMax;
			hoursInputEl.simulate('change');
			hoursInputEl.simulate('blur');

			expect(parseInt(hoursInputEl.instance().value, 10)).toEqual(hoursInputEl.prop('max'));

			hoursInputEl.instance().value = underMax;
			hoursInputEl.simulate('change');
			hoursInputEl.simulate('blur');

			expect(parseInt(hoursInputEl.instance().value, 10)).toEqual(hoursInputEl.prop('min'));
		});

		it('does not accept minute values outside the minimum or maximum', function() {
			minutesInputEl.instance().value = overMax;
			minutesInputEl.simulate('change');
			minutesInputEl.simulate('blur');

			expect(parseInt(minutesInputEl.instance().value, 10)).toEqual(minutesInputEl.prop('max'));

			minutesInputEl.instance().value = underMax;
			minutesInputEl.simulate('change');
			minutesInputEl.simulate('blur');

			expect(parseInt(minutesInputEl.instance().value, 10)).toEqual(minutesInputEl.prop('min'));
		});


	});

});

