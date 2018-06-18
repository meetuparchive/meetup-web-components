import React from 'react';
import { storiesOf } from '@storybook/react';
import { MOCK_MEMBER } from 'meetup-web-mocks/lib/api';
import GridList from './GridList';

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

storiesOf('GridList', module)
	.addWithInfo(
		'Static grid',
		'Basic usage of GridList with columns fixed at 3 for all breakpoints',
		() => (
			<GridList
				columns={{
					default: 3,
				}}
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
		)
	)
	.addWithInfo(
		'GridList items with custom class names',
		'GridList where items require a custom class for more flexible styling',
		() => (
			<GridList
				columns={{
					default: 3,
				}}
				style={{ padding: '20px' }}
				itemClassNames="flush--all"
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
		)
	)
	.addWithInfo(
		'Static autoHeight grid',
		'GridList where items are the same height with columns fixed at 3 for all breakpoints',
		() => (
			<GridList
				autoHeight
				columns={{
					default: 3,
				}}
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
		)
	)
	.addWithInfo(
		'Static wrapping autoHeight grid',
		'GridList where items are the same height with columns fixed at 3 for all breakpoints',
		() => (
			<GridList
				autoHeightWithWrap
				columns={{
					default: 3,
				}}
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
		)
	)
	.addWithInfo(
		'Responsive grid',
		'Responsive GridList that increases number of columns for larger breakpoints',
		() => (
			<GridList
				columns={{
					default: 2,
					medium: 4,
					large: 6,
				}}
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
		)
	)
	.addWithInfo(
		'Responsive autoHeight grid',
		'Responsive GridList where items are the same height, and that increases number of columns for larger breakpoints',
		() => (
			<GridList
				autoHeight
				columns={{
					default: 2,
					medium: 4,
					large: 6,
				}}
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
		)
	)
	.addWithInfo(
		'Responsive wrapping autoHeight grid',
		'GridList where items are the same height and increases number of columns for larger breakpoints',
		() => (
			<GridList
				autoHeightWithWrap
				columns={{
					default: 2,
					medium: 4,
					large: 6,
				}}
				style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}
				items={[
					<TestMember member={MOCK_MEMBER} />,
					<TestMember
						member={{
							...MOCK_MEMBER,
							name: "mockymcmockersonnnn"
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
							name: "mockymcmockersonnnn"
						}}
					/>,
					<TestMember member={MOCK_MEMBER} />,
				]}
			/>
		)
	)
	.addWithInfo('isLoading', () => (
		<GridList
			isLoading
			columns={{
				default: 3,
			}}
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
	.addWithInfo('isLoading with loadingProps', () => (
		<GridList
			isLoading
			loadingProps={{
				color: 'red',
				scrimColor: 'rgba(250, 250, 255, 0.8)',
				size: '96px',
			}}
			columns={{
				default: 3,
			}}
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
