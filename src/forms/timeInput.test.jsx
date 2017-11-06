
import React from 'react';
import { mount } from 'enzyme';
import TimeInput, {
	HOURS_INPUT_CLASS,
	MINUTES_INPUT_CLASS,
	MERIDIAN_INPUT_CLASS
} from './TimeInput';


describe('TimeInput', function() {

	let component,
		component12Hr,
		hoursInputEl,
		minutesInputEl,
		inputEl,
		onChangeSpy,
		onNumberChangeSpy,
		onMeridianChangeSpy,
		onTimeInputChangeSpy;

	const onChangePropMock = jest.fn(),
		newTime = '23:00',
		newHour = '23',
		overMax = '666',
		underMax = '-666';

	const props = {
		name: 'time',
		value: '22:12',
		onChange: onChangePropMock,
		required: true
	};

	describe('TimeInput, with input[time] support', () => {
		beforeEach(() => {
			onChangeSpy = jest.spyOn(TimeInput.prototype, 'onChange');
			onTimeInputChangeSpy = jest.spyOn(TimeInput.prototype, 'onTimeInputChange');
			component = mount(<TimeInput {...props} />);
			inputEl = component.find('input');
		});

		afterEach(() => {
			component = null;
			inputEl = null;
			onChangeSpy.mockClear();
			onTimeInputChangeSpy.mockClear();
		});

		it('renders a time html input with expected props', function() {
			expect(component).toMatchSnapshot();
		});

		it('calls onTimeInputChange when value is changed', function() {
			inputEl.simulate('change', { target: { value: newTime } });
			expect(onTimeInputChangeSpy).toHaveBeenCalled();
		});

		it('calls onChange prop when value is changed', function() {
			component.instance().onChange(newTime);
			expect(onChangePropMock).toHaveBeenCalledWith(newTime);
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
			hoursInputEl = component.find(`.${HOURS_INPUT_CLASS}`);
			minutesInputEl = component.find(`.${MINUTES_INPUT_CLASS}`);
		});

		afterEach(() => {
			component = null;
			hoursInputEl = null;
			minutesInputEl = null;
			onChangeSpy.mockClear();
			onNumberChangeSpy.mockClear();
		});

		it('calls internal onChange when value is changed', function() {
			hoursInputEl.simulate('change', { target: { value: newHour } });
			hoursInputEl.simulate('blur');

			expect(onChangeSpy).toHaveBeenCalled();
		});

		it('calls onChange prop when value is changed', function() {
			component.instance().onChange(newHour);
			hoursInputEl.simulate('blur');

			expect(onChangePropMock).toHaveBeenCalledWith(newTime);
		});

		it('renders the meridian input for 12hr time', function() {
			const meridianInput = component12Hr.find(`select.${MERIDIAN_INPUT_CLASS}`);

			meridianInput.simulate('change', { target: { value: 'PM' } });

			expect(onMeridianChangeSpy).toHaveBeenCalled();
		});

		it('does not render meridian input for 24hr time', function() {
			expect(component.find(`.${MERIDIAN_INPUT_CLASS}`).length).toBe(0);
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

		it('should update time value when receiving hours or minutes prop', () => {
			const instance = component.instance();
			const newDigits = { value: '23:00', is24Hr: true };

			jest.spyOn(instance, 'setState');
			instance.componentWillReceiveProps(newDigits);
			expect(instance.setState).toHaveBeenCalledWith({hours: '23', minutes: '00'});
		});

	});

});

