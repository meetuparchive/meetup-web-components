
import React from 'react';
import Flex from './Flex';
import FlexItem from './FlexItem';
import { storiesOf } from '@kadira/storybook';
import { Annotate } from './utils/storyComponents';


const flexParentStyles = {
	minHeight: '200px',
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

storiesOf('Flex', module)
	.add('Row (default)', () => (
		<Flex style={flexParentStyles}>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 3</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 4</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 5</div></FlexItem>
		</Flex>
	))
	.add('Column', () => (
		<Flex direction='column' style={flexParentStyles}>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 3</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 4</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 5</div></FlexItem>
		</Flex>
	))
	.add('Wrap', () => (
		<Annotate notes='Wrapping will not occur if no `FlexItem` children have a `shrink` prop to give them a flex shrink factor'>
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
		</Annotate>
	))
	.add('No gutters', () => (
		<Flex noGutters style={flexParentStyles}>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 3</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 4</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 5</div></FlexItem>
		</Flex>
	))
	.add('Justify center', () => (
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
	.add('Justify spaceAround', () => (
		<div style={{width:'800px', border:'1px dotted red'}}>
			<Flex justify='around' style={flexParentStyles}>
				<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
				<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
				<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 3</div></FlexItem>
				<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 4</div></FlexItem>
				<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 5</div></FlexItem>
			</Flex>
		</div>
	))
	.add('Justify spaceBetween', () => (
		<div style={{width:'800px', border:'1px dotted red'}}>
			<Flex justify='between' style={flexParentStyles}>
				<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
				<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
				<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 3</div></FlexItem>
				<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 4</div></FlexItem>
				<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 5</div></FlexItem>
			</Flex>
		</div>
	))
	.add('Justify end', () => (
		<div style={{width:'800px', border:'1px dotted red'}}>
			<Flex justify='end' style={flexParentStyles}>
				<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
				<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
				<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 3</div></FlexItem>
				<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 4</div></FlexItem>
				<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 5</div></FlexItem>
			</Flex>
		</div>
	))
	.add('Align top', () => (
			<Flex align='top' style={flexParentStyles}>
				<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
				<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
				<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 3</div></FlexItem>
				<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 4</div></FlexItem>
				<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 5</div></FlexItem>
			</Flex>
	))
	.add('Align center', () => (
			<Flex align='center' style={flexParentStyles}>
				<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
				<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
				<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 3</div></FlexItem>
				<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 4</div></FlexItem>
				<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 5</div></FlexItem>
			</Flex>
	))
	.add('Align bottom', () => (
			<Flex align='bottom' style={flexParentStyles}>
				<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
				<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
				<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 3</div></FlexItem>
				<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 4</div></FlexItem>
				<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 5</div></FlexItem>
			</Flex>
	))
	.add('Row reverse', () => (
		<Flex rowReverse='all' style={flexParentStyles}>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 3</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 4</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 5</div></FlexItem>
		</Flex>
	))
	.add('Row reverse (at medium breakpoint)', () => (
		<Flex rowReverse='medium' style={flexParentStyles}>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 3</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 4</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 5</div></FlexItem>
		</Flex>
	))
	.add('Row reverse (at large breakpoint)', () => (
		<Flex rowReverse='large' style={flexParentStyles}>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 3</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 4</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 5</div></FlexItem>
		</Flex>
	))
	.add('Column reverse', () => (
		<Flex direction='column' columnReverse='all' style={flexParentStyles}>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 3</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 4</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 5</div></FlexItem>
		</Flex>
	))
	.add('Column reverse (at medium breakpoint)', () => (
		<Flex direction='column' columnReverse='medium' style={flexParentStyles}>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 3</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 4</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 5</div></FlexItem>
		</Flex>
	))
	.add('Column reverse (at large breakpoint)', () => (
		<Flex direction='column' columnReverse='large' style={flexParentStyles}>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 3</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 4</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 5</div></FlexItem>
		</Flex>
	))
	.add('Switch flex-direction (at medium breakpoint)', () => (
		<Flex direction='column' switchDirection='medium' style={flexParentStyles}>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 3</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 4</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 5</div></FlexItem>
		</Flex>
	))
	.add('Switch flex-direction (at large breakpoint)', () => (
		<Flex direction='column' switchDirection='large' style={flexParentStyles}>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 3</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 4</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 5</div></FlexItem>
		</Flex>
	));
