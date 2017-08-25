
import React from 'react';
import Toaster from './Toaster';
import Toast from './Toast';
import Button from '../forms/Button';
import { storiesOf } from '@kadira/storybook';
import { decorateWithLocale } from '../utils/decorators';

const toastArray = [<Toast>Yr toast is ready</Toast>];
const giveToast = () => {
	// console.log('toastArray before push');
	// console.log(toastArray);
	toastArray.push(
		<Toast>
			A NEW toast is ready
		</Toast>
	);
	// console.log('toastArray after push');
	// console.log(toastArray);
};


storiesOf('Toast', module)
	.addDecorator(decorateWithLocale)
	.add('default', () =>
		(<div>
			<Button onClick={giveToast}>Give me toast</Button>
			<Toaster
				toasts={toastArray}
			/>
		</div>)
	)
	.add('don\'t automatically dismiss', () =>
		(<Toaster
			toasts={[
				<Toast autodismiss={false}>
					Your toast is ready
				</Toast>
			]}
		/>)
	)
	.add('don\'t allow dismissal', () =>
		(<Toaster
			toasts={[
				<Toast autodismiss={false} dismissable={false}>
					Your toast is ready
				</Toast>
			]}
		/>)
	)
	.add('success', () =>
		(<Toaster
			toasts={[
				<Toast success>
					Your toast is ready
				</Toast>
			]}
		/>)
	)
	.add('error', () =>
		(<Toaster
			toasts={[
				<Toast error>
					Your toast is ready
				</Toast>
			]}
		/>)
	)
	.add('multiple', () =>
		(<Toaster
			toasts={[
				<Toast>
					Your toast is ready
				</Toast>,
				<Toast>
					Read this important message
				</Toast>,
				<Toast>
					Skim this nice-to-know message
				</Toast>
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
				>
					Your toast is ready
				</Toast>
			]}
		/>)
	);
