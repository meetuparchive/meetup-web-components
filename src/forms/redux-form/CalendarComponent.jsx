// @flow
import React from 'react';
import { convert, LocalDate, nativeJs } from '@js-joda/core';
import CalendarComponent from '../CalendarComponent';

type FieldProps = {
	input: {
		value?: Date,
		onChange?: (Date, ?string, ?FlatpickrInstance) => void,
	},
	meta: {
		touched?: boolean,
		submitFailed?: boolean,
		error?: string,
	},
};

/*
 * wraps standard TextInput web component for use with redux-form
 * deconstructs props that redux-forms sets and sets them on TextInput
 */
const ReduxFormCalendarComponent = (props: FieldProps): React$Element<*> => {
	const { meta, input, ...other } = props;
	const error = meta.touched || meta.submitFailed ? meta.error : null;

	const jodaVal = input.value && LocalDate.from(nativeJs(input.value));
	const jodaOnChange = (localDate: LocalDate, dateString, flatpickr) => {
		const date: Date = convert(localDate).toDate();
		if (input.onChange) {
			input.onChange(date, dateString, flatpickr);
		}
	};
	return (
		<CalendarComponent
			error={error}
			{...input}
			value={jodaVal}
			onChange={jodaOnChange}
			{...other}
		/>
	);
};

ReduxFormCalendarComponent.displayName = 'ReduxFormCalendarComponent';

export default ReduxFormCalendarComponent;
