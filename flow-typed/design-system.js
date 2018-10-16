// a list of all constants related to design systems

declare type MediaSizes = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

declare type MediaSizeMap = {|
	xxs: '12',
	xs: '16',
	s: '24',
	m: '36',
	l: '48',
	xl: '72',
	xxl: '120',
|};

declare type MediaQuerySize = 'small' | 'medium' | 'large' | 'huge';

declare type MediaQueryMap = {|
	small: 'screen and (min-width: 440px)',
	medium: 'screen and (min-width: 640px)',
	large: 'screen and (min-width: 840px)',
	huge: 'screen and (min-width: 1024px)',
|}