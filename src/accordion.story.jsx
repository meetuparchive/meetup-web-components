import React from 'react';
import AccordionPanelGroup from './AccordionPanelGroup';
import AccordionPanel from './AccordionPanel';
import { storiesOf } from '@kadira/storybook';

/*
 * -- Inline SVG icon sprite --
 *
 * raw SVG sprite from `swarm-icons`
 */
const iconSpriteStyle = { display: 'none' };
const iconSprite = require('raw-loader!swarm-icons/dist/sprite/sprite.inc');

storiesOf('Accordion', module)
	.add('default', () => (
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
			<div style={iconSpriteStyle} dangerouslySetInnerHTML={{__html: iconSprite}} />
		</div>
	))
	.add('Custom icons', () => (
		<div className='span--100 padding--all'>
			<AccordionPanelGroup
				iconShape='plus'
				iconShapeActive='minus'
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
			<div style={iconSpriteStyle} dangerouslySetInnerHTML={{__html: iconSprite}} />
		</div>
	))
	.add('Left-aligned icon', () => (
		<div className='span--100 padding--all'>
			<AccordionPanelGroup
				iconAlign='left'
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
			<div style={iconSpriteStyle} dangerouslySetInnerHTML={{__html: iconSprite}} />
		</div>
	))
	.add('isAnimated', () => (
		<div className='span--100 padding--all'>
			<AccordionPanelGroup
				isAnimated
				accordionPanels={[
					<AccordionPanel
						label='First animated section'
						panelContent={
							<div className='runningText'>
								<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>
							</div>
						} />,
					<AccordionPanel
						label='Section animated section'
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
						label='Third animated section'
						panelContent={
							<div className='runningText'>
								<p>Classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>
							</div>
						} />,
				]}/>
			<div style={iconSpriteStyle} dangerouslySetInnerHTML={{__html: iconSprite}} />
		</div>
	))
	.add('Panel open by default', () => (
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
			<div style={iconSpriteStyle} dangerouslySetInnerHTML={{__html: iconSprite}} />
		</div>
	))
	.add('Not multiSelectable', () => (
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
			<div style={iconSpriteStyle} dangerouslySetInnerHTML={{__html: iconSprite}} />
		</div>
	))
	.add('Standalone AccordionPanel', () => (
		<div className='span--100 padding--all'>
			<AccordionPanel
				label='Trigger label'
				panelContent={
					<div className='runningText'>
						<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>
					</div>
				} />
			<div style={iconSpriteStyle} dangerouslySetInnerHTML={{__html: iconSprite}} />
		</div>
	));
