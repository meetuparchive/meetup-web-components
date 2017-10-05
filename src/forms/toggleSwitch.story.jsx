import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { decorateWithLocale } from '../utils/decorators';
import { InfoWrapper } from '../utils/storyComponents';

import Chunk from '../layout/Chunk';
import Flex from '../layout/Flex';
import FlexItem from '../layout/FlexItem';
import ToggleSwitch from './ToggleSwitch';

storiesOf('ToggleSwitch', module)
	.addDecorator(decorateWithLocale)
	.addWithInfo(
		'Default',
		'This is the basic usage with the component.',
		() => (
			<InfoWrapper>
				<ToggleSwitch name="testToggle" />
			</InfoWrapper>
		)
	)
	.add('Checked', () => (
		<ToggleSwitch name="testToggle" isActive />
	))
	.add('With label', () => (
		<ToggleSwitch name="testToggle" label="Turn it on?" />
	))
	.add('With onCallback and offCallback', () => (
		<ToggleSwitch
			name="testToggle"
			label="Turn it on?"
			onCallback={action('its on!')}
			offCallback={action('its off.')} />
	))
	.add('With label outside of component', () => (
		<ul className="list">
			<li className="list-item"><Chunk><Flex>

				<FlexItem>
					<span id="outsideLabel-1">Is this thing on?</span>
				</FlexItem>
				<FlexItem shrink>
					<ToggleSwitch name="testToggle" labelledBy='outsideLabel-1' />
				</FlexItem>

			</Flex></Chunk></li>
			<li className="list-item"><Chunk><Flex>

				<FlexItem>
					<span id="outsideLabel-2">And this one?</span>
				</FlexItem>
				<FlexItem shrink>
					<ToggleSwitch name="testToggle" labelledBy='outsideLabel-2' />
				</FlexItem>

			</Flex></Chunk></li>
		</ul>
	))
	.add('Disabled', () => (
		<ToggleSwitch name="testToggle" disabled />
	));
