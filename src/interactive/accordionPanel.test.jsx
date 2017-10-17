import React from 'react';
import { shallow, mount } from 'enzyme';

import AccordionPanel, { ACTIVEPANEL_CLASS } from './AccordionPanel';
import Icon from '../media/Icon';
import {TOGGLE_SWITCH_CLASS} from '../forms/ToggleSwitch';

describe('AccordionPanel', function() {
	let panel,
		openPanel;

	const customIcon = 'plus';
	const customIconActive = 'minus';

	let panelStateCallback;

	beforeEach(() => {
		panelStateCallback = jest.fn();
		jest.spyOn(AccordionPanel.prototype, 'getHeight').mockImplementation(() => {});

		panel = shallow(
			<AccordionPanel
				label='First Section'
				setClickedPanel={panelStateCallback}
				panelContent={
					<div className='runningText'>
						<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>
					</div>
				} />
		);

		openPanel = shallow(
			<AccordionPanel
				isOpen
				label='First Section'
				panelContent={
					<div className='runningText'>
						<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>
					</div>
				} />
		);
	});

	afterEach(() => {
		panel = null;
		openPanel = null;
		panelStateCallback = null;
	});

	describe('basic panel behavior', () => {

		it('exists and renders with mock props', () => {
			expect(panel).toMatchSnapshot();
		});

		it(`has the class ${ACTIVEPANEL_CLASS} when props is open`, function() {
			const node = openPanel.find(`.${ACTIVEPANEL_CLASS}`);
			expect(node.length).toBe(1);
		});

		it('calls setPanelState callback onClick', function() {
			const btn = panel.find('button');
			const isOpen = panel.prop('isOpen');

			expect(panelStateCallback).not.toHaveBeenCalled();
			btn.simulate('click', { target: panel, preventDefault: jest.fn(), stopPropagation: jest.fn() });
			expect(panelStateCallback).toHaveBeenCalledWith(panel.prop('clickId'), !isOpen);
		});

		it('should render an icon component', function(){
			const node = panel.find(Icon);
			expect(node.length).toBe(1);
		});
	});

	describe('right aligned panel icon', () => {
		let panelLeftIcon;

		beforeEach(() => {
			panelLeftIcon = mount(
				<AccordionPanel
					label='First Section'
					indicatorAlign='left'
					panelContent={
						<div className='runningText'>
							<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>
						</div>
					} />
			);
		});

		afterEach(() => {
			panelLeftIcon = null;
		});

		it('exists and renders icon left', () => {
			expect(panelLeftIcon).toMatchSnapshot();
		});

		it('reverses Flex direction when icon is right-aligned', () => {
			const node = panelLeftIcon.find('.atAll_flex--rowReverse');
			expect(node.length).toBe(1);
		});
	});

	describe('panel with custom icon', () => {

		let panelCustomIcon;

		beforeEach(() => {
			panelCustomIcon = shallow(
				<AccordionPanel
					label='First Section'
					indicatorAlign='left'
					indicatorIcon={customIcon}
					indicatorIconActive={customIconActive}
					panelContent={
						<div className='runningText'>
							<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>
						</div>
					} />
			);
		});

		afterEach(() => {
			panelCustomIcon = null;
		});

		it('should exist and render custom icons', function(){
			expect(panelCustomIcon).toMatchSnapshot();
		});
	});

	describe('panel with toggle switch', () => {
		let panelSwitch,
			handleToggleSpy;

		beforeEach(() => {
			handleToggleSpy = jest.spyOn(AccordionPanel.prototype, '_handleToggle').mockImplementation(() => {});

			panelSwitch = mount(
				<AccordionPanel
					label='First Section'
					indicatorAlign='left'
					indicatorSwitch
					panelContent={
						<div className='runningText'>
							<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>
						</div>
					} />
			);
		});

		afterEach(() => {
			panelSwitch = null;
		});

		it('should exist and render a toggle switch', function(){
			expect(panelSwitch).toMatchSnapshot();
		});

		it('should call handleToggle when clicking toggle switch', function() {
			const switchNode = panelSwitch.find(`.${TOGGLE_SWITCH_CLASS}`); // replace with ToggleSwitch

			expect(handleToggleSpy).not.toHaveBeenCalled();
			switchNode.simulate('click');
			expect(handleToggleSpy).toHaveBeenCalled();
		});
	});
});
