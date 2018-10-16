import React from 'react';
import { withKnobs, boolean, object, text } from '@storybook/addon-knobs';

import { withInfo } from '@storybook/addon-info';
import { storiesOf } from '@storybook/react';
import Stripe from './Stripe';
import { C_COOLGRAYMEDIUM } from 'swarm-constants/dist/js/constants';
import { MEDIA_SIZES } from '../utils/designConstants';

storiesOf('Layout/Stripe', module)
	.addDecorator(withInfo)
	.addDecorator(withKnobs)
	.add(
		'default',
		() => (
			<div style={{ width: '100%' }}>
				<div style={{ marginBottom: '100px' }}>
					<Stripe
						backgroundImage={text('backgroundImage', '')}
						collection={boolean('collection', false)}
						inverted={boolean('inverted', false)}
						hero={boolean('hero', false)}
						hideScrim={boolean('hideScrim', false)}
						isLoading={boolean('isLoading', false)}
						loadingProps={object('loadingProps', {
							color: C_COOLGRAYMEDIUM,
							size: `${MEDIA_SIZES.l}px`,
						})}
						className={text('className', '')}
						style={object('style', {})}
					>
						<h3 className="text--sectionTitle">
							Stripe that will be changing
						</h3>
						<p>
							Stripes go full-width and are used to separate distinct
							regions of a view
						</p>
					</Stripe>
				</div>

				<Stripe>
					<h3 className="text--sectionTitle">Default stripe</h3>
					<p>
						Stripes go full-width and are used to separate distinct regions of
						a view
					</p>
				</Stripe>

				<Stripe collection>
					<h3 className="text--sectionTitle">Collection stripe</h3>
					<p>
						Stripes go full-width and are used to separate distinct regions of
						a view
					</p>
					<p>
						Collection stripes have an off-white background to help make Cards
						appear like they have depth, but cards aren't required.
					</p>
				</Stripe>

				<Stripe inverted>
					<h3 className="text--sectionTitle">Stripe</h3>
					<p>
						Stripes go full-width and are used to separate distinct regions of
						a view
					</p>
				</Stripe>

				<Stripe inverted backgroundImage="https://placekitten.com/g/600/600">
					<div style={{ zIndex: '1' }}>
						<h3 className="text--sectionTitle">Stripe with bg photo</h3>
						<p>
							Stripes go full-width and are used to separate distinct
							regions of a view
						</p>
					</div>
				</Stripe>
				<Stripe
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
				</Stripe>
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
			<Stripe
				backgroundImage={text(
					'backgroundImage',
					'https://placekitten.com/g/600/600'
				)}
				collection={boolean('collection', false)}
				inverted={boolean('inverted', false)}
				hero={boolean('hero', false)}
				hideScrim={boolean('hideScrim', false)}
				isLoading={boolean('isLoading', false)}
				loadingProps={object('loadingProps', {
					color: C_COOLGRAYMEDIUM,
					size: `${MEDIA_SIZES.l}px`,
				})}
				className={text('className', 'inverted')}
				style={object('style', {})}
			>
				<h3 className="text--display">Hero stripe with bg photo</h3>
				<p>
					Stripes go full-width and are used to separate distinct regions of a
					view
				</p>
				<p>Hero stripes have a built-in Bounds to wrangle internal content</p>
			</Stripe>
		</div>
	))
	.add('isLoading', () => (
		<Stripe
			backgroundImage={text('backgroundImage', '')}
			collection={boolean('collection', false)}
			inverted={boolean('inverted', false)}
			hero={boolean('hero', false)}
			hideScrim={boolean('hideScrim', false)}
			isLoading={boolean('isLoading', true)}
			loadingProps={object('loadingProps', {
				color: C_COOLGRAYMEDIUM,
				size: `${MEDIA_SIZES.l}px`,
			})}
			className={text('className', '')}
			style={object('style', {})}
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
	))
	.add('isLoading with loadingProps', () => (
		<Stripe
			backgroundImage={text('backgroundImage', '')}
			collection={boolean('collection', false)}
			inverted={boolean('inverted', false)}
			hero={boolean('hero', false)}
			hideScrim={boolean('hideScrim', false)}
			isLoading={boolean('isLoading', true)}
			loadingProps={object('loadingProps', {
				color: 'red',
				scrimColor: 'rgba(250, 250, 255, 0.8)',
				size: '96px',
			})}
			className={text('className', '')}
			style={object('style', {})}
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
