import { mapProps } from 'recompose';
import DateTimePicker from '../DateTimePicker';

export const propMapper = ({ input, meta, ...other }) => ({
	error: meta.error,
	reduxInputValue: input.value,
	...input,
	...other,
});

export default mapProps(propMapper)(DateTimePicker);

