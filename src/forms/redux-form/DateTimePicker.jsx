import { mapProps } from 'recompose';
import DateTimePicker from '../DateTimePicker';

export const propMapper = ({ input, meta, ...other }) => ({
	error: meta.error,
	...input,
	...other,
});

export default mapProps(propMapper)(DateTimePicker);

