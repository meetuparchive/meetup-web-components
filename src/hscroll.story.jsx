import React from 'react';
import { storiesOf } from '@storybook/react';
import { decorateWithBasics, decorateWithInfo } from './utils/decorators';
import { MEDIA_SIZES } from './utils/designConstants';
import Hscroll from './Hscroll';

const itemStyle = {
	display: 'inline-block',
	background: 'cornsilk',
	width: `${MEDIA_SIZES.xxl}px`,
	height: `${MEDIA_SIZES.xl}px`,
	outline: '1px dotted red',
	padding: `${MEDIA_SIZES.xs}px`,
};

const hscrollInlineStyle = {
	width: '50vw',
};

const listItems = [
	<div style={itemStyle}>inline-block item</div>,
	<div style={itemStyle}>inline-block item</div>,
	<div style={itemStyle}>inline-block item</div>,
	<div style={itemStyle}>inline-block item</div>,
	<div style={itemStyle}>inline-block item</div>,
	<div style={itemStyle}>inline-block item</div>,
	<div style={itemStyle}>inline-block item</div>,
	<div style={itemStyle}>inline-block item</div>,
	<div style={itemStyle}>inline-block item</div>,
];

storiesOf('Hscroll', module)
	.addDecorator(decorateWithBasics)
	.addDecorator(decorateWithInfo)
	.add('Default', () => <Hscroll style={hscrollInlineStyle}>{listItems}</Hscroll>, {
		info: { text: 'Basic horizontal scroll usage' },
	})
	.add(
		'With gradient',
		() => (
			<Hscroll style={hscrollInlineStyle} hasGradient>
				{listItems}
			</Hscroll>
		),
		{ info: { text: 'Basic horizontal scroll with edge gradients' } }
	)
	.add(
		'Media-conditional unclip',
		() => (
			<Hscroll style={hscrollInlineStyle} unclipAt="large">
				{listItems}
			</Hscroll>
		),
		{ info: { text: 'Unclip at a given breakpoint (large)' } }
	);
