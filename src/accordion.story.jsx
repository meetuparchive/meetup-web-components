
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

storiesOf('AccordionPanelGroup', module)
	.add('default', () => (
		<div className='span--100 padding--all'>
			<AccordionPanelGroup
				accordionPanels={[
					<AccordionPanel
						trigger={{
							label: 'First in default group'
						}}
						panelContent={
							<div className='runningText'>
								<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>
							</div>
						} />,
					<AccordionPanel
						trigger={{
							label: 'Second in default group'
						}}
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
						trigger={{
							label: 'Third in default group'
						}}
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
				icons={{
					shape: 'plus',
					shapeActive: 'minus'
				}}
				accordionPanels={[
					<AccordionPanel
						trigger={{
							label: 'First with custom icon'
						}}
						panelContent={
							<div className='runningText'>
								<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>
							</div>
						} />,
					<AccordionPanel
						trigger={{
							label: 'Second with custom icon'
						}}
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
						trigger={{
							label: 'Third with custom icon'
						}}
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
				icons={{
					align: 'left'
				}}
				accordionPanels={[
					<AccordionPanel
						trigger={{
							label: 'First with left icon'
						}}
						panelContent={
							<div className='runningText'>
								<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>
							</div>
						} />,
					<AccordionPanel
						trigger={{
							label: 'Second with left icon'
						}}
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
						trigger={{
							label: 'Third with left icon'
						}}
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
						trigger={{
							label: 'First animated section'
						}}
						panelContent={
							<div className='runningText'>
								<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>
							</div>
						} />,
					<AccordionPanel
						trigger={{
							label: 'Section animated section'
						}}
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
						trigger={{
							label: 'Third animated section'
						}}
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
						trigger={{
							label: 'First (open by default)'
						}}
						panelContent={
							<div className='runningText'>
								<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>
							</div>
						} />,
					<AccordionPanel
						trigger={{
							label: 'Second (not open by default)'
						}}
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
						trigger={{
							label: 'Third (not open by default)'
						}}
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
						trigger={{
							label: 'First'
						}}
						panelContent={
							<div className='runningText'>
								<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>
							</div>
						} />,
					<AccordionPanel
						trigger={{
							label: 'Second'
						}}
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
						trigger={{
							label: 'Last'
						}}
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
				trigger={{
					label: 'Trigger label'
				}}
				panelContent={
					<div className='runningText'>
						<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>
					</div>
				} />
			<div style={iconSpriteStyle} dangerouslySetInnerHTML={{__html: iconSprite}} />
		</div>
	));
