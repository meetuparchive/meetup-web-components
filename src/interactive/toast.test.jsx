import React from 'react';
import { shallow, mount } from 'enzyme';
import Toast, {
	TOAST_CLASS,
	TOAST_ACTION_CLASS,
	TOAST_DISMISS_BTN_CLASS,
	SUCCESS_TOAST_CLASS,
	ERROR_TOAST_CLASS
} from './Toast';
import Toaster from './Toaster';

const ToastWithProps = ({success, error, dismissable}) => (
	<Toaster
		toasts={[
			<Toast success={success} error={error} dismissable={dismissable}>
				Your toast is ready
			</Toast>
		]}
	/>
);

const ToastWithAction = ({action, actionLabel}) => (
	<Toaster
		toasts={[
			<Toast
				action={action}
				actionLabel={actionLabel}
				autodismiss={false}
			>
				Your toast is ready
			</Toast>
		]}
	/>
);

describe('Toaster', function() {
	it('should not dismiss toasts when being hovered', function(){
		// gotta figure this one out
	});
	it('should store toasts in state', function(){
		// gotta figure this one out
	});
});

describe('Toast', function() {
	const component = shallow(
		<Toaster
			toasts={[
				<Toast>
					Your toast is ready
				</Toast>
			]}
		/>
	);

	it('renders into the DOM', () => {
		expect(component).toMatchSnapshot();
	});

	it(`has a class of ${SUCCESS_TOAST_CLASS} when success prop is set`, () => {
		const component = mount(<ToastWithProps success />);
		const toast = component.find(`.${TOAST_CLASS}`);

		expect(toast.hasClass(SUCCESS_TOAST_CLASS)).toBe(true);
	});

	it(`has a class of ${ERROR_TOAST_CLASS} when success prop is set`, () => {
		const component = mount(<ToastWithProps error />);
		const toast = component.find(`.${TOAST_CLASS}`);

		expect(toast.hasClass(ERROR_TOAST_CLASS)).toBe(true);
	});

	it('should render an action if one is passed in', () => {
		const action = jest.fn();
		const component = mount(<ToastWithAction action={action} actionLabel='Action' />);
		const actionBtn = component.find(`.${TOAST_ACTION_CLASS}`);

		expect(actionBtn.length).toBe(1);
	});

	it('should call the function in the action when clicked', () => {
		const action = jest.fn();
		const component = mount(<ToastWithAction action={action} actionLabel='Action' />);
		const actionBtn = component.find(`.${TOAST_ACTION_CLASS}`);

		expect(action).not.toHaveBeenCalled();
		actionBtn.simulate('click');
		expect(action).toHaveBeenCalled();
	});

	it('should remove the Toast from the Toaster `toasts` state when the dismiss button is clicked', () => {
		// gotta figure this one out

		// const component = mount(<ToastWithProps />);
		// const dismissBtn = component.find(`.${TOAST_DISMISS_BTN_CLASS}`);

		// expect(component.instance().state.toasts.length).toBe(1);
		// dismissBtn.simulate('click');
		// expect(component.instance().state.toasts.length).toBe(0);
	});

	it('should not render a dismiss button if dismissable prop is false', () => {
		const component = mount(<ToastWithProps dismissable={false} />);
		const dismissBtn = component.find(`.${TOAST_DISMISS_BTN_CLASS}`);

		expect(dismissBtn.length).toBe(0);
	});

});
