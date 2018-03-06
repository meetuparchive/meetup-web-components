import React from 'react';
import Flex from './Flex';
import FlexItem from './FlexItem';
import { storiesOf } from '@storybook/react';

const flexParentStyles = {
	height: '200px',
	padding: '20px',
	width: '100%'
};

const flexItemStyles = {
	backgroundColor: 'rgba(220, 192, 255, 0.45)',
	backgroundClip: 'content-box',
	outline: '1px dotted red'
};

const boxStyles = {
	alignItems: 'center',
	boxSizing: 'border-box',
	display: 'flex',
	height: '100%',
	justifyContent : 'center',
	fontSize: '18px',
	fontWeight: '700',
	padding: '20px',
};

const infoJustify = `The \`justify\` prop accepts valid flexbox \`justify\` values
to declare where to place \`FlexItem\` children within the \`Flex\`.`;

const infoAlign = `The \`align\` prop accepts valid flexbox \`align-items\` values.
For a row-oriented \`Flex\`, this adjusts vertical alignment. For a column-oriented \`Flex\`,
\`align\` adjusts horizontal alignment.`;

const infoReverse = 'You can change the direction of content flow for a specific breakpoint, or at all viewport sizes.';

storiesOf('Flex', module)
	.addWithInfo(
		'Row (default)',
		'The `Flex` component follows flexbox convention, using normal flow direction and row orientation by default.',
		() => (
			<Flex style={flexParentStyles}>
				<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
				<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
				<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 3</div></FlexItem>
				<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 4</div></FlexItem>
				<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 5</div></FlexItem>
			</Flex>
		))
	.addWithInfo(
		'Column',
		'You can change the `direction` of the flex layout with the `direction` prop.',
		() => (
			<Flex direction='column' style={flexParentStyles}>
				<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
				<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
				<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 3</div></FlexItem>
				<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 4</div></FlexItem>
				<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 5</div></FlexItem>
			</Flex>
		))
	.addWithInfo(
		'Wrap',
		'By default, child `FlexItem` components will not wrap. Use the `wrap` property to override.',
		() => (
			<Flex wrap style={flexParentStyles}>
				<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
				<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
				<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 3</div></FlexItem>
				<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 4</div></FlexItem>
				<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 5</div></FlexItem>
				<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 6</div></FlexItem>
				<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 7</div></FlexItem>
				<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 8</div></FlexItem>
				<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 9</div></FlexItem>
				<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 10</div></FlexItem>
				<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 11</div></FlexItem>
				<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 12</div></FlexItem>
				<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 13</div></FlexItem>
				<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 14</div></FlexItem>
				<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 15</div></FlexItem>
			</Flex>
		))
	.addWithInfo(
		'No gutters',
		'By default, child `FlexItem` components have gutters between them. You can remove gutters with the `noGutters` prop.',
		() => (
			<Flex noGutters style={flexParentStyles}>
				<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
				<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
				<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 3</div></FlexItem>
				<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 4</div></FlexItem>
				<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 5</div></FlexItem>
			</Flex>
		))
	.addWithInfo(
		'Justify center',
		infoJustify,
		() => (
			<div style={{width:'800px', border:'1px dotted red'}}>
				<Flex justify='center' style={flexParentStyles}>
					<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
					<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
					<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 3</div></FlexItem>
					<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 4</div></FlexItem>
					<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 5</div></FlexItem>
				</Flex>
			</div>
		))
	.addWithInfo(
		'Justify spaceAround',
		infoJustify,
		() => (
			<div style={{width:'800px', border:'1px dotted red'}}>
				<Flex justify='spaceAround' style={flexParentStyles}>
					<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
					<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
					<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 3</div></FlexItem>
					<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 4</div></FlexItem>
					<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 5</div></FlexItem>
				</Flex>
			</div>
		))
	.addWithInfo(
		'Justify spaceBetween',
		infoJustify,
		() => (
			<div style={{width:'800px', border:'1px dotted red'}}>
				<Flex justify='spaceBetween' style={flexParentStyles}>
					<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
					<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
					<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 3</div></FlexItem>
					<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 4</div></FlexItem>
					<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 5</div></FlexItem>
				</Flex>
			</div>
		))
	.addWithInfo(
		'Justify end',
		infoJustify,
		() => (
			<div style={{width:'800px', border:'1px dotted red'}}>
				<Flex justify='flexEnd' style={flexParentStyles}>
					<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
					<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
					<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 3</div></FlexItem>
					<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 4</div></FlexItem>
					<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 5</div></FlexItem>
				</Flex>
			</div>
		))
	.addWithInfo(
		'Align top',
		infoAlign,
		() => (
			<div style={{border: '1px solid red'}}>
				<Flex align='top' style={flexParentStyles}>
					<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
					<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
					<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 3</div></FlexItem>
					<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 4</div></FlexItem>
					<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 5</div></FlexItem>
				</Flex>
			</div>
		))
	.addWithInfo(
		'Align center',
		infoAlign,
		() => (
			<div style={{border: '1px solid red'}}>
				<Flex align='center' style={flexParentStyles}>
					<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
					<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
					<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 3</div></FlexItem>
					<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 4</div></FlexItem>
					<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 5</div></FlexItem>
				</Flex>
			</div>
		))
	.addWithInfo(
		'Align bottom',
		infoAlign,
		() => (
			<div style={{border: '1px solid red'}}>
				<Flex align='bottom' style={flexParentStyles}>
					<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
					<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
					<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 3</div></FlexItem>
					<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 4</div></FlexItem>
					<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 5</div></FlexItem>
				</Flex>
			</div>
		))
	.addWithInfo(
		'Row reverse',
		infoReverse,
		() => (
			<Flex rowReverse='all' style={flexParentStyles}>
				<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
				<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
				<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 3</div></FlexItem>
				<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 4</div></FlexItem>
				<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 5</div></FlexItem>
			</Flex>
		))
	.addWithInfo(
		'Row reverse (at medium breakpoint)',
		infoReverse,
		() => (
			<Flex rowReverse='medium' style={flexParentStyles}>
				<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
				<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
				<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 3</div></FlexItem>
				<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 4</div></FlexItem>
				<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 5</div></FlexItem>
			</Flex>
		))
	.addWithInfo(
		'Row reverse (at large breakpoint)',
		infoReverse,
		() => (
			<Flex rowReverse='large' style={flexParentStyles}>
				<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
				<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
				<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 3</div></FlexItem>
				<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 4</div></FlexItem>
				<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 5</div></FlexItem>
			</Flex>
		))
	.addWithInfo(
		'Column reverse',
		'You can also reverse column-oriented content flow. At any given breakpoint (or `all` breakpoints).',
		() => (
			<Flex direction='column' columnReverse='all' style={flexParentStyles}>
				<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
				<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
				<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 3</div></FlexItem>
				<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 4</div></FlexItem>
				<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 5</div></FlexItem>
			</Flex>
		))
	.addWithInfo(
		'Switch flex-direction (at medium breakpoint)',
		'You can switch direction of content flow at a given breakpoint, or `all` breakpoints.',
		() => (
			<Flex direction='column' switchDirection='medium' style={flexParentStyles}>
				<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
				<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
				<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 3</div></FlexItem>
				<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 4</div></FlexItem>
				<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 5</div></FlexItem>
			</Flex>
		));
