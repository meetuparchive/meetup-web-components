import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { InfoWrapper } from './utils/storyComponents';
import { decorateWithLocale } from './utils/decorators';
import { MEDIA_SIZES } from './utils/designConstants';
import Hscroll from './Hscroll';

const itemStyle = {
	display: 'inline-block',
	background: 'cornsilk',
	width: `${MEDIA_SIZES.xxl}px`,
	height: `${MEDIA_SIZES.xl}px`,
	outline: '1px dotted red',
	padding: `${MEDIA_SIZES.xs}px`
};

const hscrollInlineStyle = {
	width: '50vw'
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
	.addDecorator(decorateWithLocale)
	.addWithInfo(
		'Default',
		'Basic horizontal scroll usage',
		() => (
			<InfoWrapper>
				<Hscroll
					style={hscrollInlineStyle}
				>
					{listItems}
				</Hscroll>
			</InfoWrapper>
		)
	)
	.addWithInfo(
		'With gradient',
		'Basic horizontal scroll with edge gradients',
		() => (
			<InfoWrapper>
				<Hscroll
					style={hscrollInlineStyle}
					hasGradient
				>
					{listItems}
				</Hscroll>
			</InfoWrapper>
		)
	)
	.addWithInfo(
		'Media-conditional unclip',
		'Unclip at a given breakpoint (large)',
		() => (
			<InfoWrapper>
				<Hscroll
					style={hscrollInlineStyle}
					unclipAt='large'
				>
					{listItems}
				</Hscroll>
			</InfoWrapper>
		)
	);
