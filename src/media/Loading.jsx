import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { C_COOLGRAYMEDIUM } from 'swarm-constants/dist/js/colorConstants';

// TODO: replace MEDIA_SIZES with size values
// from `swarm-constants` when available in JS
import { MEDIA_SIZES } from '../utils/designConstants';

export const LOADING_CLASS = 'loading';
export const LOADING_SHAPE_CLASS = 'loadingShape';
export const LOADING_SHAPE_PATH_CLASS = `${LOADING_SHAPE_CLASS}-path`;

const Loading = ({
	className,
	color,
	scrimColor,
	size,
	fullCover,
	partialCover,
	...other
}) => {
	const isCover = fullCover || partialCover;
	const classNames = cx(
		LOADING_CLASS,
		{
			[`${LOADING_CLASS}--cover`]: isCover,
			[`${LOADING_CLASS}--fullCover`]: fullCover,
			[`${LOADING_CLASS}--partialCover`]: partialCover
		},
		className
	);

	return(
		<div
			className={classNames}
			style={
				isCover && {
					backgroundColor: scrimColor,
				}
			}
		>
			<svg
				aria-labelledby="title"
				role="progressbar"
				className={LOADING_SHAPE_CLASS}
				viewBox="0 0 50 50"
				style={{width: size}}
			>
				<title
					id="title"
					className="visibility--a11yHide"
				>
					Loading
				</title>
				<circle
					className={LOADING_SHAPE_PATH_CLASS}
					cx="25"
					cy="25"
					r="20"
					fill="none"
					stroke={color}
					strokeWidth="3"
					strokeMiterlimit="10"
				/>
			</svg>
		</div>
	);
};

Loading.defaultProps = {
	color: C_COOLGRAYMEDIUM,
	scrimColor: 'rgba(255,255,255, .87)',
	size: `${MEDIA_SIZES.l}px`
};

Loading.propTypes = {
	color: PropTypes.string,
	fullCover: PropTypes.bool,
	partialCover: PropTypes.bool,
	scrimColor: PropTypes.string,
	size: PropTypes.string
};

export default Loading;
