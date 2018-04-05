import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import loaderSprite from '../../assets/svg/loaderSprite.svg';

const SwarmLoader = () => (
	<svg class="swarm-loader" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">
		<circle id="circle1" cx="90.5" cy="90.5" r="6.5"/>
		<circle id="circle2" cx="90.5" cy="90.5" r="6.5"/>
		<circle id="circle3" cx="90.5" cy="90.5" r="6.5"/>
		<circle id="circle4" cx="90.5" cy="90.5" r="6.5"/>
		<circle id="circle5" cx="90.5" cy="90.5" r="6.5"/>
		<circle id="circle6" cx="90.5" cy="90.5" r="6.5"/>
		<circle id="circle7" cx="90.5" cy="90.5" r="6.5"/>
		<circle id="circle8" cx="90.5" cy="90.5" r="6.5"/>

		<defs>
			<filter id="goo">
				<feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
				<feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 50 -12" result="goo" />
				<feBlend in="SourceGraphic" in2="goo" />
			</filter>
		</defs>
	</svg>
);

const MaterialLoader = () => (
	<svg class="circular" viewBox="0 0 50 50">
		<circle class="circular-path" cx="25" cy="25" r="20" fill="none" stroke-width="3" stroke-miterlimit="10" />
	</svg>
);

const Loading = ({
	className,
	color,
	size,
	fullCover, // position: fixed // eslint-disable-line no-unused-vars
	partialCover, // position: absolute // eslint-disable-line no-unused-vars
	scrimColor,
	option, // temporary prop
	...other
}) => {
	const classNames = cx(
		'loading',
		{
			'loading--cover': fullCover || partialCover,
			'loading--fullCover': fullCover,
			'loading--partialCover': partialCover
		},
		className
	);
	const renderLoader = (loaderOption) => {
			switch (loaderOption) {
				case 'swarm':
					return (
						[
							<SwarmLoader />
						]
					);
				case 'busySwarm':
					return (
						<div
							className="busySwarm"
							style={{
								mask: `url(${loaderSprite}) no-repeat 0 0`,
								WebkitMask: `url(${loaderSprite}) no-repeat 0 0`,
							}}
						/>
					);
				case 'circular':
					return (
						<MaterialLoader />
					);
				default:
					return (
						<MaterialLoader />
					);

			}
	};

	return(
		<div
			className={classNames}
			style={{
				'--ldr_size': size,
				'--ldr_scrimColor': scrimColor,
				'--ldr_color': color
			}}
		>
			{renderLoader(option)}
		</div>
	);
};

Loading.defaultProps = {
	option: 'swarm',
};

Loading.propTypes = {
	option: PropTypes.string.isRequired,
};

export default Loading;
