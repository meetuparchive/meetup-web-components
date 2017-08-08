import { mapProps } from 'recompose';

import RadioButtonGroup from '../forms/RadioButtonGroup';

export const propMapper = ({ input, meta, ...other }) => ({
	selectedValue: input.value,
	...input,
	...other,
});

export default mapProps(propMapper)(RadioButtonGroup);
