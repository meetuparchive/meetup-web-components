import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { InfoWrapper } from '../utils/storyComponents';
import Button from '../forms/Button';
import Modal from './Modal';
import Section from '../layout/Section';
import Stripe from '../layout/Stripe';

/*
 * -- Inline SVG icon sprite --
 *
 * raw SVG sprite from `swarm-icons`
 */
const iconSpriteStyle = { display: 'none' };
const iconSprite = require('raw-loader!swarm-icons/dist/sprite/sprite.inc');

const onDismiss = e => {
	action('Dismissing modal')(e);
};

const content = (
	<Stripe><Section>
		<h2 className='align--center'>This is a modal!</h2>
		<div className='row align--center margin--top'>
			<div className='row-item'>
				<Button onClick={onDismiss} fullWidth>Cancel</Button>
			</div>
			<div className='row-item'>
				<Button onClick={action('Confirmed!')} primary fullWidth>Confirm</Button>
			</div>
		</div>
	</Section></Stripe>
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
					<div style={iconSpriteStyle} dangerouslySetInnerHTML={{__html: iconSprite}} />
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
						<Stripe><Section>
							<h2 className='align--center'>This is a modal!</h2>
							<div className='row align--center margin--top'>
								<div className='row-item'>
									<Button onClick={onDismiss} fullWidth>Cancel</Button>
								</div>
								<div className='row-item'>
									<Button onClick={action('Confirmed!')} primary fullWidth>Confirm</Button>
								</div>
							</div>
						</Section></Stripe>
					</Modal>
					<div style={iconSpriteStyle} dangerouslySetInnerHTML={{__html: iconSprite}} />
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
						<Stripe><Section>
							<h2 className='align--center'>This is a modal!</h2>
							<div className='row align--center margin--top'>
								<div className='row-item'>
									<Button onClick={onDismiss} fullWidth>Cancel</Button>
								</div>
								<div className='row-item'>
									<Button onClick={action('Confirmed!')} primary fullWidth>Confirm</Button>
								</div>
							</div>
						</Section></Stripe>
					</Modal>
					<div style={iconSpriteStyle} dangerouslySetInnerHTML={{__html: iconSprite}} />
				</InfoWrapper>
			</div>
		)
	)
	.addWithInfo(
		'has hero - image (no scrim)',
		'This is the component with an extended header and no text-protection scrim.',
		() => (
			<div style={wrapperStyle}>
				<InfoWrapper>
					<Modal
						hideHeroScrim
						onDismiss={onDismiss}
						heroBgImage='http://cds.arbys.com/images/menu/1024x557_RoastBeefGyro_silo_tan.jpg'
						heroContent={
							<Section>
								<h1 className='text--display align--center'>I can be your hero</h1>
							</Section>
						}
					>
						<Stripe><Section>
							<h2 className='align--center'>This is a modal!</h2>
							<div className='row align--center margin--top'>
								<div className='row-item'>
									<Button onClick={onDismiss} fullWidth>Cancel</Button>
								</div>
								<div className='row-item'>
									<Button onClick={action('Confirmed!')} primary fullWidth>Confirm</Button>
								</div>
							</div>
						</Section></Stripe>
					</Modal>
					<div style={iconSpriteStyle} dangerouslySetInnerHTML={{__html: iconSprite}} />
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
				<div style={iconSpriteStyle} dangerouslySetInnerHTML={{__html: iconSprite}} />
			</div>
		))
	.addWithInfo(
		'No close area',
		'Modals with no close area are set with the `closeArea` boolean prop',
		() => (
			<div style={wrapperStyle}>
				<Modal
					closeArea={false}
				>
					{content}
				</Modal>
				<div style={iconSpriteStyle} dangerouslySetInnerHTML={{__html: iconSprite}} />
			</div>
		));
