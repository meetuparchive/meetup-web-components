import React from 'react';
import { withKnobs, boolean, object, text, number } from '@storybook/addon-knobs';

import { withInfo } from '@storybook/addon-info';
import { storiesOf } from '@storybook/react';
import { MOCK_MEMBER } from 'meetup-web-mocks/lib/api';
import GridList, { GridListComponent } from './GridList';
import { C_COOLGRAYMEDIUM } from 'swarm-constants/dist/js/constants';
import { MEDIA_SIZES } from '../utils/designConstants';

const boxStyles = {
	alignItems: 'center',
	boxSizing: 'border-box',
	display: 'flex',
	fontSize: '28px',
	fontWeight: '700',
	height: '100%',
	justifyContent: 'center',
	outline: '1px dotted red',
	padding: '20px',
};

const TestMember = props => {
	return (
		<div className="flex flex--column flex--center align--center card display--flex">
			<div className="flex-item flex-item--shrink">
				<div className="chunk">
					<span
						className="avatar avatar--person"
						role="img"
						style={{ backgroundImage: props.member.photo.photo_link }}
					>
						{props.member.name}
					</span>
				</div>
			</div>

			<div className="flex-item flex-item--shrink">
				<div className="chunk">
					<p>{props.member.name}</p>
					<p className="text--small text--secondary">
						You're both members of FAFF
					</p>
					{props.secondLine && (
						<p className="text--small text--secondary">{props.secondLine}</p>
					)}
				</div>
			</div>
		</div>
	);
};

