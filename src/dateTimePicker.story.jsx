import React from 'react';
import DateTimePicker from './DateTimePicker';
import { storiesOf } from '@kadira/storybook';

storiesOf('DateTimePicker', module)
	.add('default', () => <DateTimePicker value={1477697199863} />);
