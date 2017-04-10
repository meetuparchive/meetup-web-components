import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import TogglePill, { TOGGLE_PILL_CLASS } from './TogglePill';
import Icon from '../media/Icon';

describe('TogglePill', () => {
	const id = 'togglePillId',
		name = 'togglePillName',
		label = 'Toggle Pill Label',
		value = 'Toggle Pill Value';

	let togglePillEl;

	beforeEach(() => {
		const togglePill = TestUtils.renderIntoDocument(
			<TogglePill
				id={id}
				name={name}
				value={value}>
				{label}
			</TogglePill>
		);

		togglePillEl = ReactDOM.findDOMNode(togglePill);
	});

	afterEach(() => {
		togglePillEl = null;
	});

	it('exists', () => {
		expect(togglePillEl).not.toBeNull();
	});

	it('has SQ2 toggle-pill styles', () => {
		expect(togglePillEl.classList.contains(TOGGLE_PILL_CLASS)).toBe(true);
	});

	it('creates an input element', () => {
		const len = togglePillEl.getElementsByTagName('INPUT').length;
		expect(len).toBe(1);
	});

	it('creates a label element', () => {
		const len = togglePillEl.getElementsByTagName('LABEL').length;
		expect(len).toBe(1);
	});

	it('executes onChange when clicked', () => {
		const spyable = {
			onChange: (e) => {}
		};

		spyOn(spyable, 'onChange');
		const togglePill = TestUtils.renderIntoDocument(
			<TogglePill
				onChange={spyable.onChange}
				id={id}
				name={name}
				value={value}>
				{label}
			</TogglePill>);
		const togglePillEl = ReactDOM.findDOMNode(togglePill);

		expect(togglePillEl.getElementsByTagName('input').length).toEqual(1);
		const input = togglePillEl.getElementsByTagName('input')[0];

		TestUtils.Simulate.change(input);

		expect(spyable.onChange).toHaveBeenCalled();
	});


	describe('TogglePill with icon', () => {
		const id = 'togglePillId',
			name = 'togglePillName',
			label = 'Toggle Pill Label',
			value = 'Toggle Pill Value';

		let togglePill;

		beforeEach(() => {
			togglePill = TestUtils.renderIntoDocument(
				<TogglePill
					topic
					id={id}
					name={name}
					value={value}>
					{label}
				</TogglePill>
			);
		});


		afterEach(() => {
			togglePill = null;
		});


		it('creates an Icon component', function() {
			const len = TestUtils.scryRenderedComponentsWithType(togglePill, Icon).length;
			expect(len).toBeGreaterThan(0);
		});

	});
});
