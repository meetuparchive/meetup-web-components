
import React from 'react';
import Flex from './Flex';
import FlexItem from './FlexItem';
import { storiesOf } from '@kadira/storybook';

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


storiesOf('FlexItem', module)
	.add('Flex Item grow (default)', () => (
		<Flex style={flexParentStyles}>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
			<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
		</Flex>
	))
	.add('Flex Item shrink', () => (
		<Flex style={flexParentStyles}>
			<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
			<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
			<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
		</Flex>
	))
	.add('Flex Item growFactors', () => (
		<div style={{height: '100vh', width: '100%'}}>
			<Flex style={flexParentStyles}>
				<FlexItem growFactor={1} style={flexItemStyles}><div style={boxStyles}>1</div></FlexItem>
				<FlexItem growFactor={7} style={flexItemStyles}><div style={boxStyles}>7</div></FlexItem>
			</Flex>
			<Flex style={flexParentStyles}>
				<FlexItem growFactor={1} style={flexItemStyles}><div style={boxStyles}>1</div></FlexItem>
				<FlexItem growFactor={6} style={flexItemStyles}><div style={boxStyles}>6</div></FlexItem>
			</Flex>
			<Flex style={flexParentStyles}>
				<FlexItem growFactor={1} style={flexItemStyles}><div style={boxStyles}>1</div></FlexItem>
				<FlexItem growFactor={5} style={flexItemStyles}><div style={boxStyles}>5</div></FlexItem>
			</Flex>
			<Flex style={flexParentStyles}>
				<FlexItem growFactor={1} style={flexItemStyles}><div style={boxStyles}>1</div></FlexItem>
				<FlexItem growFactor={4} style={flexItemStyles}><div style={boxStyles}>4</div></FlexItem>
			</Flex>
			<Flex style={flexParentStyles}>
				<FlexItem growFactor={1} style={flexItemStyles}><div style={boxStyles}>1</div></FlexItem>
				<FlexItem growFactor={3} style={flexItemStyles}><div style={boxStyles}>3</div></FlexItem>
			</Flex>
			<Flex style={flexParentStyles}>
				<FlexItem growFactor={1} style={flexItemStyles}><div style={boxStyles}>1</div></FlexItem>
				<FlexItem growFactor={2} style={flexItemStyles}><div style={boxStyles}>2</div></FlexItem>
			</Flex>
			<Flex style={flexParentStyles}>
				<FlexItem growFactor={1} style={flexItemStyles}><div style={boxStyles}>1</div></FlexItem>
				<FlexItem growFactor={1} style={flexItemStyles}><div style={boxStyles}>1</div></FlexItem>
			</Flex>
		</div>
	));