storiesOf('Layout/GridList', module)
	.addDecorator(withInfo)
	.addDecorator(withKnobs)
	.addParameters({ info: { propTables: [GridListComponent] } })
	.add(
		'Static grid',
		() => (
			<GridListComponent
				autoHeight={boolean('autoHeight', undefined)}
				autoHeightWithWrap={boolean('autoHeightWithWrap', undefined)}
				columns={{
					default: number('columns (default size)', 3),
					medium: number('columns (medium size)', undefined),
					large: number('columns (large size)', undefined),
				}}
				itemClassNames={text('itemClassNames', undefined)}
				className={text('className', undefined)}
				style={{ padding: '20px' }}
				items={[
					<div style={boxStyles}>GridItem</div>,
					<div style={boxStyles}>GridItem</div>,
					<div style={boxStyles}>GridItem</div>,
					<div style={boxStyles}>GridItem</div>,
					<div style={boxStyles}>GridItem</div>,
					<div style={boxStyles}>GridItem</div>,
					<div style={boxStyles}>GridItem</div>,
					<div style={boxStyles}>GridItem</div>,
					<div style={boxStyles}>GridItem</div>,
				]}
			/>
		),
		{
			info: {
				text:
					'Basic usage of GridList with columns fixed at 3 for all breakpoints',
			},
		}
	)
	.add(
		'GridList items with custom class names',
		() => (
			<GridListComponent
				autoHeight={boolean('autoHeight', undefined)}
				autoHeightWithWrap={boolean('autoHeightWithWrap', undefined)}
				columns={{
					default: number('columns (default size)', 3),
					medium: number('columns (medium size)', undefined),
					large: number('columns (large size)', undefined),
				}}
				itemClassNames={text('itemClassNames', 'flush--all')}
				className={text('className', undefined)}
				style={{ padding: '20px' }}
				items={[
					<div style={boxStyles}>GridItem</div>,
					<div style={boxStyles}>GridItem</div>,
					<div style={boxStyles}>GridItem</div>,
					<div style={boxStyles}>GridItem</div>,
					<div style={boxStyles}>GridItem</div>,
					<div style={boxStyles}>GridItem</div>,
					<div style={boxStyles}>GridItem</div>,
					<div style={boxStyles}>GridItem</div>,
					<div style={boxStyles}>GridItem</div>,
				]}
			/>
		),
		{
			info: {
				text:
					'GridList where items require a custom class for more flexible styling',
			},
		}
	)
	.add(
		'Static autoHeight grid',
		() => (
			<GridListComponent
				autoHeight={boolean('autoHeight', true)}
				autoHeightWithWrap={boolean('autoHeightWithWrap', undefined)}
				columns={{
					default: number('columns (default size)', 3),
					medium: number('columns (medium size)', undefined),
					large: number('columns (large size)', undefined),
				}}
				itemClassNames={text('itemClassNames', undefined)}
				className={text('className', undefined)}
				style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}
				items={[
					<TestMember member={MOCK_MEMBER} />,
					<TestMember
						member={MOCK_MEMBER}
						secondLine="This is a second line"
					/>,
					<TestMember member={MOCK_MEMBER} />,
					<TestMember
						member={MOCK_MEMBER}
						secondLine="This is a second line"
					/>,
					<TestMember member={MOCK_MEMBER} />,
					<TestMember member={MOCK_MEMBER} />,
				]}
			/>
		),
		{
			info: {
				text:
					'GridList where items are the same height with columns fixed at 3 for all breakpoints',
			},
		}
	)
	.add(
		'Static wrapping autoHeight grid',
		() => (
			<GridListComponent
				autoHeight={boolean('autoHeight', undefined)}
				autoHeightWithWrap={boolean('autoHeightWithWrap', true)}
				columns={{
					default: number('columns (default size)', 3),
					medium: number('columns (medium size)', undefined),
					large: number('columns (large size)', undefined),
				}}
				itemClassNames={text('itemClassNames', undefined)}
				className={text('className', undefined)}
				style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}
				items={[
					<TestMember member={MOCK_MEMBER} />,
					<TestMember
						member={MOCK_MEMBER}
						secondLine="This is a second line"
					/>,
					<TestMember member={MOCK_MEMBER} />,
					<TestMember
						member={MOCK_MEMBER}
						secondLine="This is a second line"
					/>,
					<TestMember member={MOCK_MEMBER} />,
					<TestMember member={MOCK_MEMBER} />,
				]}
			/>
		),
		{
			info: {
				text:
					'GridList where items are the same height with columns fixed at 3 for all breakpoints',
			},
		}
	)
	.add(
		'Responsive grid',
		() => (
			<GridListComponent
				autoHeight={boolean('autoHeight', undefined)}
				autoHeightWithWrap={boolean('autoHeightWithWrap', undefined)}
				columns={{
					default: number('columns (default size)', 2),
					medium: number('columns (medium size)', 4),
					large: number('columns (large size)', 6),
				}}
				itemClassNames={text('itemClassNames', undefined)}
				className={text('className', undefined)}
				style={{ padding: '20px' }}
				items={[
					<div style={boxStyles}>GridItem</div>,
					<div style={boxStyles}>GridItem</div>,
					<div style={boxStyles}>GridItem</div>,
					<div style={boxStyles}>GridItem</div>,
					<div style={boxStyles}>GridItem</div>,
					<div style={boxStyles}>GridItem</div>,
					<div style={boxStyles}>GridItem</div>,
					<div style={boxStyles}>GridItem</div>,
					<div style={boxStyles}>GridItem</div>,
				]}
			/>
		),
		{
			info: {
				text:
					'Responsive GridList that increases number of columns for larger breakpoints',
			},
		}
	)
	.add(
		'Responsive autoHeight grid',
		() => (
			<GridListComponent
				autoHeight={boolean('autoHeight', true)}
				autoHeightWithWrap={boolean('autoHeightWithWrap', undefined)}
				columns={{
					default: number('columns (default size)', 2),
					medium: number('columns (medium size)', 4),
					large: number('columns (large size)', 6),
				}}
				itemClassNames={text('itemClassNames', undefined)}
				className={text('className', undefined)}
				style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}
				items={[
					<TestMember member={MOCK_MEMBER} />,
					<TestMember
						member={MOCK_MEMBER}
						secondLine="This is a second line"
					/>,
					<TestMember member={MOCK_MEMBER} />,
					<TestMember
						member={MOCK_MEMBER}
						secondLine="This is a second line"
					/>,
					<TestMember member={MOCK_MEMBER} />,
					<TestMember
						member={MOCK_MEMBER}
						secondLine="This is a second line"
					/>,
				]}
			/>
		),
		{
			info: {
				text:
					'Responsive GridList where items are the same height, and that increases number of columns for larger breakpoints',
			},
		}
	)
	.add(
		'Responsive wrapping autoHeight grid',
		() => (
			<GridListComponent
				autoHeight={boolean('autoHeight', undefined)}
				autoHeightWithWrap={boolean('autoHeightWithWrap', true)}
				columns={{
					default: number('columns (default size)', 2),
					medium: number('columns (medium size)', 4),
					large: number('columns (large size)', 6),
				}}
				itemClassNames={text('itemClassNames', undefined)}
				className={text('className', undefined)}
				style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}
				items={[
					<TestMember member={MOCK_MEMBER} />,
					<TestMember
						member={{
							...MOCK_MEMBER,
							name: 'mockymcmockersonnnn',
						}}
						secondLine="This is a second line"
					/>,
					<TestMember member={MOCK_MEMBER} />,
					<TestMember
						member={MOCK_MEMBER}
						secondLine="This is a second line"
					/>,
					<TestMember
						member={{
							...MOCK_MEMBER,
							name: 'mockymcmockersonnnn',
						}}
					/>,
					<TestMember member={MOCK_MEMBER} />,
				]}
			/>
		),
		{
			info: {
				text:
					'GridList where items are the same height and increases number of columns for larger breakpoints',
			},
		}
	)
	.add('isLoading', () => (
		<GridList
			autoHeight={boolean('autoHeight', undefined)}
			autoHeightWithWrap={boolean('autoHeightWithWrap', undefined)}
			columns={{
				default: number('columns (default size)', 3),
				medium: number('columns (medium size)', undefined),
				large: number('columns (large size)', undefined),
			}}
			itemClassNames={text('itemClassNames', undefined)}
			className={text('className', undefined)}
			isLoading={boolean('isLoading', true)}
			loadingProps={object('loadingProps', {
				color: C_COOLGRAYMEDIUM,
				size: `${MEDIA_SIZES.l}px`,
			})}
			style={{ padding: '20px' }}
			items={[
				<div style={boxStyles}>GridItem</div>,
				<div style={boxStyles}>GridItem</div>,
				<div style={boxStyles}>GridItem</div>,
				<div style={boxStyles}>GridItem</div>,
				<div style={boxStyles}>GridItem</div>,
				<div style={boxStyles}>GridItem</div>,
				<div style={boxStyles}>GridItem</div>,
				<div style={boxStyles}>GridItem</div>,
				<div style={boxStyles}>GridItem</div>,
			]}
		/>
	))
	.add('isLoading with loadingProps', () => (
		<GridList
			autoHeight={boolean('autoHeight', undefined)}
			autoHeightWithWrap={boolean('autoHeightWithWrap', undefined)}
			columns={{
				default: number('columns (default size)', 3),
				medium: number('columns (medium size)', undefined),
				large: number('columns (large size)', undefined),
			}}
			itemClassNames={text('itemClassNames', undefined)}
			className={text('className', undefined)}
			isLoading={boolean('isLoading', true)}
			loadingProps={object('loadingProps', {
				color: 'red',
				scrimColor: 'rgba(250, 250, 255, 0.8)',
				size: '96px',
			})}
			style={{ padding: '20px' }}
			items={[
				<div style={boxStyles}>GridItem</div>,
				<div style={boxStyles}>GridItem</div>,
				<div style={boxStyles}>GridItem</div>,
				<div style={boxStyles}>GridItem</div>,
				<div style={boxStyles}>GridItem</div>,
				<div style={boxStyles}>GridItem</div>,
				<div style={boxStyles}>GridItem</div>,
				<div style={boxStyles}>GridItem</div>,
				<div style={boxStyles}>GridItem</div>,
			]}
		/>
	));
