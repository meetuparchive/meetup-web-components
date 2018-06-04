import React from 'react';

/**
 * Inverted
 *
 * Creates an inverted stripe for use in a story
 */
export const Inverted = props => (
	<div
		className="stripe stripe--inverted inverted"
		style={{
			height: '100%',
			width: '100%',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		}}
	>
		{props.children}
	</div>
);

/**
 * StoryLink
 *
 * `Link` component for use in stories
 * where a router context is not necessary
 *
 * Also disables link from being followed on click
 */
export const StoryLink = props => (
	<a
		href="#"
		style={props.onClick ? null : { pointerEvents: 'none' }}
		onClick={props.onClick}
	>
		{props.children}
	</a>
);
