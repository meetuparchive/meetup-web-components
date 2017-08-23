import React from 'react';
import { InfoWrapper } from '../utils/storyComponents';
import DateTimeLocalInput from './DateTimeLocalInput';
import { storiesOf } from '@kadira/storybook';

const fieldProps = {
	name: 'datetime',
	label:'When is Y2K?',
	min: '1999-12-31T23:55',
	max: '2017-06-30T16:30'
};

storiesOf('DateTimeLocalInput', module)
	.addWithInfo(
		'default',
		'renders a datetime-local input. this component is intended to be used as a fallback for mobile.',
		() => (
			<InfoWrapper>
				<div className='span--25'>
					<DateTimeLocalInput {...fieldProps} />
				</div>
			</InfoWrapper>
		)
	)
	.add('initial value', () => {
		return (<div className='span--25'>
			<DateTimeLocalInput {...fieldProps} value={'2000-01-01T00:01'} />
		</div>);
	})
	.add('required', () => {
		return (<div className='span--25'>
			<DateTimeLocalInput {...fieldProps} required />
		</div>);
	})
	.add('with error', () => {
		return (<div className='span--25'>
			<DateTimeLocalInput {...fieldProps} value={fieldProps.min} required error='Sorry outta time!'/>
		</div>);
	});

