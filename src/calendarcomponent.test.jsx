import React from 'react';
import TestUtils from 'react-addons-test-utils';
import CalendarComponent from './CalendarComponent';

describe('CalendarComponent', function() {

	let calendarComponent,
		onFocusSpy,
		onBlurSpy;

	const id = 'beyonce',
		name = 'halo',
		className = 'beyonce-halo',
		value = new Date('2012-10-12'),
		opts = { blue: 'ivy' };

	const mockFunctions = {
		onChangeCallback() {},
		onFocus() {},
		onBlur() {}
	};

	beforeEach(() => {
		onFocusSpy = spyOn(mockFunctions, 'onFocus');
		onBlurSpy = spyOn(mockFunctions, 'onBlur');
		calendarComponent = TestUtils.renderIntoDocument(
			<CalendarComponent
				id={id}
				name={name}
				className={className}
				value={value}
				onChangeCallback={mockFunctions.onChangeCallback}
				onFocus={mockFunctions.onFocus}
				onBlur={mockFunctions.onBlur}
				opts={opts}
				ref={ node => this.node = node }
			/>
		);
	});

	afterEach(() => {
		calendarComponent = null;
		onFocusSpy = null;
		onBlurSpy = null;
	});

	it('exists', function() {
		expect(() => TestUtils.findRenderedComponentWithType(calendarComponent, CalendarComponent)).not.toThrow();
	});

	describe('onOpen', () => {
		it('calls the props onFocus method when it exists', () => {
			calendarComponent.onOpen();
			expect(onFocusSpy).toHaveBeenCalled();
		});
	});

	describe('onClose', () => {
		it('calls the props onBlur method when it exists', () => {
			calendarComponent.onClose();
			expect(onBlurSpy).toHaveBeenCalled();
		});
	});

});
