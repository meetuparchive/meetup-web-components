import React from 'react';
import Flex, { FlexComponent } from './Flex';
import FlexItem, { FlexItemComponent } from './FlexItem';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, object, select } from '@storybook/addon-knobs';

import { withInfo } from '@storybook/addon-info';
import { C_COOLGRAYMEDIUM } from 'swarm-constants/dist/js/constants';
import { MEDIA_SIZES } from '../utils/designConstants';

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

storiesOf('Layout/Flex', module)
	.addDecorator(withInfo)
	.addDecorator(withKnobs)
	.addParameters({
		info: {
			propTables: [FlexComponent, FlexItemComponent],
			propTablesExclude: [Flex, FlexItem],
		},
	})
	.add(
		'Row (default)',
		() => (
			<Flex
				className={text('className', '')}
				align={select('align', ['top', 'bottom', 'center'], undefined)}
				justify={select(
					'justify',
					['center', 'spaceAround', 'spaceBetween', 'flexEnd', 'flexStart'],
					undefined
				)}
				wrap={boolean('wrap', false)}
				noGutters={boolean('noGutters', false)}
				direction={select('direction', ['row', 'column'], 'row')}
				switchDirection={select(
					'switchDirection',
					['all', 'medium', 'large'],
					undefined
				)}
				rowReverse={select(
					'rowReverse',
					[true, false, 'all', 'medium', 'large'],
					undefined
				)}
				columnReverse={select(
					'columnReverse',
					[true, false, 'all', 'medium', 'large'],
					undefined
				)}
				justifyItems={select(
					'justifyItems',
					['left', 'center', 'right'],
					undefined
				)}
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
					<div style={boxStyles}>Item 3</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 4</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 5</div>
				</FlexItem>
			</Flex>
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
			<Flex
				className={text('className', '')}
				align={select('align', ['top', 'bottom', 'center'], undefined)}
				justify={select(
					'justify',
					['center', 'spaceAround', 'spaceBetween', 'flexEnd', 'flexStart'],
					undefined
				)}
				wrap={boolean('wrap', false)}
				noGutters={boolean('noGutters', false)}
				direction={select('direction', ['row', 'column'], 'column')}
				switchDirection={select(
					'switchDirection',
					['all', 'medium', 'large'],
					undefined
				)}
				rowReverse={select(
					'rowReverse',
					[true, false, 'all', 'medium', 'large'],
					undefined
				)}
				columnReverse={select(
					'columnReverse',
					[true, false, 'all', 'medium', 'large'],
					undefined
				)}
				justifyItems={select(
					'justifyItems',
					['left', 'center', 'right'],
					undefined
				)}
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
					<div style={boxStyles}>Item 3</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 4</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 5</div>
				</FlexItem>
			</Flex>
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
			<Flex
				className={text('className', '')}
				align={select('align', ['top', 'bottom', 'center'], undefined)}
				justify={select(
					'justify',
					['center', 'spaceAround', 'spaceBetween', 'flexEnd', 'flexStart'],
					undefined
				)}
				wrap={boolean('wrap', true)}
				noGutters={boolean('noGutters', false)}
				direction={select('direction', ['row', 'column'], 'column')}
				switchDirection={select(
					'switchDirection',
					['all', 'medium', 'large'],
					undefined
				)}
				rowReverse={select(
					'rowReverse',
					[true, false, 'all', 'medium', 'large'],
					undefined
				)}
				columnReverse={select(
					'columnReverse',
					[true, false, 'all', 'medium', 'large'],
					undefined
				)}
				justifyItems={select(
					'justifyItems',
					['left', 'center', 'right'],
					undefined
				)}
				isLoading={boolean('isLoading', false)}
				loadingProps={object('loadingProps', {
					color: C_COOLGRAYMEDIUM,
					size: `${MEDIA_SIZES.l}px`,
				})}
				style={flexParentStyles}
			>
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
			</Flex>
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
			<Flex
				className={text('className', '')}
				align={select('align', ['top', 'bottom', 'center'], undefined)}
				justify={select(
					'justify',
					['center', 'spaceAround', 'spaceBetween', 'flexEnd', 'flexStart'],
					undefined
				)}
				wrap={boolean('wrap', false)}
				noGutters={boolean('noGutters', true)}
				direction={select('direction', ['row', 'column'], 'row')}
				switchDirection={select(
					'switchDirection',
					['all', 'medium', 'large'],
					undefined
				)}
				rowReverse={select(
					'rowReverse',
					[true, false, 'all', 'medium', 'large'],
					undefined
				)}
				columnReverse={select(
					'columnReverse',
					[true, false, 'all', 'medium', 'large'],
					undefined
				)}
				justifyItems={select(
					'justifyItems',
					['left', 'center', 'right'],
					undefined
				)}
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
					<div style={boxStyles}>Item 3</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 4</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 5</div>
				</FlexItem>
			</Flex>
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
				<Flex
					className={text('className', '')}
					align={select('align', ['top', 'bottom', 'center'], undefined)}
					justify={select(
						'justify',
						['center', 'spaceAround', 'spaceBetween', 'flexEnd', 'flexStart'],
						'center'
					)}
					wrap={boolean('wrap', false)}
					noGutters={boolean('noGutters', false)}
					direction={select('direction', ['row', 'column'], 'row')}
					switchDirection={select(
						'switchDirection',
						['all', 'medium', 'large'],
						undefined
					)}
					rowReverse={select(
						'rowReverse',
						[true, false, 'all', 'medium', 'large'],
						undefined
					)}
					columnReverse={select(
						'columnReverse',
						[true, false, 'all', 'medium', 'large'],
						undefined
					)}
					justifyItems={select(
						'justifyItems',
						['left', 'center', 'right'],
						undefined
					)}
					isLoading={boolean('isLoading', false)}
					loadingProps={object('loadingProps', {
						color: C_COOLGRAYMEDIUM,
						size: `${MEDIA_SIZES.l}px`,
					})}
					style={flexParentStyles}
				>
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
				</Flex>
			</div>
		),
		{ info: { text: infoJustify } }
	)
	.add(
		'Justify spaceAround',
		() => (
			<div style={{ width: '800px', border: '1px dotted red' }}>
				<Flex
					className={text('className', '')}
					align={select('align', ['top', 'bottom', 'center'], undefined)}
					justify={select(
						'justify',
						['center', 'spaceAround', 'spaceBetween', 'flexEnd', 'flexStart'],
						'spaceAround'
					)}
					wrap={boolean('wrap', false)}
					noGutters={boolean('noGutters', false)}
					direction={select('direction', ['row', 'column'], 'row')}
					switchDirection={select(
						'switchDirection',
						['all', 'medium', 'large'],
						undefined
					)}
					rowReverse={select(
						'rowReverse',
						[true, false, 'all', 'medium', 'large'],
						undefined
					)}
					columnReverse={select(
						'columnReverse',
						[true, false, 'all', 'medium', 'large'],
						undefined
					)}
					justifyItems={select(
						'justifyItems',
						['left', 'center', 'right'],
						undefined
					)}
					isLoading={boolean('isLoading', false)}
					loadingProps={object('loadingProps', {
						color: C_COOLGRAYMEDIUM,
						size: `${MEDIA_SIZES.l}px`,
					})}
					style={flexParentStyles}
				>
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
				</Flex>
			</div>
		),
		{ info: { text: infoJustify } }
	)
	.add(
		'Justify spaceBetween',
		() => (
			<div style={{ width: '800px', border: '1px dotted red' }}>
				<Flex
					className={text('className', '')}
					align={select('align', ['top', 'bottom', 'center'], undefined)}
					justify={select(
						'justify',
						['center', 'spaceAround', 'spaceBetween', 'flexEnd', 'flexStart'],
						'spaceBetween'
					)}
					wrap={boolean('wrap', false)}
					noGutters={boolean('noGutters', false)}
					direction={select('direction', ['row', 'column'], 'row')}
					switchDirection={select(
						'switchDirection',
						['all', 'medium', 'large'],
						undefined
					)}
					rowReverse={select(
						'rowReverse',
						[true, false, 'all', 'medium', 'large'],
						undefined
					)}
					columnReverse={select(
						'columnReverse',
						[true, false, 'all', 'medium', 'large'],
						undefined
					)}
					justifyItems={select(
						'justifyItems',
						['left', 'center', 'right'],
						undefined
					)}
					isLoading={boolean('isLoading', false)}
					loadingProps={object('loadingProps', {
						color: C_COOLGRAYMEDIUM,
						size: `${MEDIA_SIZES.l}px`,
					})}
					style={flexParentStyles}
				>
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
				</Flex>
			</div>
		),
		{ info: { text: infoJustify } }
	)
	.add(
		'Justify end',
		() => (
			<div style={{ width: '800px', border: '1px dotted red' }}>
				<Flex
					className={text('className', '')}
					align={select('align', ['top', 'bottom', 'center'], undefined)}
					justify={select(
						'justify',
						['center', 'spaceAround', 'spaceBetween', 'flexEnd', 'flexStart'],
						'flexEnd'
					)}
					wrap={boolean('wrap', false)}
					noGutters={boolean('noGutters', false)}
					direction={select('direction', ['row', 'column'], 'row')}
					switchDirection={select(
						'switchDirection',
						['all', 'medium', 'large'],
						undefined
					)}
					rowReverse={select(
						'rowReverse',
						[true, false, 'all', 'medium', 'large'],
						undefined
					)}
					columnReverse={select(
						'columnReverse',
						[true, false, 'all', 'medium', 'large'],
						undefined
					)}
					justifyItems={select(
						'justifyItems',
						['left', 'center', 'right'],
						undefined
					)}
					isLoading={boolean('isLoading', false)}
					loadingProps={object('loadingProps', {
						color: C_COOLGRAYMEDIUM,
						size: `${MEDIA_SIZES.l}px`,
					})}
					style={flexParentStyles}
				>
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
				</Flex>
			</div>
		),
		{ info: { text: infoJustify } }
	)
	.add(
		'Align top',
		() => (
			<div style={{ border: '1px solid red' }}>
				<Flex
					className={text('className', '')}
					align={select('align', ['top', 'bottom', 'center'], 'top')}
					justify={select(
						'justify',
						['center', 'spaceAround', 'spaceBetween', 'flexEnd', 'flexStart'],
						undefined
					)}
					wrap={boolean('wrap', false)}
					noGutters={boolean('noGutters', false)}
					direction={select('direction', ['row', 'column'], 'row')}
					switchDirection={select(
						'switchDirection',
						['all', 'medium', 'large'],
						undefined
					)}
					rowReverse={select(
						'rowReverse',
						[true, false, 'all', 'medium', 'large'],
						undefined
					)}
					columnReverse={select(
						'columnReverse',
						[true, false, 'all', 'medium', 'large'],
						undefined
					)}
					justifyItems={select(
						'justifyItems',
						['left', 'center', 'right'],
						undefined
					)}
					isLoading={boolean('isLoading', false)}
					loadingProps={object('loadingProps', {
						color: C_COOLGRAYMEDIUM,
						size: `${MEDIA_SIZES.l}px`,
					})}
					style={flexParentStyles}
				>
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
				</Flex>
			</div>
		),
		{ info: { text: infoAlign } }
	)
	.add(
		'Align center',
		() => (
			<div style={{ border: '1px solid red' }}>
				<Flex
					className={text('className', '')}
					align={select('align', ['top', 'bottom', 'center'], 'center')}
					justify={select(
						'justify',
						['center', 'spaceAround', 'spaceBetween', 'flexEnd', 'flexStart'],
						undefined
					)}
					wrap={boolean('wrap', false)}
					noGutters={boolean('noGutters', false)}
					direction={select('direction', ['row', 'column'], 'row')}
					switchDirection={select(
						'switchDirection',
						['all', 'medium', 'large'],
						undefined
					)}
					rowReverse={select(
						'rowReverse',
						[true, false, 'all', 'medium', 'large'],
						undefined
					)}
					columnReverse={select(
						'columnReverse',
						[true, false, 'all', 'medium', 'large'],
						undefined
					)}
					justifyItems={select(
						'justifyItems',
						['left', 'center', 'right'],
						undefined
					)}
					isLoading={boolean('isLoading', false)}
					loadingProps={object('loadingProps', {
						color: C_COOLGRAYMEDIUM,
						size: `${MEDIA_SIZES.l}px`,
					})}
					style={flexParentStyles}
				>
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
				</Flex>
			</div>
		),
		{ info: { text: infoAlign } }
	)
	.add(
		'Align bottom',
		() => (
			<div style={{ border: '1px solid red' }}>
				<Flex
					className={text('className', '')}
					align={select('align', ['top', 'bottom', 'center'], 'bottom')}
					justify={select(
						'justify',
						['center', 'spaceAround', 'spaceBetween', 'flexEnd', 'flexStart'],
						undefined
					)}
					wrap={boolean('wrap', false)}
					noGutters={boolean('noGutters', false)}
					direction={select('direction', ['row', 'column'], 'row')}
					switchDirection={select(
						'switchDirection',
						['all', 'medium', 'large'],
						undefined
					)}
					rowReverse={select(
						'rowReverse',
						[true, false, 'all', 'medium', 'large'],
						undefined
					)}
					columnReverse={select(
						'columnReverse',
						[true, false, 'all', 'medium', 'large'],
						undefined
					)}
					justifyItems={select(
						'justifyItems',
						['left', 'center', 'right'],
						undefined
					)}
					isLoading={boolean('isLoading', false)}
					loadingProps={object('loadingProps', {
						color: C_COOLGRAYMEDIUM,
						size: `${MEDIA_SIZES.l}px`,
					})}
					style={flexParentStyles}
				>
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
				</Flex>
			</div>
		),
		{ info: { text: infoAlign } }
	)
	.add(
		'Row reverse',
		() => (
			<Flex
				className={text('className', '')}
				align={select('align', ['top', 'bottom', 'center'], undefined)}
				justify={select(
					'justify',
					['center', 'spaceAround', 'spaceBetween', 'flexEnd', 'flexStart'],
					undefined
				)}
				wrap={boolean('wrap', false)}
				noGutters={boolean('noGutters', false)}
				direction={select('direction', ['row', 'column'], 'row')}
				switchDirection={select(
					'switchDirection',
					['all', 'medium', 'large'],
					undefined
				)}
				rowReverse={select(
					'rowReverse',
					[true, false, 'all', 'medium', 'large'],
					'all'
				)}
				columnReverse={select(
					'columnReverse',
					[true, false, 'all', 'medium', 'large'],
					undefined
				)}
				justifyItems={select(
					'justifyItems',
					['left', 'center', 'right'],
					undefined
				)}
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
					<div style={boxStyles}>Item 3</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 4</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 5</div>
				</FlexItem>
			</Flex>
		),
		{ info: { text: infoReverse } }
	)
	.add(
		'Row reverse (at medium breakpoint)',
		() => (
			<Flex
				className={text('className', '')}
				align={select('align', ['top', 'bottom', 'center'], undefined)}
				justify={select(
					'justify',
					['center', 'spaceAround', 'spaceBetween', 'flexEnd', 'flexStart'],
					undefined
				)}
				wrap={boolean('wrap', false)}
				noGutters={boolean('noGutters', false)}
				direction={select('direction', ['row', 'column'], 'row')}
				switchDirection={select(
					'switchDirection',
					['all', 'medium', 'large'],
					undefined
				)}
				rowReverse={select(
					'rowReverse',
					[true, false, 'all', 'medium', 'large'],
					'medium'
				)}
				columnReverse={select(
					'columnReverse',
					[true, false, 'all', 'medium', 'large'],
					undefined
				)}
				justifyItems={select(
					'justifyItems',
					['left', 'center', 'right'],
					undefined
				)}
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
					<div style={boxStyles}>Item 3</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 4</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 5</div>
				</FlexItem>
			</Flex>
		),
		{ info: { text: infoReverse } }
	)
	.add(
		'Row reverse (at large breakpoint)',
		() => (
			<Flex
				className={text('className', '')}
				align={select('align', ['top', 'bottom', 'center'], undefined)}
				justify={select(
					'justify',
					['center', 'spaceAround', 'spaceBetween', 'flexEnd', 'flexStart'],
					undefined
				)}
				wrap={boolean('wrap', false)}
				noGutters={boolean('noGutters', false)}
				direction={select('direction', ['row', 'column'], 'row')}
				switchDirection={select(
					'switchDirection',
					['all', 'medium', 'large'],
					undefined
				)}
				rowReverse={select(
					'rowReverse',
					[true, false, 'all', 'medium', 'large'],
					'large'
				)}
				columnReverse={select(
					'columnReverse',
					[true, false, 'all', 'medium', 'large'],
					undefined
				)}
				justifyItems={select(
					'justifyItems',
					['left', 'center', 'right'],
					undefined
				)}
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
					<div style={boxStyles}>Item 3</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 4</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 5</div>
				</FlexItem>
			</Flex>
		),
		{ info: { text: infoReverse } }
	)
	.add(
		'Column reverse',
		() => (
			<Flex
				className={text('className', '')}
				align={select('align', ['top', 'bottom', 'center'], undefined)}
				justify={select(
					'justify',
					['center', 'spaceAround', 'spaceBetween', 'flexEnd', 'flexStart'],
					undefined
				)}
				wrap={boolean('wrap', false)}
				noGutters={boolean('noGutters', false)}
				direction={select('direction', ['row', 'column'], 'column')}
				switchDirection={select(
					'switchDirection',
					['all', 'medium', 'large'],
					undefined
				)}
				rowReverse={select(
					'rowReverse',
					[true, false, 'all', 'medium', 'large'],
					undefined
				)}
				columnReverse={select(
					'columnReverse',
					[true, false, 'all', 'medium', 'large'],
					'all'
				)}
				justifyItems={select(
					'justifyItems',
					['left', 'center', 'right'],
					undefined
				)}
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
					<div style={boxStyles}>Item 3</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 4</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 5</div>
				</FlexItem>
			</Flex>
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
			<Flex
				className={text('className', '')}
				align={select('align', ['top', 'bottom', 'center'], undefined)}
				justify={select(
					'justify',
					['center', 'spaceAround', 'spaceBetween', 'flexEnd', 'flexStart'],
					undefined
				)}
				wrap={boolean('wrap', false)}
				noGutters={boolean('noGutters', false)}
				direction={select('direction', ['row', 'column'], 'column')}
				switchDirection={select(
					'switchDirection',
					['all', 'medium', 'large'],
					'medium'
				)}
				rowReverse={select(
					'rowReverse',
					[true, false, 'all', 'medium', 'large'],
					undefined
				)}
				columnReverse={select(
					'columnReverse',
					[true, false, 'all', 'medium', 'large'],
					undefined
				)}
				justifyItems={select(
					'justifyItems',
					['left', 'center', 'right'],
					undefined
				)}
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
					<div style={boxStyles}>Item 3</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 4</div>
				</FlexItem>
				<FlexItem style={flexItemStyles}>
					<div style={boxStyles}>Item 5</div>
				</FlexItem>
			</Flex>
		),
		{
			info: {
				text:
					'You can switch direction of content flow at a given breakpoint, or `all` breakpoints.',
			},
		}
	)
	.add('justify items left', () => (
		<Flex
			style={(flexParentStyles, { padding: 0 })}
			className={text('className', '')}
			align={select('align', ['top', 'bottom', 'center'], undefined)}
			justify={select(
				'justify',
				['center', 'spaceAround', 'spaceBetween', 'flexEnd', 'flexStart'],
				undefined
			)}
			wrap={boolean('wrap', false)}
			noGutters={boolean('noGutters', false)}
			direction={select('direction', ['row', 'column'], 'row')}
			switchDirection={select(
				'switchDirection',
				['all', 'medium', 'large'],
				undefined
			)}
			rowReverse={select(
				'rowReverse',
				[true, false, 'all', 'medium', 'large'],
				undefined
			)}
			columnReverse={select(
				'columnReverse',
				[true, false, 'all', 'medium', 'large'],
				undefined
			)}
			justifyItems={select('justifyItems', ['left', 'center', 'right'], 'left')}
			isLoading={boolean('isLoading', false)}
			loadingProps={object('loadingProps', {
				color: C_COOLGRAYMEDIUM,
				size: `${MEDIA_SIZES.l}px`,
			})}
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
	))
	.add('justify items right', () => (
		<Flex
			style={(flexParentStyles, { padding: 0 })}
			className={text('className', '')}
			align={select('align', ['top', 'bottom', 'center'], undefined)}
			justify={select(
				'justify',
				['center', 'spaceAround', 'spaceBetween', 'flexEnd', 'flexStart'],
				undefined
			)}
			wrap={boolean('wrap', false)}
			noGutters={boolean('noGutters', false)}
			direction={select('direction', ['row', 'column'], 'row')}
			switchDirection={select(
				'switchDirection',
				['all', 'medium', 'large'],
				undefined
			)}
			rowReverse={select(
				'rowReverse',
				[true, false, 'all', 'medium', 'large'],
				undefined
			)}
			columnReverse={select(
				'columnReverse',
				[true, false, 'all', 'medium', 'large'],
				undefined
			)}
			justifyItems={select('justifyItems', ['left', 'center', 'right'], 'right')}
			isLoading={boolean('isLoading', false)}
			loadingProps={object('loadingProps', {
				color: C_COOLGRAYMEDIUM,
				size: `${MEDIA_SIZES.l}px`,
			})}
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
	))
	.add('justify items center', () => (
		<Flex
			style={(flexParentStyles, { padding: 0 })}
			className={text('className', '')}
			align={select('align', ['top', 'bottom', 'center'], undefined)}
			justify={select(
				'justify',
				['center', 'spaceAround', 'spaceBetween', 'flexEnd', 'flexStart'],
				undefined
			)}
			wrap={boolean('wrap', false)}
			noGutters={boolean('noGutters', false)}
			direction={select('direction', ['row', 'column'], 'row')}
			switchDirection={select(
				'switchDirection',
				['all', 'medium', 'large'],
				undefined
			)}
			rowReverse={select(
				'rowReverse',
				[true, false, 'all', 'medium', 'large'],
				undefined
			)}
			columnReverse={select(
				'columnReverse',
				[true, false, 'all', 'medium', 'large'],
				undefined
			)}
			justifyItems={select('justifyItems', ['left', 'center', 'right'], 'center')}
			isLoading={boolean('isLoading', false)}
			loadingProps={object('loadingProps', {
				color: C_COOLGRAYMEDIUM,
				size: `${MEDIA_SIZES.l}px`,
			})}
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
	))
	.add('isLoading', () => (
		<Flex
			className={text('className', '')}
			align={select('align', ['top', 'bottom', 'center'], undefined)}
			justify={select(
				'justify',
				['center', 'spaceAround', 'spaceBetween', 'flexEnd', 'flexStart'],
				undefined
			)}
			wrap={boolean('wrap', false)}
			noGutters={boolean('noGutters', false)}
			direction={select('direction', ['row', 'column'], 'row')}
			switchDirection={select(
				'switchDirection',
				['all', 'medium', 'large'],
				undefined
			)}
			rowReverse={select(
				'rowReverse',
				[true, false, 'all', 'medium', 'large'],
				undefined
			)}
			columnReverse={select(
				'columnReverse',
				[true, false, 'all', 'medium', 'large'],
				undefined
			)}
			justifyItems={select('justifyItems', ['left', 'center', 'right'], undefined)}
			isLoading={boolean('isLoading', true)}
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
			className={text('className', '')}
			align={select('align', ['top', 'bottom', 'center'], undefined)}
			justify={select(
				'justify',
				['center', 'spaceAround', 'spaceBetween', 'flexEnd', 'flexStart'],
				undefined
			)}
			wrap={boolean('wrap', false)}
			noGutters={boolean('noGutters', false)}
			direction={select('direction', ['row', 'column'], 'row')}
			switchDirection={select(
				'switchDirection',
				['all', 'medium', 'large'],
				undefined
			)}
			rowReverse={select(
				'rowReverse',
				[true, false, 'all', 'medium', 'large'],
				undefined
			)}
			columnReverse={select(
				'columnReverse',
				[true, false, 'all', 'medium', 'large'],
				undefined
			)}
			justifyItems={select('justifyItems', ['left', 'center', 'right'], undefined)}
			isLoading={boolean('isLoading', true)}
			loadingProps={object('loadingProps', {
				color: 'red',
				scrimColor: 'rgba(250, 250, 255, 0.8)',
				size: '64px',
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
