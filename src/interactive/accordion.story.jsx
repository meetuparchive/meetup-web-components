import React from 'react';
import AccordionPanelGroup from './AccordionPanelGroup';
import AccordionPanel from './AccordionPanel';
import { storiesOf } from '@storybook/react';
import { decorateAction } from '@storybook/addon-actions';
import { decorateWithBasics } from '../utils/decorators';
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

/**
 * @module ControlledAccordionPanel
 */
class ControlledAccordionPanel extends React.Component {
	constructor(props) {
		super(props);

		this.togglePanel = this.togglePanel.bind(this);

		this.state = {
			firstOpen: true,
		};
	}

	togglePanel() {
		this.setState({ firstOpen: !this.state.firstOpen });
	}

	render() {
		return (
			<div className="span--100 padding--all">
				<button onClick={this.togglePanel}>Toggle the first panel</button>

				<AccordionPanelGroup
					accordionPanels={[
						<AccordionPanel
							{...panelOneProps}
							isOpen={this.state.firstOpen}
						/>,
						<AccordionPanel {...panelTwoProps} />,
						<AccordionPanel {...panelThreeProps} />,
					]}
				/>
			</div>
		);
	}
}

storiesOf('Accordion', module)
	.addDecorator(decorateWithBasics)
	.addWithInfo('default', 'Basic Accordion group', () => (
		<div className="span--100 padding--all">
			<AccordionPanelGroup accordionPanels={defaultPanels} />
		</div>
	))
	.addWithInfo('controlled accordion', 'Controlled Accordion group', () => (
		<ControlledAccordionPanel />
	))
	.addWithInfo(
		'with onClick callback',
		'add an onClickCallback prop to a panel',
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
		)
	)
	.addWithInfo(
		'Custom icon indicator',
		'Adds custom icons via AccordionPanelGroup props',
		() => (
			<div className="span--100 padding--all">
				<AccordionPanelGroup
					indicatorIcon="plus"
					indicatorIconActive="minus"
					accordionPanels={defaultPanels}
				/>
			</div>
		)
	)
	.addWithInfo('ToggleSwitch indicator', 'Show the indicator as a switch', () => (
		<div className="span--100 padding--all">
			<AccordionPanelGroup indicatorSwitch accordionPanels={defaultPanels} />
		</div>
	))
	.addWithInfo(
		'onToggleClick',
		'overrides toggle open behavior with custom click handler',
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
		)
	)
	.addWithInfo(
		'Left-aligned icon',
		'Aligns icons left using AccordionPanelGroup props',
		() => (
			<div className="span--100 padding--all">
				<AccordionPanelGroup
					indicatorAlign="left"
					accordionPanels={defaultPanels}
				/>
			</div>
		)
	)
	.addWithInfo(
		'Panel open by default',
		'Sets first panel to be open by default via the AccordionPanel props',
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
		)
	)
	.addWithInfo(
		'Not multiSelectable',
		'Overrides default multiSelectable prop in AccordionPanelGroup so only one panel can be open at a time',
		() => (
			<div className="span--100 padding--all">
				<AccordionPanelGroup
					multiSelectable={false}
					accordionPanels={defaultPanels}
				/>
			</div>
		)
	);
