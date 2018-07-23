import {
	BREAKPOINT_S,
	BREAKPOINT_M,
	BREAKPOINT_L,
	BREAKPOINT_XL
} from 'swarm-constants/dist/js/constants.js';

export const MEDIA_QUERIES = {
	small: `screen and (min-width: ${BREAKPOINT_S})`,
	medium: `screen and (min-width: ${BREAKPOINT_M})`,
	large: `screen and (min-width: ${BREAKPOINT_L})`,
	huge: `screen and (min-width: ${BREAKPOINT_XL})`,
};

//
// TODO: we should import these from swarm-constants,
// but since these are responsive values, we don't
// export them to the JS dist in swarm-constants.
//
// A fine solution would be to export the default
// sizes (which are currently the same as below)
// to JS and not worry about the sizes for viewports
// larger than mobile.
//
export const MEDIA_SIZES = {
	xxs: '12',
	xs: '16',
	s: '24',
	m: '36',
	l: '48',
	xl: '72',
	xxl: '120',
};
