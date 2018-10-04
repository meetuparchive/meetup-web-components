import React from 'react';
import CalendarComponent from './CalendarComponent';
import { storiesOf } from '@storybook/react';
import { decorateWithBasics, decorateWithInfo } from '../utils/decorators';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { LocalDate, convert } from 'js-joda';

import Section from '../layout/Section';
import Chunk from '../layout/Chunk';

const jodaDate = LocalDate.now();

storiesOf('Forms/CalendarComponent', module)
	.addDecorator(decorateWithBasics)
	.addDecorator(decorateWithInfo)
	.addDecorator(withKnobs)
	.add('default', () => (
		<Section>
			<Chunk className="span--50">
				<CalendarComponent
					name="event_time"
					label="Start at"
					value={jodaDate}
					datepickerOptions={{
						maxDate: boolean('max date today', false) && jodaDate,
						minDate:
							boolean('min date today', false) && jodaDate.plusWeeks(16),
					}}
				/>
			</Chunk>
			<Chunk>
				<p className="text--caption">
					For a full list of available <code>datepickerOptions</code>, see{' '}
					<a
						className="link"
						target="_blank"
						href="https://chmln.github.io/flatpickr/options/"
					>
						flatpickr documentation
					</a>
				</p>
			</Chunk>
		</Section>
	))
	.add('required', () => {
		return (
			<div className="span--50">
				<CalendarComponent
					name="event_time"
					label="Start at"
					value={jodaDate}
					required
					requiredText="(required)"
				/>
			</div>
		);
	})
	.add('with error', () => {
		return (
			<div className="span--50">
				<CalendarComponent
					name="event_time"
					label="Start at"
					value={jodaDate}
					error="this is an error"
				/>
			</div>
		);
	})
	.add('with helper text', () => {
		return (
			<div className="span--50">
				<CalendarComponent
					name="event_time"
					label="Start at"
					helperText="Lorem Ipsum is simply dummy text"
					value={jodaDate}
				/>
			</div>
		);
	})
	.add('sets a valid date range', () => {
		return (
			<div className="span--50">
				<CalendarComponent
					name="event_time"
					label="From 2 days ago to 1 week from now"
					value={jodaDate}
					datepickerOptions={{
						allowInput: true,
						minDate: convert(jodaDate.minusDays(2)).toDate(),
						maxDate: convert(jodaDate.plusDays(7)).toDate(),
					}}
				/>
			</div>
		);
	})
	.add('sets a default date and time', () => {
		const date = LocalDate.of(3000, 1, 1);
		return (
			<div className="span--50">
				<CalendarComponent
					name="event_time"
					label="In the year 3000"
					value={date}
					datepickerOptions={{
						allowInput: true,
						minDate: jodaDate,
					}}
				/>
			</div>
		);
	})
	.add('error state', () => {
		const date = LocalDate.of(3000, 1, 1);
		return (
			<div className="span--50">
				<CalendarComponent
					name="event_time"
					label="Start at"
					value={date}
					error={'Woops, something went wrong.'}
					datepickerOptions={{
						allowInput: true,
						minDate: jodaDate,
					}}
				/>
			</div>
		);
	});
