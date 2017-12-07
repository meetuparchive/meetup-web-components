import React from 'react';
import { shallow } from 'enzyme';
import { CalendarComponent } from './CalendarComponent';

describe('CalendarComponent', function() {
	let calendarComponent;

	const id = 'beyonce',
		name = 'halo',
		className = 'beyonce-halo',
		value = new Date('2012-10-12'),
		newValue = new Date('2020-10-12'),
		opts = { dateFormat: 'm-d-Y' };

	const onChangeCallback = jest.fn();

	it('renders the calendarComponent with appropriate attributes', function() {
		calendarComponent = shallow(
			<CalendarComponent
				id={id}
				name={name}
				className={className}
				value={value}
				datepickerOptions={opts}
				onChangeCallback={onChangeCallback}
				error="this is an error"
				ref={node => (this.node = node)}
			/>
		);
		calendarComponent.instance().componentDidMount();
		expect(calendarComponent).toMatchSnapshot();
		calendarComponent = null;
	});

	describe('onChange callback tests', () => {
		let calendarComponent, onChangePropMock, callbackMock;

		// because we are rendering shallow here, flatpickr isnt
		// instantiated (because componentDidMount not called)
		// just using direct calls to flatpickr change to test

		it('calls onChange prop if one is provided, as with redux-form', function() {
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
			expect(onChangePropMock).not.toHaveBeenCalled();
			calendarComponent.instance().onFlatpickrChange([newValue]);
			expect(onChangePropMock).toHaveBeenCalledWith(newValue);
			calendarComponent = null;
		});
	});

	describe('onBlur onFocus callback tests', () => {
		let cal, onFocusMock, onBlurMock;

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
			expect(onFocusMock).not.toHaveBeenCalled();
			cal.instance().onOpen();
			expect(onFocusMock).toHaveBeenCalled();
		});

		it('onClose calls the props onBlur method when it exists', () => {
			expect(onBlurMock).not.toHaveBeenCalled();
			cal.instance().onClose();
			expect(onBlurMock).toHaveBeenCalled();
		});
	});

	describe('componentWillReceiveProps', () => {
		it('should updateFlatpickrOptions when receiving datepickerOptions prop', () => {
			const instance = shallow(<CalendarComponent name="test" />).instance();
			const datepickerOptions = { option1: true };

			instance.flatpickr = { setDate: jest.fn() };

			jest
				.spyOn(instance, 'updateFlatpickrOptions')
				.mockImplementation(() => {});

			instance.componentWillReceiveProps({ datepickerOptions });

			expect(instance.updateFlatpickrOptions).toHaveBeenCalledWith(
				datepickerOptions
			);
		});
	});

	describe('updateFlatpickrOptions', () => {
		it('should update flatpickr with updated options', () => {
			const optionThatDoesntChange = 'will not change';

			const wrapper = shallow(
				<CalendarComponent
					name="test"
					datepickerOptions={{
						optionThatDoesntChange,
						maxDate: 1507751589972,
					}}
				/>
			);

			const instance = wrapper.instance();

			instance.flatpickr = {
				set: jest.fn(),
			};

			const minDate = 12345;
			const maxDate = 67890;

			instance.updateFlatpickrOptions({
				minDate,
				maxDate,
				optionThatDoesntChange,
			});

			expect(instance.flatpickr.set).toHaveBeenCalledWith('maxDate', maxDate);
			expect(instance.flatpickr.set).toHaveBeenCalledWith('minDate', minDate);
			expect(instance.flatpickr.set).not.toHaveBeenCalledWith(
				'optionThatDoesntChange',
				optionThatDoesntChange
			);
		});
	});
});
