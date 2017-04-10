import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { InfoWrapper } from '../utils/storyComponents';
import Button from './Button';
import Modal from './Modal';

const onDismiss = e => {
	action('Dismissing modal')(e);
};

const content = (
	<div>
		<h2 className='align--center'>This is a modal!</h2>
		<div className='row align--center margin--top'>
			<div className='row-item'>
				<Button onClick={onDismiss} fullWidth>Cancel</Button>
			</div>
			<div className='row-item'>
				<Button onClick={action('Confirmed!')} primary fullWidth>Confirm</Button>
			</div>
		</div>
	</div>
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
		</div>
	));


