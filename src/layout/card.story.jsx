import React from 'react';

import Card from './Card';
import { storiesOf } from '@kadira/storybook';
import { decorateWithLocale } from '../utils/decorators';

const wrapperStyle = {margin: '0 auto', maxWidth: '500px'};

storiesOf('Card', module)
	.addDecorator(decorateWithLocale)
	.addWithInfo(
		'default',
		'This is the basic usage with the component.',
		() => (
			<div style={wrapperStyle}>
				<Card>
					<h2 className="text--sectionTitle margin--bottom">This card contains content</h2>
					<p className="margin--bottom">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
				</Card>
			</div>
		)
	)
	.add('autoHeight', () => (
		<div style={wrapperStyle}>
			<Card autoHeight>
				<h2 className="text--sectionTitle margin--bottom">This card contains content</h2>
				<p className="margin--bottom">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
			</Card>
		</div>
	))
	.add('hasShadow', () => (
		<div style={wrapperStyle}>
			<Card hasShadow>
				<h2 className="text--sectionTitle margin--bottom">This card contains content</h2>
				<p className="margin--bottom">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
			</Card>
		</div>
	))
	.add('hasHoverShadow', () => (
		<div style={wrapperStyle}>
			<Card hasHoverShadow>
				<h2 className="text--sectionTitle margin--bottom">This card contains content</h2>
				<p className="margin--bottom">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
			</Card>
		</div>
	));
