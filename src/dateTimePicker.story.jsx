import React from 'react';
import DateTimePicker from './DateTimePicker';
import { storiesOf } from '@kadira/storybook';
import { InfoWrapper } from './utils/storyComponents';

storiesOf('DateTimePicker', module)
	.addWithInfo(
		'default',
		'renders date and time inputs, using datetime-local where supported. Use `forceFlatpickr` option to not use datetime-local if supported',
		() => (
			<InfoWrapper>
				<div className='span--50'>
					<DateTimePicker
						name='event_time'
						label='Start at'
						date={Date.now()}
						forceFlatpickr
						datepickerOptions={{ allowInput: true }}
					/>
				</div>
			</InfoWrapper>
		)
	)
	.add('required', () => {
		return (<div className='span--50'>
			<DateTimePicker
				name='event_time'
				label='Start at'
				date={Date.now()}
				required
				forceFlatpickr
			/>
		</div>);
	})
	.add('sets a valid date range', () => {
		const opts = {
			allowInput: true,
			minDate: '2018-01-01',
			maxDate: '2018-02-01'
		};

		return (<div className='span--50'>
			<DateTimePicker
				name='event_time'
				label='Start date between Jan Feb 2018'
				forceFlatpickr
				datepickerOptions={opts}
			/>
		</div>);
	})
	.add('sets a default date and time', () => {
		const opts = {
				allowInput: true,
				minDate: Date.now()
			},
			date = { date: '3000-01-01' };

		return (<div className='span--50'>
			<DateTimePicker
				name='event_time'
				label='In the year 3000'
				value={date}
				datepickerOptions={opts}
				forceFlatpickr
			/>
		</div>);
	})
	.add('uses datetime-local if supported', () => {
		const opts = {
				allowInput: true,
				minDate: Date.now()
			},
			date = { date: '2017-02-18' };

		return (<div className='span--50'>
			<DateTimePicker
				name='event_time'
				label='Start at'
				value={date}
				datepickerOptions={opts}
			/>
		</div>);
	})
	.add('datetime-local with min and max', () => {
		const opts = {
				allowInput: true,
				minDate: Date.now(),
				maxDate: '2017-02-01'
			},
			date = { date: '2017-02-18' };

		return (<div className='span--50'>
			<DateTimePicker
				name='event_time'
				label='Start at'
				value={date}
				datepickerOptions={opts}
			/>
		</div>);
	});
