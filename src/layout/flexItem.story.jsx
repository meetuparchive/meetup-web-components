import React from 'react';
import Flex from './Flex';
import FlexItem from './FlexItem';
import { storiesOf } from '@storybook/react';

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
	.addWithInfo(
		'Flex Item grow (default)',
		'Following CSS flexbox convention, flex items by default will grow equally with each other to fill the space of their parent `Flex`.',
		() => (
			<Flex style={flexParentStyles}>
				<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
				<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
				<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
			</Flex>
		))
	.addWithInfo(
		'Flex Item shrink',
		'Adding the `shrink` prop to a `FlexItem` will cause the flex item to shrink to content width (or height, in a column-oriented `Flex`).',
		() => (
			<Flex style={flexParentStyles}>
				<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
				<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
				<FlexItem shrink style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
			</Flex>
		))
	.addWithInfo(
		'Flex Item growFactors',
		`The \`growFactor\` prop accepts a number, which is used as a flexbox \`grow\` value.
		The total of all grow factors in sibling \`FlexItem\` components are euqal to their parent \`Flex\` width.
		For example, if there are flex items with \`growFactor\` values of \`2\` and \`3\`, the first flex item will
		fill two fifths of its parent. Grow factors can be thought of fractional widths.`,
		() => (
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
		))
	.addWithInfo(
		'isLoading',
		() => (
			<Flex style={flexParentStyles}>
				<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
				<FlexItem isLoading style={flexItemStyles}><div style={boxStyles}>isLoading</div></FlexItem>
				<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
			</Flex>
		))
	.addWithInfo(
		'isLoading with loadingProps',
		() => (
			<Flex style={flexParentStyles}>
				<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 1</div></FlexItem>
				<FlexItem
					isLoading
					loadingProps={{
						color: 'red',
						scrimColor: 'rgba(250, 250, 255, 0.8)',
						size: '64px'
					}}
					style={flexItemStyles}
				>
					<div style={boxStyles}>isLoading</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}><div style={boxStyles}>Item 2</div></FlexItem>
			</Flex>
		));
