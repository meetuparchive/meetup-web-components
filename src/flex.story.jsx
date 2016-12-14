
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
	fontSize: '28px',
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
		<Flex justify='center' style={flexParentStyles}>
			<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
			<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
			<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 3</div></FlexItem>
			<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 4</div></FlexItem>
			<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 5</div></FlexItem>
		</Flex>
	))
	.add('Justify spaceAround', () => (
		<Flex justify='spaceAround' style={flexParentStyles}>
			<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
			<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
			<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 3</div></FlexItem>
			<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 4</div></FlexItem>
			<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 5</div></FlexItem>
		</Flex>
	))
	.add('Justify spaceBetween', () => (
		<Flex justify='spaceBetween' style={flexParentStyles}>
			<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
			<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
			<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 3</div></FlexItem>
			<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 4</div></FlexItem>
			<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 5</div></FlexItem>
		</Flex>
	))
	.add('Justify flexEnd', () => (
		<Flex justify='flexEnd' style={flexParentStyles}>
			<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
			<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
			<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 3</div></FlexItem>
			<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 4</div></FlexItem>
			<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 5</div></FlexItem>
		</Flex>
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
		<Flex rowReverse='atAll' style={flexParentStyles}>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 3</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 4</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 5</div></FlexItem>
		</Flex>
	))
	.add('Row reverse (at medium breakpoint)', () => (
		<Flex rowReverse='atMedium' style={flexParentStyles}>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 3</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 4</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 5</div></FlexItem>
		</Flex>
	))
	.add('Row reverse (at large breakpoint)', () => (
		<Flex rowReverse='atLarge' style={flexParentStyles}>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 3</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 4</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 5</div></FlexItem>
		</Flex>
	))
	.add('Column reverse', () => (
		<Flex direction='column' columnReverse='atAll' style={flexParentStyles}>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 3</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 4</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 5</div></FlexItem>
		</Flex>
	))
	.add('Column reverse (at medium breakpoint)', () => (
		<Flex direction='column' columnReverse='atMedium' style={flexParentStyles}>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 3</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 4</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 5</div></FlexItem>
		</Flex>
	))
	.add('Column reverse (at large breakpoint)', () => (
		<Flex direction='column' columnReverse='atLarge' style={flexParentStyles}>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 3</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 4</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 5</div></FlexItem>
		</Flex>
	))
	.add('Switch flex-direction (at medium breakpoint)', () => (
		<Flex direction='column' switchDirection='atMedium' style={flexParentStyles}>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 3</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 4</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 5</div></FlexItem>
		</Flex>
	))
	.add('Switch flex-direction (at large breakpoint)', () => (
		<Flex direction='column' switchDirection='atLarge' style={flexParentStyles}>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 3</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 4</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 5</div></FlexItem>
		</Flex>
	));
