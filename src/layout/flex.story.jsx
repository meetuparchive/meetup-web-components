import React from 'react';
import Flex, { FlexComponent } from './Flex';
import FlexItem, { FlexItemComponent } from './FlexItem';
import { decorateWithInfo } from '../utils/decorators';
import { storiesOf } from '@storybook/react';

const flexParentStyles = {
	height: '200px',
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
	fontSize: '18px',
	fontWeight: '700',
	padding: '20px',
};

const infoJustify = `The \`justify\` prop accepts valid flexbox \`justify\` values
to declare where to place \`FlexItem\` children within the \`Flex\`.`;

const infoAlign = `The \`align\` prop accepts valid flexbox \`align-items\` values.
For a row-oriented \`Flex\`, this adjusts vertical alignment. For a column-oriented \`Flex\`,
\`align\` adjusts horizontal alignment.`;

const infoReverse =
	'You can change the direction of content flow for a specific breakpoint, or at all viewport sizes.';

storiesOf('Flex', module)
	.addDecorator(decorateWithInfo)
	.addParameters({
		info: {
			propTables: [FlexComponent, FlexItemComponent],
			propTablesExclude: [Flex, FlexItem],
		},
	})
	.add(
		'Row (default)',
		() => (
			<FlexComponent style={flexParentStyles}>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 1</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 2</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 3</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 4</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 5</div>
				</FlexItem>
			</FlexComponent>
		),
		{
			info: {
				text:
					'The `Flex` component follows flexbox convention, using normal flow direction and row orientation by default.',
			},
		}
	)
	.add(
		'Column',
		() => (
			<FlexComponent direction="column" style={flexParentStyles}>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 1</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 2</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 3</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 4</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 5</div>
				</FlexItem>
			</FlexComponent>
		),
		{
			info: {
				text:
					'You can change the `direction` of the flex layout with the `direction` prop.',
			},
		}
	)
	.add(
		'Wrap',
		() => (
			<FlexComponent wrap style={flexParentStyles}>
				<FlexItem shrink style={flexItemStyles}>
					<div style={boxStyles}>Item 1</div>
				</FlexItem>
				<FlexItem shrink style={flexItemStyles}>
					<div style={boxStyles}>Item 2</div>
				</FlexItem>
				<FlexItem shrink style={flexItemStyles}>
					<div style={boxStyles}>Item 3</div>
				</FlexItem>
				<FlexItem shrink style={flexItemStyles}>
					<div style={boxStyles}>Item 4</div>
				</FlexItem>
				<FlexItem shrink style={flexItemStyles}>
					<div style={boxStyles}>Item 5</div>
				</FlexItem>
				<FlexItem shrink style={flexItemStyles}>
					<div style={boxStyles}>Item 6</div>
				</FlexItem>
				<FlexItem shrink style={flexItemStyles}>
					<div style={boxStyles}>Item 7</div>
				</FlexItem>
				<FlexItem shrink style={flexItemStyles}>
					<div style={boxStyles}>Item 8</div>
				</FlexItem>
				<FlexItem shrink style={flexItemStyles}>
					<div style={boxStyles}>Item 9</div>
				</FlexItem>
				<FlexItem shrink style={flexItemStyles}>
					<div style={boxStyles}>Item 10</div>
				</FlexItem>
				<FlexItem shrink style={flexItemStyles}>
					<div style={boxStyles}>Item 11</div>
				</FlexItem>
				<FlexItem shrink style={flexItemStyles}>
					<div style={boxStyles}>Item 12</div>
				</FlexItem>
				<FlexItem shrink style={flexItemStyles}>
					<div style={boxStyles}>Item 13</div>
				</FlexItem>
				<FlexItem shrink style={flexItemStyles}>
					<div style={boxStyles}>Item 14</div>
				</FlexItem>
				<FlexItem shrink style={flexItemStyles}>
					<div style={boxStyles}>Item 15</div>
				</FlexItem>
			</FlexComponent>
		),
		{
			info: {
				text:
					'By default, child `FlexItem` components will not wrap. Use the `wrap` property to override.',
			},
		}
	)
	.add(
		'No gutters',
		() => (
			<FlexComponent noGutters style={flexParentStyles}>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 1</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 2</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 3</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 4</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 5</div>
				</FlexItem>
			</FlexComponent>
		),
		{
			info: {
				text:
					'By default, child `FlexItem` components have gutters between them. You can remove gutters with the `noGutters` prop.',
			},
		}
	)
	.add(
		'Justify center',
		() => (
			<div style={{ width: '800px', border: '1px dotted red' }}>
				<FlexComponent justify="center" style={flexParentStyles}>
					<FlexItem shrink style={flexItemStyles}>
						<div style={boxStyles}>Item 1</div>
					</FlexItem>
					<FlexItem shrink style={flexItemStyles}>
						<div style={boxStyles}>Item 2</div>
					</FlexItem>
					<FlexItem shrink style={flexItemStyles}>
						<div style={boxStyles}>Item 3</div>
					</FlexItem>
					<FlexItem shrink style={flexItemStyles}>
						<div style={boxStyles}>Item 4</div>
					</FlexItem>
					<FlexItem shrink style={flexItemStyles}>
						<div style={boxStyles}>Item 5</div>
					</FlexItem>
				</FlexComponent>
			</div>
		),
		{ info: { text: infoJustify } }
	)
	.add(
		'Justify spaceAround',
		() => (
			<div style={{ width: '800px', border: '1px dotted red' }}>
				<FlexComponent justify="spaceAround" style={flexParentStyles}>
					<FlexItem shrink style={flexItemStyles}>
						<div style={boxStyles}>Item 1</div>
					</FlexItem>
					<FlexItem shrink style={flexItemStyles}>
						<div style={boxStyles}>Item 2</div>
					</FlexItem>
					<FlexItem shrink style={flexItemStyles}>
						<div style={boxStyles}>Item 3</div>
					</FlexItem>
					<FlexItem shrink style={flexItemStyles}>
						<div style={boxStyles}>Item 4</div>
					</FlexItem>
					<FlexItem shrink style={flexItemStyles}>
						<div style={boxStyles}>Item 5</div>
					</FlexItem>
				</FlexComponent>
			</div>
		),
		{ info: { text: infoJustify } }
	)
	.add(
		'Justify spaceBetween',
		() => (
			<div style={{ width: '800px', border: '1px dotted red' }}>
				<FlexComponent justify="spaceBetween" style={flexParentStyles}>
					<FlexItem shrink style={flexItemStyles}>
						<div style={boxStyles}>Item 1</div>
					</FlexItem>
					<FlexItem shrink style={flexItemStyles}>
						<div style={boxStyles}>Item 2</div>
					</FlexItem>
					<FlexItem shrink style={flexItemStyles}>
						<div style={boxStyles}>Item 3</div>
					</FlexItem>
					<FlexItem shrink style={flexItemStyles}>
						<div style={boxStyles}>Item 4</div>
					</FlexItem>
					<FlexItem shrink style={flexItemStyles}>
						<div style={boxStyles}>Item 5</div>
					</FlexItem>
				</FlexComponent>
			</div>
		),
		{ info: { text: infoJustify } }
	)
	.add(
		'Justify end',
		() => (
			<div style={{ width: '800px', border: '1px dotted red' }}>
				<FlexComponent justify="flexEnd" style={flexParentStyles}>
					<FlexItem shrink style={flexItemStyles}>
						<div style={boxStyles}>Item 1</div>
					</FlexItem>
					<FlexItem shrink style={flexItemStyles}>
						<div style={boxStyles}>Item 2</div>
					</FlexItem>
					<FlexItem shrink style={flexItemStyles}>
						<div style={boxStyles}>Item 3</div>
					</FlexItem>
					<FlexItem shrink style={flexItemStyles}>
						<div style={boxStyles}>Item 4</div>
					</FlexItem>
					<FlexItem shrink style={flexItemStyles}>
						<div style={boxStyles}>Item 5</div>
					</FlexItem>
				</FlexComponent>
			</div>
		),
		{ info: { text: infoJustify } }
	)
	.add(
		'Align top',
		() => (
			<div style={{ border: '1px solid red' }}>
				<FlexComponent align="top" style={flexParentStyles}>
					<FlexItem shrink style={flexItemStyles}>
						<div style={boxStyles}>Item 1</div>
					</FlexItem>
					<FlexItem shrink style={flexItemStyles}>
						<div style={boxStyles}>Item 2</div>
					</FlexItem>
					<FlexItem shrink style={flexItemStyles}>
						<div style={boxStyles}>Item 3</div>
					</FlexItem>
					<FlexItem shrink style={flexItemStyles}>
						<div style={boxStyles}>Item 4</div>
					</FlexItem>
					<FlexItem shrink style={flexItemStyles}>
						<div style={boxStyles}>Item 5</div>
					</FlexItem>
				</FlexComponent>
			</div>
		),
		{ info: { text: infoAlign } }
	)
	.add(
		'Align center',
		() => (
			<div style={{ border: '1px solid red' }}>
				<FlexComponent align="center" style={flexParentStyles}>
					<FlexItem shrink style={flexItemStyles}>
						<div style={boxStyles}>Item 1</div>
					</FlexItem>
					<FlexItem shrink style={flexItemStyles}>
						<div style={boxStyles}>Item 2</div>
					</FlexItem>
					<FlexItem shrink style={flexItemStyles}>
						<div style={boxStyles}>Item 3</div>
					</FlexItem>
					<FlexItem shrink style={flexItemStyles}>
						<div style={boxStyles}>Item 4</div>
					</FlexItem>
					<FlexItem shrink style={flexItemStyles}>
						<div style={boxStyles}>Item 5</div>
					</FlexItem>
				</FlexComponent>
			</div>
		),
		{ info: { text: infoAlign } }
	)
	.add(
		'Align bottom',
		() => (
			<div style={{ border: '1px solid red' }}>
				<FlexComponent align="bottom" style={flexParentStyles}>
					<FlexItem shrink style={flexItemStyles}>
						<div style={boxStyles}>Item 1</div>
					</FlexItem>
					<FlexItem shrink style={flexItemStyles}>
						<div style={boxStyles}>Item 2</div>
					</FlexItem>
					<FlexItem shrink style={flexItemStyles}>
						<div style={boxStyles}>Item 3</div>
					</FlexItem>
					<FlexItem shrink style={flexItemStyles}>
						<div style={boxStyles}>Item 4</div>
					</FlexItem>
					<FlexItem shrink style={flexItemStyles}>
						<div style={boxStyles}>Item 5</div>
					</FlexItem>
				</FlexComponent>
			</div>
		),
		{ info: { text: infoAlign } }
	)
	.add(
		'Row reverse',
		() => (
			<FlexComponent rowReverse="all" style={flexParentStyles}>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 1</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 2</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 3</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 4</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 5</div>
				</FlexItem>
			</FlexComponent>
		),
		{ info: { text: infoReverse } }
	)
	.add(
		'Row reverse (at medium breakpoint)',
		() => (
			<FlexComponent rowReverse="medium" style={flexParentStyles}>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 1</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 2</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 3</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 4</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 5</div>
				</FlexItem>
			</FlexComponent>
		),
		{ info: { text: infoReverse } }
	)
	.add(
		'Row reverse (at large breakpoint)',
		() => (
			<FlexComponent rowReverse="large" style={flexParentStyles}>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 1</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 2</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 3</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 4</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 5</div>
				</FlexItem>
			</FlexComponent>
		),
		{ info: { text: infoReverse } }
	)
	.add(
		'Column reverse',
		() => (
			<FlexComponent
				direction="column"
				columnReverse="all"
				style={flexParentStyles}
			>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 1</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 2</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 3</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 4</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 5</div>
				</FlexItem>
			</FlexComponent>
		),
		{
			info: {
				text:
					'You can also reverse column-oriented content flow. At any given breakpoint (or `all` breakpoints).',
			},
		}
	)
	.add(
		'Switch flex-direction (at medium breakpoint)',
		() => (
			<FlexComponent
				direction="column"
				switchDirection="medium"
				style={flexParentStyles}
			>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 1</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 2</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 3</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 4</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 5</div>
				</FlexItem>
			</FlexComponent>
		),
		{
			info: {
				text:
					'You can switch direction of content flow at a given breakpoint, or `all` breakpoints.',
			},
		}
	)
	.add('isLoading', () => (
		<Flex isLoading style={flexParentStyles}>
			<FlexItem style={flexItemStyles}>
				<div style={boxStyles}>Item 1</div>
			</FlexItem>
			<FlexItem style={flexItemStyles}>
				<div style={boxStyles}>Item 2</div>
			</FlexItem>
			<FlexItem style={flexItemStyles}>
				<div style={boxStyles}>Item 3</div>
			</FlexItem>
			<FlexItem style={flexItemStyles}>
				<div style={boxStyles}>Item 4</div>
			</FlexItem>
			<FlexItem style={flexItemStyles}>
				<div style={boxStyles}>Item 5</div>
			</FlexItem>
		</Flex>
	))
	.add('isLoading with loadingProps', () => (
		<Flex
			isLoading
			loadingProps={{
				color: 'red',
				scrimColor: 'rgba(250, 250, 255, 0.8)',
				size: '64px',
			}}
			style={flexParentStyles}
		>
			<FlexItem style={flexItemStyles}>
				<div style={boxStyles}>Item 1</div>
			</FlexItem>
			<FlexItem style={flexItemStyles}>
				<div style={boxStyles}>Item 2</div>
			</FlexItem>
			<FlexItem style={flexItemStyles}>
				<div style={boxStyles}>Item 3</div>
			</FlexItem>
			<FlexItem style={flexItemStyles}>
				<div style={boxStyles}>Item 4</div>
			</FlexItem>
			<FlexItem style={flexItemStyles}>
				<div style={boxStyles}>Item 5</div>
			</FlexItem>
		</Flex>
	));
