import React from 'react';
import AccordionPanelGroup from './AccordionPanelGroup';
import AccordionPanel from './AccordionPanel';
import { storiesOf } from '@storybook/react';
import { decorateAction } from '@storybook/addon-actions';
import { InfoWrapper } from '../utils/storyComponents';
import { decorateWithLocale } from '../utils/decorators';


const callbackAction = decorateAction([
	args => ['Am I open?', args[1]]
]);

storiesOf('Accordion', module)
	.addDecorator(decorateWithLocale)
	.addWithInfo(
		'default',
		'Basic Accordion group',
		() => (
			<InfoWrapper>
				<div className='span--100 padding--all'>
					<AccordionPanelGroup
						accordionPanels={[
							<AccordionPanel
								label='First in default group'
								panelContent={
									<div className='runningText'>
										<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>
									</div>
								} />,
							<AccordionPanel
								label='Second in default group'
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
								label='Third in default group'
								panelContent={
									<div className='runningText'>
										<p>Classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>
									</div>
								} />,
						]}/>
				</div>
			</InfoWrapper>
		)
	)
	.addWithInfo(
		'with onClick callback',
		'add an onClickCallback prop to a panel',
		() => (
			<InfoWrapper>
				<div className='span--100 padding--all'>
					<AccordionPanelGroup
						accordionPanels={[
							<AccordionPanel
								label='First in default group'
								onClickCallback={callbackAction('first panel click')}
								panelContent={
									<div className='runningText'>
										<p>Hello</p>
									</div>
								}
							/>,
							<AccordionPanel
								label='Second in default group'
								onClickCallback={callbackAction('second panel click')}
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
								label='Third in default group'
								onClickCallback={callbackAction('third panel click')}
								panelContent={
									<div className='runningText'>
										<p>Goodbye</p>
									</div>
								} />,
						]}/>
				</div>
			</InfoWrapper>
		)
	)

	.addWithInfo(
		'Custom icon indicator',
		'Adds custom icons via AccordionPanelGroup props',
		() => (
			<InfoWrapper>
				<div className='span--100 padding--all'>
					<AccordionPanelGroup
						indicatorIcon='plus'
						indicatorIconActive='minus'
						accordionPanels={[
							<AccordionPanel
								label='First with custom icon'
								panelContent={
									<div className='runningText'>
										<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>
									</div>
								} />,
							<AccordionPanel
								label='Second with custom icon'
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
								label='Third with custom icon'
								panelContent={
									<div className='runningText'>
										<p>Classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>
									</div>
								} />,
						]}/>
				</div>
			</InfoWrapper>
		)
	)
	.addWithInfo(
		'ToggleSwitch indicator',
		'Show the indicator as a switch',
		() => (
			<InfoWrapper>
				<div className='span--100 padding--all'>
					<AccordionPanelGroup
						indicatorSwitch
						accordionPanels={[
							<AccordionPanel
								label='First with switch'
								onToggleClick={() => {alert('custom click');}}
								panelContent={
									<div className='runningText'>
										<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>
									</div>
								} />,
							<AccordionPanel
								label='Second with switch'
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
								label='Third with switch'
								panelContent={
									<div className='runningText'>
										<p>Classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>
									</div>
								} />,
						]}/>
				</div>
			</InfoWrapper>
		)
	)
	.addWithInfo(
		'Left-aligned icon',
		'Aligns icons left using AccordionPanelGroup props',
		() => (
			<InfoWrapper>
				<div className='span--100 padding--all'>
					<AccordionPanelGroup
						indicatorAlign='left'
						accordionPanels={[
							<AccordionPanel
								label='First with left icon'
								panelContent={
									<div className='runningText'>
										<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>
									</div>
								} />,
							<AccordionPanel
								label='Second with left icon'
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
								label='Third with left icon'
								panelContent={
									<div className='runningText'>
										<p>Classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>
									</div>
								} />,
						]}/>
				</div>
			</InfoWrapper>
		)
	)
	.addWithInfo(
		'Panel open by default',
		'Sets first panel to be open by default via the AccordionPanel props',
		() => (
			<InfoWrapper>
				<div className='span--100 padding--all'>
					<AccordionPanelGroup
						accordionPanels={[
							<AccordionPanel
								isOpen
								label='First (open by default)'
								panelContent={
									<div className='runningText'>
										<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>
									</div>
								} />,
							<AccordionPanel
								label='Second (not open by default)'
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
								label='Third (not open by default)'
								panelContent={
									<div className='runningText'>
										<p>Classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>
									</div>
								} />,
						]}/>
				</div>
			</InfoWrapper>
		)
	)
	.addWithInfo(
		'Not multiSelectable',
		'Overrides default multiSelectable prop in AccordionPanelGroup so only one panel can be open at a time',
		() => (
			<InfoWrapper>
				<div className='span--100 padding--all'>
					<AccordionPanelGroup
						multiSelectable={false}
						accordionPanels={[
							<AccordionPanel
								label='First'
								panelContent={
									<div className='runningText'>
										<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>
									</div>
								} />,
							<AccordionPanel
								label='Second'
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
								label='Last'
								panelContent={
									<div className='runningText'>
										<p>Classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>
									</div>
								} />,
						]}/>
				</div>
			</InfoWrapper>
		)
	)
	.addWithInfo(
		'Standalone AccordionPanel',
		'An AccordionPanel can be used outside an AccordionPanelGroup as a simple summary/detail component',
		() => (
			<InfoWrapper>
				<div className='span--100 padding--all'>
					<AccordionPanel
						label='Trigger label'
						panelContent={
							<div className='runningText'>
								<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>
							</div>
						} />
				</div>
			</InfoWrapper>
		)
	);
