export const SIZE_SCALE_RATIO = 1.125;

export const BREAKPOINTS = {
	s: '440px',
	m: '640px',
	l: '840px',
	xl: '1024px'
};

export const MEDIA_SIZES = {
	xs: 16,
	s: 24,
	m: 36,
	l: 48,
	xl: 72,
	xxl: 120
};

export function changeSizeWithViewport(size, breakpoint) {
	const breakpointSizes = {
		s: MEDIA_SIZES[size],
		m: Math.floor(MEDIA_SIZES[size] * SIZE_SCALE_RATIO),
		l: Math.floor(MEDIA_SIZES[size] * Math.pow(SIZE_SCALE_RATIO, 2)),
		xl: Math.floor(MEDIA_SIZES[size] * Math.pow(SIZE_SCALE_RATIO, 2))
	};
	return breakpointSizes[breakpoint];
}

