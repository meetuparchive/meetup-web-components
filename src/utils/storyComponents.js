import React from 'react';

export const InfoWrapper = (props) => (
	<div>
		{props.children}
		<br />
		<p className='padding--top text--secondary text--small'>Click the "?" mark at top-right to view the info.</p>
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
