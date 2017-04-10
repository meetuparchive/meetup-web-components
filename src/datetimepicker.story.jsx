import React from 'react';
import DateTimePicker from './DateTimePicker';
import { storiesOf } from '@kadira/storybook';
import { InfoWrapper } from './utils/storyComponents';

storiesOf('DateTimePicker', module)
	.addWithInfo(
		'default',
		'renders date and time inputs, using datetime-local where supported. Use `forceCalendar` option to not use datetime-local if supported',
		() => (
			<InfoWrapper>
				<div className='span--50'>
					<DateTimePicker
						name='event_time'
						label='Start at'
						value={new Date()}
						forceCalendar
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
				value={new Date()}
				required
				forceCalendar
			/>
		</div>);
	})
	.add('sets a valid date range', () => {
		const min = new Date(),
			max = new Date(),
			now = Date.now();
		min.setDate(min.getDate() - 2);
		max.setDate(max.getDate() + 12);
		const opts = {
			allowInput: true,
			minDate: min,
			maxDate: max
		};
		return (<div className='span--50'>
			<DateTimePicker
				name='event_time'
				label='Start date between Jan Feb 2018'
				value={now}
				forceCalendar
				datepickerOptions={opts}
			/>
		</div>);
	})
	.add('sets a default date and time', () => {
		const opts = {
				allowInput: true,
				minDate: Date.now()
			},
			date = new Date(3000,1,1,15,0,0);
		return (<div className='span--50'>
			<DateTimePicker
				name='event_time'
				label='In the year 3000'
				value={date}
				datepickerOptions={opts}
				forceCalendar
			/>
		</div>);
	})
	.add('can render date only', () => {
		const opts = {
				allowInput: true,
				minDate: Date.now()
			},
			date = '2017-02-18';

		return (<div className='span--50'>
			<DateTimePicker
				name='event_time'
				label='Start at'
				value={date}
				dateOnly
				datepickerOptions={opts}
				forceCalendar
			/>
		</div>);
	})
	.add('renders datetime-local on mobile with props', () => {
		const opts = {
				allowInput: true,
				minDate: Date.now()
			},
			date = '2017-02-18';

		return (<div className='span--50'>
			<DateTimePicker
				name='event_time'
				label='Start at'
				value={date}
				datepickerOptions={opts}
			/>
		</div>);
	})
	.add('can render date only on mobile', () => {
		const opts = {
				allowInput: true,
				minDate: Date.now()
			},
			date = '2017-02-18';

		return (<div className='span--50'>
			<DateTimePicker
				name='event_time'
				label='Start at'
				value={date}
				dateOnly
				datepickerOptions={opts}
			/>
		</div>);
	})
	.add('error state', () => {
		const opts = {
				allowInput: true,
				minDate: Date.now()
			},
			date = new Date(3000,1,1,15,0,0);
		return (<div className='span--50'>
			<DateTimePicker
				name='event_time'
				label='Start at'
				value={date}
				error={'Whoops, something went wrong.'}
				datepickerOptions={opts}
				forceCalendar
			/>
		</div>);
	});
