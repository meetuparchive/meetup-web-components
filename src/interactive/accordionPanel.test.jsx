import React from 'react';
import { shallow, mount } from 'enzyme';

import AccordionPanel, { ACTIVEPANEL_CLASS } from './AccordionPanel';
import Icon from '../media/Icon';
import ToggleSwitch from '../forms/ToggleSwitch';

describe('AccordionPanel', function() {
	let panel,
		openPanel;

	const customIcon = 'plus';
	const customIconActive = 'minus';

	let panelStateCallback,
		onClickCallback;

	beforeEach(() => {
		panelStateCallback = jest.fn();
		onClickCallback = jest.fn();

		jest.spyOn(AccordionPanel.prototype, 'getPanelStyle').mockImplementation(() => {});

		panel = shallow(
			<AccordionPanel
				label='First Section'
				setClickedPanel={panelStateCallback}
				onClickCallback={onClickCallback}
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
		onClickCallback = null;
		panelStateCallback = null;
	});

	describe('Panel basic behavior', () => {

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

		it('calls onClickCallback onClick', function() {
			const btn = panel.find('button');
			const isOpen = panel.prop('isOpen');
			const fakeEvent = { target: panel, preventDefault: jest.fn(), stopPropagation: jest.fn() };

			expect(onClickCallback).not.toHaveBeenCalled();
			btn.simulate('click', fakeEvent);
			expect(onClickCallback).toHaveBeenCalledWith(fakeEvent, !isOpen);
		});


		it('renders an icon component', function(){
			const node = panel.find(Icon);
			expect(node.length).toBe(1);
		});
	});

	describe('Panel with right aligned icon', () => {
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

	describe('Panel with custom icon', () => {

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

		it('exists and renders a custom icon', function(){
			expect(panelCustomIcon).toMatchSnapshot();
		});
	});

	describe('Panel with toggle switch', () => {
		let panelSwitch,
			handleToggleSpy;

		beforeEach(() => {
			handleToggleSpy = jest.spyOn(AccordionPanel.prototype, '_handleToggle').mockImplementation(() => {});

			panelSwitch = mount(
				<AccordionPanel
					indicatorSwitch
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
			panelSwitch = null;
			handleToggleSpy.mockRestore();
		});

		it('exists and renders a toggle switch', function(){
			expect(panelSwitch).toMatchSnapshot();
		});

		it('calls handleToggle when toggle switch is clicked', function() {
			const switchNode = panelSwitch.find(ToggleSwitch);
			expect(handleToggleSpy).not.toHaveBeenCalled();
			switchNode.find('button').simulate('click');
			expect(handleToggleSpy).toHaveBeenCalled();
		});

		it('calls custom function and does not call handleToggle when toggle switch is clicked and onToggleClick is specified', function() {
			const onToggleClickCallback = jest.fn();
			const onToggleClickSpy = jest.spyOn(AccordionPanel.prototype, 'onToggleClick');
			const panelOnToggleClick = mount(
				<AccordionPanel
					indicatorSwitch
					onToggleClick={onToggleClickCallback}
					label='First Section'
					indicatorAlign='left'
					panelContent={
						<div className='runningText'>
							<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>
						</div>
					} />
			);
			const switchNode = panelOnToggleClick.find(ToggleSwitch);
			expect(onToggleClickSpy).not.toHaveBeenCalled();
			switchNode.find('button').simulate('click');
			expect(handleToggleSpy).not.toHaveBeenCalled();
			expect(onToggleClickSpy).toHaveBeenCalled();
		});

	});
});
