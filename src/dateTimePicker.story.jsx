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
						label='Start at'
						value={Date.now()}
						forceFlatpickr
						datepickerOptions={{ allowInput: true }}
					/>
				</div>
			</InfoWrapper>
		)
	)
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
