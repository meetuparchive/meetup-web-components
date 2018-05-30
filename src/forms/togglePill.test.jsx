import React from 'react';
import { mount } from 'enzyme';
import TogglePill, { TOGGLE_PILL_CLASS } from './TogglePill';
import Icon from '../media/Icon';

describe('TogglePill', () => {
	const id = 'hikingCategory',
		name = 'meetupCategories',
		label = 'Hiking!',
		value = 'hiking',
		labelClass = 'someClass';

	let togglePillComponent;
	const onChangeMock = jest.fn();

	beforeEach(() => {
		togglePillComponent = mount(
			<TogglePill
				onChange={onChangeMock}
				id={id}
				name={name}
				labelClassName={labelClass}
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
		expect(togglePillComponent.find(TOGGLE_PILL_CLASS)).not.toBeNull();
	});

	it('executes onChange when clicked', () => {
		const toggleInput = togglePillComponent.find('input');

		expect(onChangeMock).not.toHaveBeenCalled();
		toggleInput.simulate('change');
		expect(onChangeMock).toHaveBeenCalled();
	});


	describe('TogglePill with topic icon', () => {
		const id = 'parentingTopic',
			name = 'topics',
			label = 'Moms and Dads',
			value = 'parenting';


		beforeEach(() => {
			togglePillComponent = mount(
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
			togglePillComponent = null;
		});

		it('creates an Icon component', function() {
			expect(togglePillComponent.find(Icon).length).toBeGreaterThan(0);
		});

	});

	describe('TogglePill with radio input', () => {
		const id = 'parentingTopic',
			name = 'topics',
			label = 'Moms and Dads',
			value = 'parenting';

		beforeEach(() => {
			togglePillComponent = mount(
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
			togglePillComponent = null;
		});

		it('creates a Toggle Pill with a radio input', function() {
			expect(togglePillComponent.find('input[type="radio"]').length).toBeGreaterThan(0);
		});

	});
});
