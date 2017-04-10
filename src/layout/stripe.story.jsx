import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { WithNotes } from '@kadira/storybook-addon-notes';
import { InfoWrapper } from './utils/storyComponents';
import Stripe from './Stripe';

storiesOf('Stripe', module)
	.addWithInfo(
		'default',
		'This is the basic usage with the component.',
		() => (
			<InfoWrapper>
				<WithNotes notes='Stripes are almost never used alone. The <Bounds> and <Section> components provide padding and align content within a <Stripe>.'>
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

						<Stripe backgroundImage='https://placekitten.com/g/600/600'>
							<div style={{zIndex: '1'}}>
								<h3 className='text--display2'>Stripe with bg photo</h3>
								<p>Stripes go full-width and are used to separate distinct regions of a view</p>
							</div>
						</Stripe>
					</div>
				</WithNotes>
			</InfoWrapper>
		)
	)
	.add('hero stripe', () => (
		<div style={{width: '100%'}}>
			<Stripe hero backgroundImage='https://placekitten.com/g/600/600'>
				<h3 className='text--display2'>Hero stripe with bg photo</h3>
				<p>Stripes go full-width and are used to separate distinct regions of a view</p>
				<p>Hero stripes have a built-in Bounds to wrangle internal content</p>
			</Stripe>
		</div>
	));
