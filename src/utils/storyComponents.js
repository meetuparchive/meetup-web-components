import React from 'react';
import { WithNotes } from '@kadira/storybook-addon-notes';

export const Annotate = (props) => (
	<WithNotes notes={props.notes}>
		{props.children}
	</WithNotes>
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
