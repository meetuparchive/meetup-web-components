import React from 'react';
import DateTimePicker from './DateTimePicker';
import { storiesOf } from '@kadira/storybook';

storiesOf('DateTimePicker', module)
	.add('default', () => {

		const opts = {
			allowInput: true,
			minDate: Date.now()
		};

		const date = { date: Date.now() };
		return (<div className='span--50'>
			<DateTimePicker
				label='Start at'
				value={date}
				// value='2017-02-18T14:30'
				forceFlatpickr
				datepickerOptions={opts}
			/>
		</div>);
	})
	.add('sets a valid date range', () => {})
	.add('sets a default date and time', () => {})
	.add('uses datetime-local if supported', () => {
		const opts = {
				allowInput: true,
				minDate: Date.now()
			},
			date = { date: '2017-02-18' };

		return (<div className='span--50'>
			<DateTimePicker
				label='Start at'
				value={date}
				datepickerOptions={opts}
			/>
		</div>);
	})
	.add('datetime-local with min and max', () => {
		const opts = {
				allowInput: true,
				minDate: Date.now()
			},
			date = { date: '2017-02-18' };

		return (<div className='span--50'>
			<DateTimePicker
				label='Start at'
				value={date}
				datepickerOptions={opts}
			/>
		</div>);
	});
