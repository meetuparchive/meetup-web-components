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

export const TestIconSprite = (props) => (
	<div class='display--none'>
		<svg xmlns='http://www.w3.org/2000/svg'>
			<symbol viewBox='0 0 24 24' id='icon-heart-outline'>
			<title>heart-outline</title>
			<g id='heart-outline-_x32_4px'>
				<path d='M17,2c-1.916,0-3.8,0.973-5,2.42C10.8,2.973,8.916,2,7,2C3.625,2,1,4.451,1,8c0,4.676,2.1,6.617,7.912,12.084l1.475,1.432	C10.735,21.845,11.45,22,11.892,22c0.44,0,1.134-0.158,1.48-0.484l1.613-1.451C20.781,14.602,23,12.67,23,8C23,4.291,20.375,2,17,2	z M12.472,17.645L12,18.129l-0.471-0.484C6.5,12.807,5,11.615,5,9c0-2,1-3,2.5-3s2.3,0.678,2.771,1.322	c0.34,0.466,1.025,0.969,1.729,0.969c0.706,0,1.257-0.323,1.729-0.969C14.2,6.678,15,6,16.5,6S19,7,19,9	C19,11.801,17.343,12.967,12.472,17.645z'/>
			</g>
			<g id='heart-outline-_x32_4px-grid' display='none'>
				<path display='inline' fill='none' stroke='#FF33FF' stroke-width='0.075' stroke-miterlimit='10' d='M22,12	c0,5.522-4.473,10-10,10S2,17.522,2,12S6.473,2,12,2S22,6.478,22,12z'/>
				<circle display='inline' fill='none' stroke='#FF33FF' stroke-width='0.075' stroke-miterlimit='10' cx='12' cy='12' r='5'/>
				<line display='inline' fill='none' stroke='#FF33FF' stroke-miterlimit='10' x1='4.562' y1='22.75' x2='4.562' y2='22.75'/>
				<line display='inline' fill='none' stroke='#FF33FF' stroke-width='0.075' stroke-miterlimit='10' x1='24' y1='24' x2='0' y2='0'/>
				<line display='inline' fill='none' stroke='#FF33FF' stroke-width='0.075' stroke-miterlimit='10' x1='0' y1='24' x2='24' y2='0'/>
			</g>
			</symbol>
		</svg>
	</div>
);

