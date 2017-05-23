
import React from 'react';
import Toast from './Toast';
import { storiesOf } from '@kadira/storybook';
import { decorateWithLocale } from '../utils/decorators';

storiesOf('Toast', module)
	.addDecorator(decorateWithLocale)
	.add('default', () =>
		<Toast
			dismissable
			message='lol nothing matters'
		/>
	)
	.add('withAction', () =>
		<Toast
			action={()=>{console.log('withAction');}}
			actionLabel='Do it'
			message='lol nothing matters'
		/>
	);
