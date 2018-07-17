import React from 'react';
import Flex, { FlexComponent } from './Flex';
import FlexItem, { FlexItemComponent } from './FlexItem';
import { decorateWithInfo } from '../utils/decorators';
import { storiesOf } from '@storybook/react';

const flexParentStyles = {
	minHeight: '200px',
	padding: '20px',
	width: '100%',
};

const flexItemStyles = {
	backgroundColor: 'rgba(220, 192, 255, 0.45)',
	backgroundClip: 'content-box',
	outline: '1px dotted red',
};

const boxStyles = {
	alignItems: 'center',
	boxSizing: 'border-box',
	display: 'flex',
	height: '100%',
	justifyContent: 'center',
	fontSize: '28px',
	fontWeight: '700',
	padding: '20px',
};

storiesOf('FlexItem', module)
	.addDecorator(decorateWithInfo)
	.addParameters({ info: { propTables: [FlexComponent, FlexItemComponent] } })
	.add(
		'Flex Item grow (default)',
		() => (
			<FlexComponent style={flexParentStyles}>
				<FlexItemComponent style={flexItemStyles}>
					<div style={boxStyles}>Item 1</div>
				</FlexItemComponent>
				<FlexItemComponent style={flexItemStyles}>
					<div style={boxStyles}>Item 2</div>
				</FlexItemComponent>
				<FlexItemComponent style={flexItemStyles}>
					<div style={boxStyles}>Item 2</div>
				</FlexItemComponent>
			</FlexComponent>
		),
		{
			info: {
				text:
					'Following CSS flexbox convention, flex items by default will grow equally with each other to fill the space of their parent `Flex`.',
			},
		}
	)
	.add(
		'Flex Item shrink',
		() => (
			<FlexComponent style={flexParentStyles}>
				<FlexItemComponent shrink style={flexItemStyles}>
					<div style={boxStyles}>Item 1</div>
				</FlexItemComponent>
				<FlexItemComponent shrink style={flexItemStyles}>
					<div style={boxStyles}>Item 2</div>
				</FlexItemComponent>
				<FlexItemComponent shrink style={flexItemStyles}>
					<div style={boxStyles}>Item 2</div>
				</FlexItemComponent>
			</FlexComponent>
		),
		{
			info: {
				text:
					'Adding the `shrink` prop to a `FlexItem` will cause the flex item to shrink to content width (or height, in a column-oriented `Flex`).',
			},
		}
	)
	.add(
		'Flex Item growFactors',
		() => (
			<div style={{ height: '100vh', width: '100%' }}>
				<FlexComponent style={flexParentStyles}>
					<FlexItemComponent growFactor={1} style={flexItemStyles}>
						<div style={boxStyles}>1</div>
					</FlexItemComponent>
					<FlexItemComponent growFactor={7} style={flexItemStyles}>
						<div style={boxStyles}>7</div>
					</FlexItemComponent>
				</FlexComponent>
				<FlexComponent style={flexParentStyles}>
					<FlexItemComponent growFactor={1} style={flexItemStyles}>
						<div style={boxStyles}>1</div>
					</FlexItemComponent>
					<FlexItemComponent growFactor={6} style={flexItemStyles}>
						<div style={boxStyles}>6</div>
					</FlexItemComponent>
				</FlexComponent>
				<FlexComponent style={flexParentStyles}>
					<FlexItemComponent growFactor={1} style={flexItemStyles}>
						<div style={boxStyles}>1</div>
					</FlexItemComponent>
					<FlexItemComponent growFactor={5} style={flexItemStyles}>
						<div style={boxStyles}>5</div>
					</FlexItemComponent>
				</FlexComponent>
				<FlexComponent style={flexParentStyles}>
					<FlexItemComponent growFactor={1} style={flexItemStyles}>
						<div style={boxStyles}>1</div>
					</FlexItemComponent>
					<FlexItemComponent growFactor={4} style={flexItemStyles}>
						<div style={boxStyles}>4</div>
					</FlexItemComponent>
				</FlexComponent>
				<FlexComponent style={flexParentStyles}>
					<FlexItemComponent growFactor={1} style={flexItemStyles}>
						<div style={boxStyles}>1</div>
					</FlexItemComponent>
					<FlexItemComponent growFactor={3} style={flexItemStyles}>
						<div style={boxStyles}>3</div>
					</FlexItemComponent>
				</FlexComponent>
				<FlexComponent style={flexParentStyles}>
					<FlexItemComponent growFactor={1} style={flexItemStyles}>
						<div style={boxStyles}>1</div>
					</FlexItemComponent>
					<FlexItemComponent growFactor={2} style={flexItemStyles}>
						<div style={boxStyles}>2</div>
					</FlexItemComponent>
				</FlexComponent>
				<FlexComponent style={flexParentStyles}>
					<FlexItemComponent growFactor={1} style={flexItemStyles}>
						<div style={boxStyles}>1</div>
					</FlexItemComponent>
					<FlexItemComponent growFactor={1} style={flexItemStyles}>
						<div style={boxStyles}>1</div>
					</FlexItemComponent>
				</FlexComponent>
			</div>
		),
		{
			info: {
				text: `The \`growFactor\` prop accepts a number, which is used as a flexbox \`grow\` value.
            The total of all grow factors in sibling \`FlexItem\` components are euqal to their parent \`Flex\` width.
            For example, if there are flex items with \`growFactor\` values of \`2\` and \`3\`, the first flex item will
            fill two fifths of its parent. Grow factors can be thought of fractional widths.`,
			},
		}
	)
	.add('isLoading', () => (
		<Flex style={flexParentStyles}>
			<FlexItem style={flexItemStyles}>
				<div style={boxStyles}>Item 1</div>
			</FlexItem>
			<FlexItem isLoading style={flexItemStyles}>
				<div style={boxStyles}>isLoading</div>
			</FlexItem>
			<FlexItem style={flexItemStyles}>
				<div style={boxStyles}>Item 2</div>
			</FlexItem>
		</Flex>
	))
	.add('isLoading with loadingProps', () => (
		<Flex style={flexParentStyles}>
			<FlexItem style={flexItemStyles}>
				<div style={boxStyles}>Item 1</div>
			</FlexItem>
			<FlexItem
				isLoading
				loadingProps={{
					color: 'red',
					scrimColor: 'rgba(250, 250, 255, 0.8)',
					size: '64px',
				}}
				style={flexItemStyles}
			>
				<div style={boxStyles}>isLoading</div>
			</FlexItem>
			<FlexItem style={flexItemStyles}>
				<div style={boxStyles}>Item 2</div>
			</FlexItem>
		</Flex>
	));
