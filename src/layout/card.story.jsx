import React from 'react';

import Card, { CardComponent } from './Card';
import Section from './Section';
import Stripe from './Stripe';
import { storiesOf } from '@storybook/react';
import { decorateWithBasics } from '../utils/decorators';
import { withKnobs, select, boolean, text, object } from '@storybook/addon-knobs';

import { withInfo } from '@storybook/addon-info';
import { C_COOLGRAYMEDIUM } from 'swarm-constants/dist/js/constants';
import { MEDIA_SIZES } from '../utils/designConstants';
const wrapperStyle = { margin: '0 auto', maxWidth: '500px' };

const flushUntilOptions = {
	atAll: 'atAll',
	medium: 'medium',
	large: 'large',
};

storiesOf('Layout/Card', module)
	.addDecorator(withInfo)
	.addDecorator(withKnobs)
	.addDecorator(decorateWithBasics)
	.addParameters({ info: { propTables: [CardComponent] } })
	.add('default', () => (
		<div style={wrapperStyle}>
			<Card
				initialHeight={boolean('initialHeight', false)}
				className={text('className', '')}
				hasShadow={boolean('hasShadow', false)}
				hasHoverShadow={boolean('hasHoverShadow', false)}
				flushUntil={select('flushUntil', flushUntilOptions, 'all')}
				isLoading={boolean('isLoading', false)}
				loadingProps={object('loadingProps', {
					color: C_COOLGRAYMEDIUM,
					size: `${MEDIA_SIZES.l}px`,
				})}
			>
				<h2 className="text--sectionTitle margin--bottom">
					This card contains content
				</h2>
				<p className="margin--bottom">
					{text(
						'demoContent',
						'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
					)}
				</p>
			</Card>
		</div>
	))
	.add('initialHeight', () => (
		<div style={wrapperStyle}>
			<Card
				initialHeight={boolean('initialHeight', true)}
				className={text('className', '')}
				hasShadow={boolean('hasShadow', false)}
				hasHoverShadow={boolean('hasHoverShadow', false)}
				flushUntil={select('flushUntil', flushUntilOptions, 'all')}
				isLoading={boolean('isLoading', false)}
				loadingProps={object('loadingProps', {
					color: C_COOLGRAYMEDIUM,
					size: `${MEDIA_SIZES.l}px`,
				})}
			>
				<h2 className="text--sectionTitle margin--bottom">
					This card contains content
				</h2>
				<p className="margin--bottom">
					{text(
						'demoContent',
						'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
					)}
				</p>
			</Card>
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
				<Card
					initialHeight={boolean('initialHeight', false)}
					className={text('className', '')}
					hasShadow={boolean('hasShadow', false)}
					hasHoverShadow={boolean('hasHoverShadow', false)}
					flushUntil={select('flushUntil', flushUntilOptions, 'medium')}
					isLoading={boolean('isLoading', false)}
					loadingProps={object('loadingProps', {
						color: C_COOLGRAYMEDIUM,
						size: `${MEDIA_SIZES.l}px`,
					})}
					style={{
						width: 'auto',
					}} /* Used to override a storybook default. Not needed for regular usage */
				>
					<h2 className="text--sectionTitle margin--bottom">
						Card flushes left and right on small viewports
					</h2>
					<p className="margin--bottom">
						{text(
							'demoContent',
							'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
						)}
					</p>
				</Card>
			</Section>
		</Stripe>
	))
	.add('hasShadow', () => (
		<div style={wrapperStyle}>
			<Card
				initialHeight={boolean('initialHeight', false)}
				className={text('className', '')}
				hasShadow={boolean('hasShadow', true)}
				hasHoverShadow={boolean('hasHoverShadow', false)}
				flushUntil={select('flushUntil', flushUntilOptions, 'all')}
				isLoading={boolean('isLoading', false)}
				loadingProps={object('loadingProps', {
					color: C_COOLGRAYMEDIUM,
					size: `${MEDIA_SIZES.l}px`,
				})}
			>
				<h2 className="text--sectionTitle margin--bottom">
					This card contains content
				</h2>
				<p className="margin--bottom">
					{text(
						'demoContent',
						'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
					)}
				</p>
			</Card>
		</div>
	))
	.add('hasHoverShadow', () => (
		<div style={wrapperStyle}>
			<Card
				initialHeight={boolean('initialHeight', false)}
				className={text('className', '')}
				hasShadow={boolean('hasShadow', false)}
				hasHoverShadow={boolean('hasHoverShadow', true)}
				flushUntil={select('flushUntil', flushUntilOptions, 'all')}
				isLoading={boolean('isLoading', false)}
				loadingProps={object('loadingProps', {
					color: C_COOLGRAYMEDIUM,
					size: `${MEDIA_SIZES.l}px`,
				})}
			>
				<h2 className="text--sectionTitle margin--bottom">
					This card contains content
				</h2>
				<p className="margin--bottom">
					{text(
						'demoContent',
						'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
					)}
				</p>
			</Card>
		</div>
	))
	.add('hasShadow and hasHoverShadow', () => (
		<div style={wrapperStyle}>
			<Card
				initialHeight={boolean('initialHeight', false)}
				className={text('className', '')}
				hasShadow={boolean('hasShadow', true)}
				hasHoverShadow={boolean('hasHoverShadow', true)}
				flushUntil={select('flushUntil', flushUntilOptions, 'all')}
				isLoading={boolean('isLoading', false)}
				loadingProps={object('loadingProps', {
					color: C_COOLGRAYMEDIUM,
					size: `${MEDIA_SIZES.l}px`,
				})}
			>
				<h2 className="text--sectionTitle margin--bottom">
					This card contains content
				</h2>
				<p className="margin--bottom">
					{text(
						'demoContent',
						'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
					)}
				</p>
			</Card>
		</div>
	))
	.add('isLoading', () => (
		<div style={wrapperStyle}>
			<Card
				initialHeight={boolean('initialHeight', false)}
				className={text('className', '')}
				hasShadow={boolean('hasShadow', false)}
				hasHoverShadow={boolean('hasHoverShadow', false)}
				flushUntil={select('flushUntil', flushUntilOptions, 'all')}
				isLoading={boolean('isLoading', true)}
				loadingProps={object('loadingProps', {
					color: C_COOLGRAYMEDIUM,
					size: `${MEDIA_SIZES.l}px`,
				})}
			>
				<h2 className="text--sectionTitle margin--bottom">
					This card contains content
				</h2>
				<p className="margin--bottom">
					{text(
						'demoContent',
						'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
					)}
				</p>
			</Card>
		</div>
	))
	.add('isLoading with loadingProps', () => (
		<div style={wrapperStyle}>
			<Card
				initialHeight={boolean('initialHeight', false)}
				className={text('className', '')}
				hasShadow={boolean('hasShadow', false)}
				hasHoverShadow={boolean('hasHoverShadow', false)}
				flushUntil={select('flushUntil', flushUntilOptions, 'all')}
				isLoading={boolean('isLoading', true)}
				loadingProps={object('loadingProps', {
					color: 'red',
					scrimColor: 'rgba(250, 250, 255, 0.8)',
					size: '96px',
				})}
			>
				<h2 className="text--sectionTitle margin--bottom">
					This card contains content
				</h2>
				<p className="margin--bottom">
					{text(
						'demoContent',
						'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
					)}
				</p>
			</Card>
		</div>
	));
