import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
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

storiesOf('Modal', module)
	.add('default', () => {
		return (
			<Modal
				onDismiss={onDismiss}>
				{content}
			</Modal>
		);
	}).add('fullscreen', () => {
		return (
			<Modal
				onDismiss={onDismiss}
				fullscreen >
				{content}
			</Modal>
		);
	});


