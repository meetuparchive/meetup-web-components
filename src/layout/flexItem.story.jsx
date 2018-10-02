import React from 'react';
import Flex from './Flex';
import FlexItem, { FlexItemComponent } from './FlexItem';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select, object, text } from '@storybook/addon-knobs';

import { withInfo } from '@storybook/addon-info';
import { C_COOLGRAYMEDIUM } from 'swarm-constants/dist/js/constants';
import { MEDIA_SIZES } from '../utils/designConstants';
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

storiesOf('Layout/FlexItem', module)
	.addDecorator(withInfo)
	.addDecorator(withKnobs)
	.addParameters({
		info: {
			propTables: [FlexItemComponent],
			propTablesExclude: [FlexItem],
		},
	})
	.add(
		'Flex Item grow (default)',
		() => (
			<Flex
				className={text('className', '')}
				shrink={boolean('shrink', false)}
				growFactor={select('growFactor', [1, 2, 3, 4, 5, 6, 7], undefined)}
				isLoading={boolean('isLoading', false)}
				loadingProps={object('loadingProps', {
					color: C_COOLGRAYMEDIUM,
					size: `${MEDIA_SIZES.l}px`,
				})}
				style={flexParentStyles}
			>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 1</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 2</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 2</div>
				</FlexItem>
			</Flex>
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
			<Flex style={flexParentStyles}>
				<FlexItem
					className={text('className', '')}
					shrink={boolean('shrink', true)}
					growFactor={select('growFactor', [1, 2, 3, 4, 5, 6, 7], undefined)}
					isLoading={boolean('isLoading', false)}
					loadingProps={object('loadingProps', {
						color: C_COOLGRAYMEDIUM,
						size: `${MEDIA_SIZES.l}px`,
					})}
					style={flexItemStyles}
				>
					<div style={boxStyles}>Item 1</div>
				</FlexItem>
				<FlexItem
					className={text('className', '')}
					shrink={boolean('shrink', true)}
					growFactor={select('growFactor', [1, 2, 3, 4, 5, 6, 7], undefined)}
					isLoading={boolean('isLoading', false)}
					loadingProps={object('loadingProps', {
						color: C_COOLGRAYMEDIUM,
						size: `${MEDIA_SIZES.l}px`,
					})}
					style={flexItemStyles}
				>
					<div style={boxStyles}>Item 2</div>
				</FlexItem>
				<FlexItem
					className={text('className', '')}
					shrink={boolean('shrink', true)}
					growFactor={select('growFactor', [1, 2, 3, 4, 5, 6, 7], undefined)}
					isLoading={boolean('isLoading', false)}
					loadingProps={object('loadingProps', {
						color: C_COOLGRAYMEDIUM,
						size: `${MEDIA_SIZES.l}px`,
					})}
					style={flexItemStyles}
				>
					<div style={boxStyles}>Item 2</div>
				</FlexItem>
			</Flex>
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
				<Flex align="center" style={{ ...flexParentStyles, height: '100%' }}>
					<FlexItem
						className={text('className', '')}
						shrink={boolean('shrink', false)}
						growFactor={select('growFactor (left)', [1, 2, 3, 4, 5, 6, 7], 1)}
						isLoading={boolean('isLoading', false)}
						loadingProps={object('loadingProps', {
							color: C_COOLGRAYMEDIUM,
							size: `${MEDIA_SIZES.l}px`,
						})}
						style={flexItemStyles}
					>
						<div style={boxStyles}>1</div>
					</FlexItem>
					<FlexItem
						className={text('className', '')}
						shrink={boolean('shrink', false)}
						growFactor={select(
							'growFactor (right)',
							[1, 2, 3, 4, 5, 6, 7],
							7
						)}
						isLoading={boolean('isLoading', false)}
						loadingProps={object('loadingProps', {
							color: C_COOLGRAYMEDIUM,
							size: `${MEDIA_SIZES.l}px`,
						})}
						style={flexItemStyles}
					>
						<div style={boxStyles}>7</div>
					</FlexItem>
				</Flex>
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
			<FlexItem
				className={text('className', '')}
				shrink={boolean('shrink', false)}
				growFactor={select('growFactor', [1, 2, 3, 4, 5, 6, 7], undefined)}
				isLoading={boolean('isLoading', true)}
				loadingProps={object('loadingProps', {
					color: C_COOLGRAYMEDIUM,
					size: `${MEDIA_SIZES.l}px`,
				})}
				style={flexItemStyles}
			>
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
				className={text('className', '')}
				shrink={boolean('shrink', false)}
				growFactor={select('growFactor', [1, 2, 3, 4, 5, 6, 7], undefined)}
				isLoading={boolean('isLoading', true)}
				loadingProps={object('loadingProps', {
					color: 'red',
					scrimColor: 'rgba(250, 250, 255, 0.8)',
					size: '64px',
				})}
				style={flexItemStyles}
			>
				<div style={boxStyles}>isLoading</div>
			</FlexItem>
			<FlexItem style={flexItemStyles}>
				<div style={boxStyles}>Item 2</div>
			</FlexItem>
		</Flex>
	));
