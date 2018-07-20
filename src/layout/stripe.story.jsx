import React from 'react';
import { decorateWithInfo } from '../utils/decorators';
import { storiesOf } from '@storybook/react';
import Stripe, { StripeComponent } from './Stripe';

storiesOf('Stripe', module)
	.addDecorator(decorateWithInfo)
	.add(
		'default',
		() => (
			<div style={{ width: '100%' }}>
				<StripeComponent>
					<h3 className="text--sectionTitle">Default stripe</h3>
					<p>
						Stripes go full-width and are used to separate distinct regions of
						a view
					</p>
				</StripeComponent>

				<StripeComponent collection>
					<h3 className="text--sectionTitle">Collection stripe</h3>
					<p>
						Stripes go full-width and are used to separate distinct regions of
						a view
					</p>
					<p>
						Collection stripes have an off-white background to help make Cards
						appear like they have depth, but cards aren't required.
					</p>
				</StripeComponent>

				<StripeComponent inverted>
					<h3 className="text--sectionTitle">Stripe</h3>
					<p>
						Stripes go full-width and are used to separate distinct regions of
						a view
					</p>
				</StripeComponent>

				<StripeComponent
					inverted
					backgroundImage="https://placekitten.com/g/600/600"
				>
					<div style={{ zIndex: '1' }}>
						<h3 className="text--sectionTitle">Stripe with bg photo</h3>
						<p>
							Stripes go full-width and are used to separate distinct
							regions of a view
						</p>
					</div>
				</StripeComponent>
				<StripeComponent
					hideScrim
					inverted
					backgroundImage="https://s-media-cache-ak0.pinimg.com/originals/10/55/e7/1055e79a0519191212035a61ed530800.jpg"
				>
					<div style={{ zIndex: '1' }}>
						<h3 className="text--sectionTitle">
							Stripe with bg photo, no scrim
						</h3>
						<p>
							Stripes go full-width and are used to separate distinct
							regions of a view
						</p>
					</div>
				</StripeComponent>
			</div>
		),
		{
			info: {
				text:
					'This is the basic usage with the component. Stripes are almost never used alone. The <Bounds> and <Section> components provide padding and align content within a <Stripe>.',
			},
		}
	)
	.add('hero stripe', () => (
		<div style={{ width: '100%' }}>
			<StripeComponent
				hero
				className="inverted"
				backgroundImage="https://placekitten.com/g/600/600"
			>
				<h3 className="text--display">Hero stripe with bg photo</h3>
				<p>
					Stripes go full-width and are used to separate distinct regions of a
					view
				</p>
				<p>Hero stripes have a built-in Bounds to wrangle internal content</p>
			</StripeComponent>
		</div>
	))
	.addDecorator(decorateWithInfo)
	.add('isLoading', () => (
		<Stripe isLoading>
			<h3 className="text--sectionTitle">Default stripe</h3>
			<p>
				Stripes go full-width and are used to separate distinct regions of a view
			</p>
			<p>
				Stripes go full-width and are used to separate distinct regions of a view
			</p>
			<p>
				Stripes go full-width and are used to separate distinct regions of a view
			</p>
			<p>
				Stripes go full-width and are used to separate distinct regions of a view
			</p>
		</Stripe>
	))
	.add('isLoading with loadingProps', () => (
		<Stripe
			isLoading
			loadingProps={{
				color: 'red',
				scrimColor: 'rgba(250, 250, 255, 0.8)',
				size: '96px',
			}}
		>
			<h3 className="text--sectionTitle">Default stripe</h3>
			<p>
				Stripes go full-width and are used to separate distinct regions of a view
			</p>
			<p>
				Stripes go full-width and are used to separate distinct regions of a view
			</p>
			<p>
				Stripes go full-width and are used to separate distinct regions of a view
			</p>
			<p>
				Stripes go full-width and are used to separate distinct regions of a view
			</p>
		</Stripe>
	));
