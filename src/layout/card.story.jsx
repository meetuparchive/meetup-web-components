import React from 'react';

import Card, { CardComponent } from './Card';
import Section from './Section';
import Stripe from './Stripe';
import { storiesOf } from '@storybook/react';
import { decorateWithBasics, decorateWithInfo } from '../utils/decorators';

const wrapperStyle = { margin: '0 auto', maxWidth: '500px' };

storiesOf('Layout/Card', module)
	.addDecorator(decorateWithBasics)
	.addDecorator(decorateWithInfo)
	.addParameters({ info: { propTables: [CardComponent], propTablesExclude: [Card] } })
	.add('default', () => (
		<div style={wrapperStyle}>
			<CardComponent>
				<h2 className="text--sectionTitle margin--bottom">
					This card contains content
				</h2>
				<p className="margin--bottom">
					Lorem Ipsum is simply dummy text of the printing and typesetting
					industry.
				</p>
			</CardComponent>
		</div>
	))
	.add('initialHeight', () => (
		<div style={wrapperStyle}>
			<CardComponent initialHeight>
				<h2 className="text--sectionTitle margin--bottom">
					This card contains content
				</h2>
				<p className="margin--bottom">
					Lorem Ipsum is simply dummy text of the printing and typesetting
					industry.
				</p>
			</CardComponent>
		</div>
	))
	.add('Conditionally flush left and right (at medium breakpoint)', () => (
		<Stripe
			collection
			className="display--flex flex--center flex--alignCenter"
			style={{ height: '100vh' }}
		>
			<Section>
				<h2 className="text--sectionTitle margin--bottom">
					Headline will not flush
				</h2>
				<CardComponent
					flushUntil="medium"
					style={{
						width: 'auto',
					}} /* Used to override a storybook default. Not needed for regular usage */
				>
					<h2 className="text--sectionTitle margin--bottom">
						Card flushes left and right on small viewports
					</h2>
					<p className="margin--bottom">
						Lorem Ipsum is simply dummy text of the printing and typesetting
						industry.
					</p>
				</CardComponent>
			</Section>
		</Stripe>
	))
	.add('hasShadow', () => (
		<div style={wrapperStyle}>
			<CardComponent hasShadow>
				<h2 className="text--sectionTitle margin--bottom">
					This card contains content
				</h2>
				<p className="margin--bottom">
					Lorem Ipsum is simply dummy text of the printing and typesetting
					industry.
				</p>
			</CardComponent>
		</div>
	))
	.add('hasHoverShadow', () => (
		<div style={wrapperStyle}>
			<CardComponent hasHoverShadow>
				<h2 className="text--sectionTitle margin--bottom">
					This card contains content
				</h2>
				<p className="margin--bottom">
					Lorem Ipsum is simply dummy text of the printing and typesetting
					industry.
				</p>
			</CardComponent>
		</div>
	))
	.add('hasShadow and hasHoverShadow', () => (
		<div style={wrapperStyle}>
			<CardComponent hasShadow hasHoverShadow>
				<h2 className="text--sectionTitle margin--bottom">
					This card contains content
				</h2>
				<p className="margin--bottom">
					Lorem Ipsum is simply dummy text of the printing and typesetting
					industry.
				</p>
			</CardComponent>
		</div>
	))
	.add('isLoading', () => (
		<div style={wrapperStyle}>
			<Card isLoading>
				<h2 className="text--sectionTitle margin--bottom">
					This card contains content
				</h2>
				<p className="margin--bottom">
					Lorem Ipsum is simply dummy text of the printing and typesetting
					industry.
				</p>
			</Card>
		</div>
	))
	.add('isLoading with loadingProps', () => (
		<div style={wrapperStyle}>
			<Card
				isLoading
				loadingProps={{
					color: 'red',
					scrimColor: 'rgba(250, 250, 255, 0.8)',
					size: '96px',
				}}
			>
				<h2 className="text--sectionTitle margin--bottom">
					This card contains content
				</h2>
				<p className="margin--bottom">
					Lorem Ipsum is simply dummy text of the printing and typesetting
					industry.
				</p>
			</Card>
		</div>
	));
