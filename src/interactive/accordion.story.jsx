import React from 'react';
import AccordionPanelGroup from './AccordionPanelGroup';
import AccordionPanel from './AccordionPanel';
import { storiesOf } from '@storybook/react';
import { decorateAction } from '@storybook/addon-actions';
import { decorateWithBasics, decorateWithInfo } from '../utils/decorators';
import { textContent1, textContent2 } from '../../__mocks__/textContentMocks';

const callbackAction = decorateAction([args => ['Am I open?', args[1]]]);

const panelOneProps = {
	panelContent: (
		<div className="runningText">
			<p>{textContent1}</p>
		</div>
	),
	label: 'First in default group',
};

const panelTwoProps = {
	panelContent: (
		<div>
			<div className="runningText">
				<p>Any kind of content can go in here, even inputs.</p>
			</div>
			<div className="chunk">
				<label htmlFor="test-textinput">I'm a label</label>
				<input id="test-textinput" type="text" placeholder="Input placeholder" />
			</div>
		</div>
	),
	label: 'Second in default group',
};

const panelThreeProps = {
	panelContent: (
		<div className="runningText">
			<p>{textContent2}</p>
		</div>
	),
	label: 'Third in default group',
};

const defaultPanels = [
	<AccordionPanel {...panelOneProps} />,
	<AccordionPanel {...panelTwoProps} />,
	<AccordionPanel {...panelThreeProps} />,
];

storiesOf('Accordion', module)
	.addDecorator(decorateWithBasics)
	.addDecorator(decorateWithInfo)
	.addParameters({ info: { propTables: [AccordionPanel, AccordionPanelGroup] } })
	.add(
		'default',
		() => (
			<div className="span--100 padding--all">
				<AccordionPanelGroup accordionPanels={defaultPanels} />
			</div>
		),
		{ info: { text: 'Basic Accordion group' } }
	)
	.add(
		'with onClick callback',
		() => (
			<div className="span--100 padding--all">
				<AccordionPanelGroup
					accordionPanels={[
						<AccordionPanel
							label="First in default group"
							onClickCallback={callbackAction('first panel click')}
							panelContent={
								<div className="runningText">
									<p>Hello</p>
								</div>
							}
						/>,
						<AccordionPanel
							label="Second in default group"
							onClickCallback={callbackAction('second panel click')}
							panelContent={
								<div>
									<div className="runningText">
										<p>
											Any kind of content can go in here, even
											inputs.
										</p>
									</div>
									<div className="chunk">
										<label htmlFor="test-textinput">
											I'm a label
										</label>
										<input
											id="test-textinput"
											type="text"
											placeholder="Input placeholder"
										/>
									</div>
								</div>
							}
						/>,
						<AccordionPanel
							label="Third in default group"
							onClickCallback={callbackAction('third panel click')}
							panelContent={
								<div className="runningText">
									<p>Goodbye</p>
								</div>
							}
						/>,
					]}
				/>
			</div>
		),
		{ info: { text: 'add an onClickCallback prop to a panel' } }
	)
	.add(
		'Custom icon indicator',
		() => (
			<div className="span--100 padding--all">
				<AccordionPanelGroup
					indicatorIcon="plus"
					indicatorIconActive="minus"
					accordionPanels={defaultPanels}
				/>
			</div>
		),
		{ info: { text: 'Adds custom icons via AccordionPanelGroup props' } }
	)
	.add(
		'ToggleSwitch indicator',
		() => (
			<div className="span--100 padding--all">
				<AccordionPanelGroup indicatorSwitch accordionPanels={defaultPanels} />
			</div>
		),
		{ info: { text: 'Show the indicator as a switch' } }
	)
	.add(
		'onToggleClick',
		() => (
			<div className="span--100 padding--all">
				<AccordionPanelGroup
					indicatorSwitch
					accordionPanels={[
						<AccordionPanel
							{...panelOneProps}
							onToggleClick={callbackAction('first panel click')}
						/>,
						<AccordionPanel
							{...panelTwoProps}
							onToggleClick={callbackAction('second panel click')}
						/>,
						<AccordionPanel
							{...panelThreeProps}
							onToggleClick={callbackAction('third panel click')}
						/>,
					]}
				/>
			</div>
		),
		{ info: { text: 'overrides toggle open behavior with custom click handler' } }
	)
	.add(
		'Left-aligned icon',
		() => (
			<div className="span--100 padding--all">
				<AccordionPanelGroup
					indicatorAlign="left"
					accordionPanels={defaultPanels}
				/>
			</div>
		),
		{ info: { text: 'Aligns icons left using AccordionPanelGroup props' } }
	)
	.add(
		'Panel open by default',
		() => (
			<div className="span--100 padding--all">
				<AccordionPanelGroup
					accordionPanels={[
						<AccordionPanel {...panelOneProps} isOpen />,
						<AccordionPanel {...panelTwoProps} />,
						<AccordionPanel {...panelThreeProps} />,
					]}
				/>
			</div>
		),
		{
			info: {
				text:
					'Sets first panel to be open by default via the AccordionPanel props',
			},
		}
	)
	.add(
		'Not multiSelectable',
		() => (
			<div className="span--100 padding--all">
				<AccordionPanelGroup
					multiSelectable={false}
					accordionPanels={defaultPanels}
				/>
			</div>
		),
		{
			info: {
				text:
					'Overrides default multiSelectable prop in AccordionPanelGroup so only one panel can be open at a time',
			},
		}
	);
