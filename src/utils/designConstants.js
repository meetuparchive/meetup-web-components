export const BREAKPOINTS = {
	s: '440px',
	m: '640px',
	l: '840px',
	xl: '1024px'
};

export const MEDIA_QUERIES = {
	small: `screen and (min-width: ${BREAKPOINTS['s']})`,
	medium: `screen and (min-width: ${BREAKPOINTS['m']})`,
	large: `screen and (min-width: ${BREAKPOINTS['l']})`,
	huge: `screen and (min-width: ${BREAKPOINTS['xl']})`
};

export const MEDIA_SIZES = {
	xs: 16,
	s: 24,
	m: 36,
	l: 48,
	xl: 72,
	xxl: 120
};
