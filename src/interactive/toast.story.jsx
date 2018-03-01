
import React from 'react';
import Toaster from './Toaster';
import Toast from './Toast';
import Button from '../forms/Button';
import { storiesOf } from '@storybook/react';
import {
	decorateWithBasics,
	decorateWithInfo,
} from '../utils/decorators';

const toastArray = [<Toast>Your toast is ready</Toast>];

/**
 * @module ToasterContainer
 */
class ToasterContainer extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			addedToasts: this.props.addedToasts
		};

		this.addToast = this.addToast.bind(this);
	}

	addToast(toast) {
		this.setState({
			addedToasts: toast
		});
	}

	render() {
		const {
			addedToasts // eslint-disable-line no-unused-vars
		} = this.props;
		const newToast = <Toast>This toast is new</Toast>;

		return (
			<div>
				<Toaster
					toasts={this.state.addedToasts}
				/>
				<Button onClick={() => this.addToast(newToast)}>Give me toast</Button>
			</div>
		);
	}
}

storiesOf('Toast', module)
	.addDecorator(decorateWithBasics)
	.addDecorator(decorateWithInfo)
	.add('default', () =>
		(<ToasterContainer
			addedToasts={toastArray}
		/>)
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
	.add('action on dismiss', () =>
		(<Toaster
			toasts={[<Toast autodismiss={false} onDismiss={() => alert('you\'re dismissed!')}>Alert on dismiss</Toast>]}
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
