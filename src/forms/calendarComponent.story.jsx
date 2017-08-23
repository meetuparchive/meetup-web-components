import React from 'react';
import CalendarComponent from './CalendarComponent';
import { storiesOf } from '@kadira/storybook';
import { InfoWrapper } from '../utils/storyComponents';

storiesOf('CalendarComponent', module)
	.addWithInfo(
		'default',
		'renders a calendar component',
		() => (
			<InfoWrapper>
				<div className='span--50'>
					<CalendarComponent
						name='event_time'
						label='Start at'
						value={new Date()}
						opts={{ allowInput: true }}
					/>
				</div>
			</InfoWrapper>
		)
	)
	.add('required', () => {
		return (<div className='span--50'>
			<CalendarComponent
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
			<CalendarComponent
				name='event_time'
				label='Start date between Jan Feb 2018'
				value={now}
				forceCalendar
				opts={opts}
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
			<CalendarComponent
				name='event_time'
				label='In the year 3000'
				value={date}
				datepickerOptions={opts}
				forceCalendar
			/>
		</div>);
	})
	.add('error state', () => {
		const opts = {
				allowInput: true,
				minDate: Date.now()
			},
			date = new Date(3000,1,1,15,0,0);
		return (
			<div className='span--50'>
				<CalendarComponent
					name='event_time'
					label='Start at'
					value={date}
					error={'Woops, something went wrong.'}
					datepickerOptions={opts}
					forceCalendar
				/>
			</div>
		);
	});
