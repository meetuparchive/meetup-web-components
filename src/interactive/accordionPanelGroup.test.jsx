import React from 'react';
import { mount } from 'enzyme';

import AccordionPanelGroup from './AccordionPanelGroup';
import AccordionPanel, { PANEL_CLASS } from './AccordionPanel';

describe('AccordionPanelGroup', () => {

	const accordionPanelsArr = [
		<AccordionPanel
			label='First Section'
			isOpen
			panelContent={
				<div className='runningText'>
					<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>
				</div>
			} />,
		<AccordionPanel
			label='Next Section'
			panelContent={
				<div>
					<div className='runningText'>
						<p>Any kind of content can go in here, even inputs.</p>
					</div>
					<div className='chunk'>
						<label htmlFor='test-textinput'>I'm a label</label>
						<input id='test-textinput' type='text' placeholder='Input placeholder' />
					</div>
				</div>
			} />,
		<AccordionPanel
			label='Third Section'
			panelContent={
				<div className='runningText'>
					<p>Classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>
				</div>
			} />,
	];

	describe('AccordionPanelGroup, multiselectable', () => {
		let accordionPanelGroup;

		beforeEach(() => {
			accordionPanelGroup = mount(
				<AccordionPanelGroup accordionPanels={accordionPanelsArr} />
			);
		});

		afterEach(() => {
			accordionPanelGroup = null;
		});

		it('should render panels from array', function() {
			expect(accordionPanelGroup).toMatchSnapshot();
		});

		it('should render all the panels given', function() {
			const panels = accordionPanelGroup.find(`.${PANEL_CLASS}`);
			expect(panels.length).toEqual(3);
		});

		it('should give panels a clickId', () => {
			expect(accordionPanelGroup).toMatchSnapshot();
			const panels = accordionPanelGroup.find(AccordionPanel);
			expect(panels.at(0).prop('clickId')).not.toBeUndefined();
			expect(panels.at(1).prop('clickId')).not.toBeUndefined();
			expect(panels.at(2).prop('clickId')).not.toBeUndefined();
		});

		it('should store panel open states in state', () => {
			// should have one open panel to start based on isOpen prop
			const isOpenValues = Object.values(accordionPanelGroup.state('panelStates'));
			const openPanels = isOpenValues.filter((isOpen, i) => isOpen === true);
			const closedPanels = isOpenValues.filter((isOpen, i) => isOpen === false);

			expect(openPanels.length).toEqual(1);
			expect(closedPanels.length).toEqual(2);
		});

		it('should change panel open state with setPanelStates', () => {
			const panels = accordionPanelGroup.find(AccordionPanel);
			const clickId = panels.at(0).prop('clickId');
			const isOpen = panels.at(0).prop('isOpen');

			expect(accordionPanelGroup.state('panelStates')[clickId]).toEqual(isOpen);
			accordionPanelGroup.instance().setPanelStates(clickId, !isOpen);
			expect(accordionPanelGroup.state('panelStates')[clickId]).toEqual(!isOpen);
		});

	});

	describe('AccordionPanelGroup, not multiselectable', () => {
		let accordionPanelGroup,
			setPanelStatesMock;

		beforeEach(() => {
			setPanelStatesMock = jest.spyOn(AccordionPanelGroup.prototype, 'setPanelStates');

			accordionPanelGroup = mount(
				<AccordionPanelGroup accordionPanels={accordionPanelsArr} multiSelectable={false} />
			);
		});

		afterEach(() => {
			accordionPanelGroup = null;
			setPanelStatesMock = null;
		});

		it('should support opening panels one-at-a-time', function(){
			const panelWrappers = accordionPanelGroup.find(AccordionPanel);
			let openPanels = panelWrappers.filterWhere((panel) => panel.prop('isOpen') === true);

			// there is one panel in our test with prop isOpen at first render
			expect(openPanels.length).toBe(1);

			const panel1 = panelWrappers.at(1);
			panel1.find('button').simulate('click');
			openPanels = panelWrappers.filterWhere((panel) => panel.prop('isOpen') === true);
			expect(openPanels.length).toBe(1);
			expect(openPanels.at(0).prop('clickId')).toEqual(panel1.prop('clickId'));

			const panel2 = panelWrappers.at(2);
			panel2.find('button').simulate('click');
			openPanels = panelWrappers.filterWhere((panel) => panel.prop('isOpen') === true);
			expect(openPanels.length).toBe(1);
			expect(openPanels.at(0).prop('clickId')).toEqual(panel2.prop('clickId'));
		});

		it('should have state reflecting support opening panels one-at-a-time', () => {
			const panelWrappers = accordionPanelGroup.find(AccordionPanel);
			const openPanels = panelWrappers.filterWhere((panel) => panel.prop('isOpen') === true);
			expect(openPanels.length).toBe(1);

			let panelStates = accordionPanelGroup.state('panelStates');
			let openPanelIds = Object.keys(panelStates).filter((key, i) => (panelStates[key] === true));
			expect(openPanelIds.length).toBe(1);

			expect(parseInt(openPanelIds[0])).toEqual(openPanels.at(0).prop('clickId'));

			// we have one with prop isOpen
			const panel1 = panelWrappers.at(1);
			panel1.find('button').simulate('click');
			expect(setPanelStatesMock).toHaveBeenCalled();

			// assert only one key in panelStates with isOpen and matching clickId
			panelStates = accordionPanelGroup.state('panelStates');
			openPanelIds = Object.keys(panelStates).filter((key, i) => panelStates[key] === true);
			expect(openPanelIds.length).toBe(1);
			expect(parseInt(openPanelIds[0])).toEqual(panel1.prop('clickId'));
		});
	});
});
