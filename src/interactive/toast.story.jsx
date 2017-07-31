
import React from 'react';
import Toaster from './Toaster';
import Toast from './Toast';
import { storiesOf } from '@kadira/storybook';
import { decorateWithLocale } from '../utils/decorators';

storiesOf('Toast', module)
	.addDecorator(decorateWithLocale)
	.add('default', () =>
		(<Toaster
			toasts={[
				<Toast
					autodismiss={false}
					dismissable
					message='Your toast is ready'
				/>
			]}
		/>)
	)
	.add('success', () =>
		(<Toaster
			toasts={[
				<Toast
					success
					autodismiss={false}
					dismissable
					message='Your toast is ready'
				/>
			]}
		/>)
	)
	.add('error', () =>
		(<Toaster
			toasts={[
				<Toast
					error
					autodismiss={false}
					dismissable
					message='Your toast is ready'
				/>
			]}
		/>)
	)
	.add('multiple', () =>
		(<Toaster
			toasts={[
				<Toast
					autodismiss={false}
					dismissable
					message='lol nothing matters'
				/>,
				<Toast
					autodismiss={false}
					dismissable
					message='jk, everything matters'
				/>,
				<Toast
					autodismiss={false}
					dismissable
					message='Your toast is ready'
				/>
			]}
		/>)
	)
	.add('withAction', () =>
		(<Toaster
			toasts={[
				<Toast
					action={()=>{console.log('withAction');}}
					actionLabel='Do it'
					autodismiss={false}
					message='lol nothing matters'
				/>
			]}
		/>)
	);
