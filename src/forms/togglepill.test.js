import React from 'react';
import { mount } from 'enzyme';
import TogglePill, { TOGGLE_PILL_CLASS } from './TogglePill';
import Icon from '../media/Icon';

describe('TogglePill', () => {
	const id = 'hikingCategory',
		name = 'meetupCategories',
		label = 'Hiking!',
		value = 'hiking';

	let togglePillComponent;

	beforeEach(() => {
		togglePillComponent = mount(
			<TogglePill
				id={id}
				name={name}
				value={value}>
				{label}
			</TogglePill>
		);
	});

	afterEach(() => {
		togglePillComponent = null;
	});

	it('renders a component with expected attributes', () => {
		expect(togglePillComponent).toMatchSnapshot();
	});

	it('has appropriate toggle pill class', () => {
		console.log('TPC', TOGGLE_PILL_CLASS);
		expect(togglePillComponent.find(TOGGLE_PILL_CLASS)).not.toBeNull();
	});

	it('executes onChange when clicked', () => {
		const onChangeMock = jest.fn();
		const toggleInput = mount(
			<TogglePill
				onChange={onChangeMock}
				id={id}
				name={name}
				value={value}>
				{label}
			</TogglePill>).find('input');


		toggleInput.simulate('change');
		expect(onChangeMock).toHaveBeenCalled();
	});


	describe('TogglePill with topic icon', () => {
		const id = 'parentingTopic',
			name = 'topics',
			label = 'Moms and Dads',
			value = 'parenting';

		let togglePill;

		beforeEach(() => {
			togglePill = mount(
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
			expect(togglePill.find(Icon).length).toBeGreaterThan(0);
		});

	});

	describe('TogglePill with radio input', () => {
		const id = 'parentingTopic',
			name = 'topics',
			label = 'Moms and Dads',
			value = 'parenting';

		let togglePill;

		beforeEach(() => {
			togglePill = mount(
				<TogglePill
					useRadio
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


		it('creates a Toggle Pill with a radio input', function() {
			expect(togglePill.find('input[type="radio"]').length).toBeGreaterThan(0);
		});

	});
});
