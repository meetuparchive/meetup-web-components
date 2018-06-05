import { bool, shape } from 'prop-types';

export const Media = shape({
	isAtSmallUp: bool,
	isAtMediumUp: bool,
	isAtLargeUp: bool,
	isAtHugeUp: bool,
});
