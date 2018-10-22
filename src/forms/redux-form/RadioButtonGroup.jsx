import { mapProps } from 'recompose';

import RadioButtonGroup from '../RadioButtonGroup';

export const propMapper = ({ input, meta, isActive, ...other }) => ({
	selectedValue: input.value,
	isActive,
	...input,
	...other,
});

export default mapProps(propMapper)(RadioButtonGroup);
