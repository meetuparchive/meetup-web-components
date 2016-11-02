import React from 'react';

export const Annotate = (props) => (
	<div style={props.style}>
		{props.children}
		<p style={{
			padding: '0.6em 1em',
			backgroundColor: 'rgba(0, 100, 255, 0.05)',
			color: 'gray',
			borderTop: '1px solid #ececec',
			fontSize: '0.8em',
			position: 'absolute',
			bottom: 0,
			left: 0,
			right: 0
		}}>
			{props.notes}
		</p>
	</div>
);

export const Inverted = (props) => (
	<div
		className='stripe stripe--inverted inverted'
		style={{
			height: '100%',
			width: '100%',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		}}>
		{props.children}
	</div>
);


