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
		opts = { dateFormat: 'm-d-Y' };

	const onChangeCallback = jest.fn();

	beforeEach(() => {
		calendarComponent = shallow(
			<CalendarComponent
				id={id}
				name={name}
				className={className}
				value={value}
				datepickerOptions={opts}
				onChangeCallback={onChangeCallback}
				ref={ node => this.node = node }
			/>
		);
		calendarComponent.instance().componentDidMount();
	});

	afterEach(() => {
		calendarComponent = null;
	});

	it('renders the calendarComponent with appropriate attributes', function() {
		expect(calendarComponent).toMatchSnapshot();
	});

	describe('onChange callback tests', () => {

		let calendarComponent,
			onChangePropMock,
			callbackMock;

		beforeEach(() => {
			onChangePropMock = jest.fn();
			callbackMock = jest.fn();

			calendarComponent = shallow(
				<CalendarComponent
					id={id}
					name={name}
					className={className}
					onChange={onChangePropMock}
					onChangeCallback={callbackMock}
				/>
			);
		});

		afterEach(() => {
			calendarComponent = null;
		});

		// because we are rendering shallow here, flatpickr isnt
		// instantiated (because componentDidMount not called)
		// just using direct calls to flatpickr change to test

		it('calls onChange prop if one is provided, as with redux-form', function() {
			calendarComponent.instance().onFlatpickrChange([newValue]);
			expect(onChangePropMock).toHaveBeenCalledWith(newValue);
		});

	});

	describe('onBlur onFocus callback tests', () => {

		let cal,
			onFocusMock,
			onBlurMock;

		beforeEach(() => {
			onFocusMock = jest.fn();
			onBlurMock = jest.fn();

			cal = shallow(
				<CalendarComponent
					id={id}
					name={name}
					className={className}
					onFocus={onFocusMock}
					onBlur={onBlurMock}
				/>
			);
		});

		afterEach(() => {
			cal = null;
			onFocusMock.mockClear();
			onBlurMock.mockClear();
		});

		it('onOpen calls the props onFocus method when it exists', () => {
			cal.instance().onOpen();
			expect(onFocusMock).toHaveBeenCalled();
		});

		it('onClose calls the props onBlur method when it exists', () => {
			cal.instance().onClose();
			expect(onBlurMock).toHaveBeenCalled();
		});
	});
});
