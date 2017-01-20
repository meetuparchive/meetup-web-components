
import React from 'react';
import GridList from './GridList';
import GridListItem from './GridListItem';
import { storiesOf } from '@kadira/storybook';

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
	.add('Static grid', () => (
		<GridList
			columns={{
				default: 3
			}}
			style={{padding: '20px'}}
			>
			<GridListItem>
				<div style={boxStyles}>GridItem</div>
			</GridListItem>
			<GridListItem>
				<div style={boxStyles}>GridItem</div>
			</GridListItem>
			<GridListItem>
				<div style={boxStyles}>GridItem</div>
			</GridListItem>
			<GridListItem>
				<div style={boxStyles}>GridItem</div>
			</GridListItem>
			<GridListItem>
				<div style={boxStyles}>GridItem</div>
			</GridListItem>
			<GridListItem>
				<div style={boxStyles}>GridItem</div>
			</GridListItem>
			<GridListItem>
				<div style={boxStyles}>GridItem</div>
			</GridListItem>
			<GridListItem>
				<div style={boxStyles}>GridItem</div>
			</GridListItem>
			<GridListItem>
				<div style={boxStyles}>GridItem</div>
			</GridListItem>
			<GridListItem>
				<div style={boxStyles}>GridItem</div>
			</GridListItem>
			<GridListItem>
				<div style={boxStyles}>GridItem</div>
			</GridListItem>
			<GridListItem>
				<div style={boxStyles}>GridItem</div>
			</GridListItem>
		</GridList>
	))
	.add('Responsive grid', () => (
		<GridList
			columns={{
				default: 2,
				medium: 4,
				large: 6
			}}
			style={{padding: '20px'}}
			>
			<GridListItem>
				<div style={boxStyles}>GridItem</div>
			</GridListItem>
			<GridListItem>
				<div style={boxStyles}>GridItem</div>
			</GridListItem>
			<GridListItem>
				<div style={boxStyles}>GridItem</div>
			</GridListItem>
			<GridListItem>
				<div style={boxStyles}>GridItem</div>
			</GridListItem>
			<GridListItem>
				<div style={boxStyles}>GridItem</div>
			</GridListItem>
			<GridListItem>
				<div style={boxStyles}>GridItem</div>
			</GridListItem>
			<GridListItem>
				<div style={boxStyles}>GridItem</div>
			</GridListItem>
			<GridListItem>
				<div style={boxStyles}>GridItem</div>
			</GridListItem>
			<GridListItem>
				<div style={boxStyles}>GridItem</div>
			</GridListItem>
			<GridListItem>
				<div style={boxStyles}>GridItem</div>
			</GridListItem>
			<GridListItem>
				<div style={boxStyles}>GridItem</div>
			</GridListItem>
			<GridListItem>
				<div style={boxStyles}>GridItem</div>
			</GridListItem>
		</GridList>
	))
	;
