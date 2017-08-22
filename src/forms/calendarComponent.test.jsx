import React from 'react';
import { shallow } from 'enzyme';
import CalendarComponent from './CalendarComponent';

describe('CalendarComponent', function() {

	let calendarComponent;

	const id = 'beyonce',
		name = 'halo',
		className = 'beyonce-halo',
		value = new Date('2012-10-12'),
		newValue = new Date('2020-10-12'),
		opts = { blue: 'ivy' };

	const onChangeCallbackMock = jest.fn(),
		onFocusMock = jest.fn(),
		onBlurMock = jest.fn();

	beforeEach(() => {
		calendarComponent = shallow(
			<CalendarComponent
				id={id}
				name={name}
				className={className}
				value={value}
				datetimePickerCallback={onChangeCallbackMock}
				onFocus={onFocusMock}
				onBlur={onBlurMock}
				opts={opts}
				ref={ node => this.node = node }
			/>
		);
		calendarComponent.instance().componentDidMount();
	});

	afterEach(() => {
		calendarComponent = null;
	});

	it('renders the component with appropriate attributes', function() {
		expect(calendarComponent).toMatchSnapshot();
	});

	describe('onOpen', () => {
		it('calls the props onFocus method when one is provided', () => {
			calendarComponent.instance().onOpen();
			expect(onFocusMock).toHaveBeenCalled();
		});
	});

	describe('onClose', () => {
		it('calls the props onBlur method when one is provided', () => {
			calendarComponent.instance().onClose();
			expect(onBlurMock).toHaveBeenCalled();
		});
	});

	describe('onChange', () => {

		let onChangeSpy,
			component,
			onChangePropSpy,
			callbackSpy;

		beforeEach(() => {
			onChangeSpy = jest.spyOn(CalendarComponent.prototype, 'flatpickrChange');
			onChangePropSpy = jest.fn();
			callbackSpy = jest.fn();

			component = shallow(
				<CalendarComponent
					id={id}
					name={name}
					className={className}
					onChange={onChangePropSpy}
					datetimePickerCallback={callbackSpy}
				/>
			);
		});

		afterEach(() => {
			component = null;
			onChangeSpy.mockClear();
		});

		// because we are rendering shallow here, flatpickr isnt
		// instantiated (because componentDidMount not called)
		// just using direct calls to flatpickr change to test

		it('calls internal onChange when value changed', function() {
			component.instance().flatpickrChange([newValue]);
			expect(onChangeSpy).toHaveBeenCalled();
		});

		it('calls onChange prop if one is provided, as with redux-form', function() {
			component.instance().flatpickrChange([newValue]);
			expect(onChangePropSpy).toHaveBeenCalledWith(newValue);
		});

		it('calls a callback with value if one is provided', function() {
			component.instance().flatpickrChange([newValue]);
			expect(callbackSpy).toHaveBeenCalledWith(newValue);
		});
	});
});
