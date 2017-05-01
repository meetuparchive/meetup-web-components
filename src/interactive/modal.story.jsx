import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { InfoWrapper } from '../utils/storyComponents';
import { iconSpriteJSX } from '../utils/storyIcons';
import { Z_INDICIES } from '../utils/designConstants';
import Button from '../forms/Button';
import Modal from './Modal';
import Flex from '../layout/Flex';
import FlexItem from '../layout/FlexItem';
import Section from '../layout/Section';
import Chunk from '../layout/Chunk';

const onDismiss = e => {
	action('Dismissing modal')(e);
};

const content = (
	<Section>
		<Chunk>
			<h2>This is a modal!</h2>
		</Chunk>
		<Chunk>
			<Flex justify='spaceAround'>
				<FlexItem>
					<Button onClick={onDismiss} fullWidth>Cancel</Button>
				</FlexItem>
				<FlexItem>
					<Button onClick={action('Confirmed!')} primary fullWidth>Confirm</Button>
				</FlexItem>
			</Flex>
		</Chunk>
	</Section>
);

const wrapperStyle = {
	height: '100vh',
	position: 'relative'
};

storiesOf('Modal', module)
	.addWithInfo(
		'default',
		'This is the basic usage with the component.',
		() => (
			<div style={wrapperStyle}>
				<InfoWrapper>
					<Modal
						onDismiss={onDismiss}
					>
						{content}
					</Modal>
					{iconSpriteJSX}
				</InfoWrapper>
			</div>
		)
	)
	.addWithInfo(
		'has hero - color',
		'This is the component with an extended header.',
		() => (
			<div style={wrapperStyle}>
				<InfoWrapper>
					<Modal
						onDismiss={onDismiss}
						inverted
						heroBgColor='rgb(55,30,172)'
						heroContent={
							<Section>
								<h1 className='text--display align--center'>I can be your hero</h1>
							</Section>
						}
					>
						{content}
					</Modal>
					{iconSpriteJSX}
				</InfoWrapper>
			</div>
		)
	)
	.addWithInfo(
		'has hero - image',
		'This is the component with an extended header.',
		() => (
			<div style={wrapperStyle}>
				<InfoWrapper>
					<Modal
						onDismiss={onDismiss}
						inverted
						heroBgImage='http://www.cheatsheet.com/wp-content/uploads/2016/09/Homemade-Meat-Gyro-with-French-Fries.jpg'
						heroContent={
							<Section>
								<h1 className='text--display align--center'>I can be your hero</h1>
							</Section>
						}
					>
						{content}
					</Modal>
					{iconSpriteJSX}
				</InfoWrapper>
			</div>
		)
	)
	.addWithInfo(
		'fullscreen',
		'Full screen modals are set with the `fullscreen` boolean prop',
		() => (
		<div style={wrapperStyle}>
			<Modal
				onDismiss={onDismiss}
				fullscreen
			>
				{content}
			</Modal>
			{iconSpriteJSX}
		</div>
	))
	.addWithInfo(
		'Narrow modal',
		'For a narrow modal in large viewports, use the `narrow` prop',
		() => (
		<div style={wrapperStyle}>
			<Modal
				narrow
				onDismiss={onDismiss}
			>
				{content}
			</Modal>
			{iconSpriteJSX}
		</div>
	))
	.addWithInfo(
		'Custom z-index modals',
		'This is an example of a narrow modal with a custom z-index on top of a normal modal',
		() => (
		<div style={wrapperStyle}>
			<Modal
				onDismiss={onDismiss}
			>
				{content}
			</Modal>
			<Modal
				narrow
				zIndex={Z_INDICIES.popup}
				onDismiss={onDismiss}
			>
				<Section className='flush--top'>
					<Chunk>
						<p>Yo dawg, I heard you like modals, so I put a modal on your modal so you can modal while you modal</p>
					</Chunk>
				</Section>
			</Modal>
			{iconSpriteJSX}
		</div>
	));


