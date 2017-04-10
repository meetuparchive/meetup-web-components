import React from 'react';
import { InfoWrapper } from '../utils/storyComponents';
import { storiesOf } from '@kadira/storybook';
import GridList from './GridList';

const boxStyles = {
	alignItems: 'center',
	boxSizing: 'border-box',
	display: 'flex',
	fontSize: '28px',
	fontWeight: '700',
	height: '100%',
	justifyContent : 'center',
	outline: '1px dotted red',
	padding: '20px',
};

storiesOf('GridList', module)
	.addWithInfo(
		'Static grid',
		'Basic usage of GridList with columns fixed at 3 for all breakpoints',
		() => (
		<InfoWrapper>
			<GridList
				columns={{
					default: 3
				}}
				style={{padding: '20px'}}
				items={[
					<div style={boxStyles}>GridItem</div>,
					<div style={boxStyles}>GridItem</div>,
					<div style={boxStyles}>GridItem</div>,
					<div style={boxStyles}>GridItem</div>,
					<div style={boxStyles}>GridItem</div>,
					<div style={boxStyles}>GridItem</div>,
					<div style={boxStyles}>GridItem</div>,
					<div style={boxStyles}>GridItem</div>,
					<div style={boxStyles}>GridItem</div>
				]}
			/>
		</InfoWrapper>
	))
	.addWithInfo(
		'Responsive grid',
		'Responsive GridList that increases number of columns for larger breakpoints',
		() => (
		<InfoWrapper>
			<GridList
				columns={{
					default: 2,
					medium: 4,
					large: 6
				}}
				style={{padding: '20px'}}
				items={[
					<div style={boxStyles}>GridItem</div>,
					<div style={boxStyles}>GridItem</div>,
					<div style={boxStyles}>GridItem</div>,
					<div style={boxStyles}>GridItem</div>,
					<div style={boxStyles}>GridItem</div>,
					<div style={boxStyles}>GridItem</div>,
					<div style={boxStyles}>GridItem</div>,
					<div style={boxStyles}>GridItem</div>,
					<div style={boxStyles}>GridItem</div>
				]}
			/>
		</InfoWrapper>
	));
