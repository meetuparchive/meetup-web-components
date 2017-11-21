import React from 'react';

export const InfoWrapper = (props) => {
	const {
		children,
		style={},
		...other
	} = props;
	const styles = {
		display:'flex',
		alignItems: 'center',
		justifyContent: 'center',
		...style,
	};
	return (
		<div>
			<div style={styles} {...other}>
				{children}
			</div>
			<p style={{position:'fixed', bottom:0, left:0}} className='padding--top text--secondary text--small'>Click the "?" mark at top-right to view the info.</p>
		</div>
	);
};

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

/**
 * `Link` component for use in stories
 * where a router context is not necessary
 *
 * Also disables link from being followed on click
 */
export const StoryLink = (props) => (
	<a
		href="#"
		style={props.onClick ? null : {pointerEvents: "none"}}
		onClick={props.onClick}
	>
		{props.children}
	</a>
);
