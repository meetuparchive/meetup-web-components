import React from 'react';
import Stripe from './Stripe';
import { storiesOf } from '@kadira/storybook';
import { Annotate } from './utils/storyComponents';

storiesOf('Stripe', module)
	.add('default', () => (
		<Annotate notes='Stripes are almost never used alone. The <Bounds> and <Section> components provide padding and align content within a <Stripe>.'>
			<div style={{width: '100%'}}>
				<Stripe>
					<h3 className='text--display2'>Default stripe</h3>
					<p>Stripes go full-width and are used to separate distinct regions of a view</p>
				</Stripe>

				<Stripe collection>
					<h3 className='text--display2'>Collection stripe</h3>
					<p>Stripes go full-width and are used to separate distinct regions of a view</p>
					<p>Collection stripes have an off-white background to help make Cards appear like they have depth, but cards aren't required.</p>
				</Stripe>

				<Stripe inverted>
					<h3 className='text--display2'>Stripe</h3>
					<p>Stripes go full-width and are used to separate distinct regions of a view</p>
				</Stripe>

				<Stripe backgroundImage='http://photos2.meetupstatic.com/photos/event/4/a/2/9/600_434238985.jpeg'>
					<div style={{zIndex: '1'}}>
						<h3 className='text--display2'>Stripe with bg photo</h3>
						<p>Stripes go full-width and are used to separate distinct regions of a view</p>
					</div>
				</Stripe>
			</div>
		</Annotate>
	))
	.add('hero stripe', () => (
		<div style={{width: '100%'}}>
			<Stripe isHero backgroundImage='http://photos2.meetupstatic.com/photos/event/4/a/2/9/600_434238985.jpeg'>
				<h3 className='text--display2'>Hero stripe with bg photo</h3>
				<p>Stripes go full-width and are used to separate distinct regions of a view</p>
				<p>Hero stripes have a built-in Bounds to wrangle internal content</p>
			</Stripe>
		</div>
	));
