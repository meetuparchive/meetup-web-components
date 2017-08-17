import React from 'react';
import { shallow, mount } from 'enzyme';
import Toast, {
	TOAST_CLASS,
	TOAST_ACTION_CLASS,
	TOAST_DISMISS_BTN_CLASS,
	SUCCESS_TOAST_CLASS,
	ERROR_TOAST_CLASS,
	DELAY_TIME
} from './Toast';
import Toaster from './Toaster';

const ToastWithProps = (passedProps) => (
	<Toaster
		toasts={[
			<Toast {...passedProps}>
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
	const testToast = (
		<Toast>
			Your toast is ready
		</Toast>
	);

	const component = shallow(
		<Toaster
			toasts={[
				testToast
			]}
		/>
	);

	it('should store toasts in state', function(){
		expect(component.state().toasts.length).toBe(1);
	});

	it('should handle mouseEnter and mouseLeave', function(){
		const clearTimeoutsSpy = spyOn(Toaster.prototype, 'clearTimeouts');
		const setTimerSpy = spyOn(Toaster.prototype, 'setTimer');
		const toasterComponent = shallow(
			<Toaster
				toasts={[
					<Toast>
						Your toast is ready
					</Toast>
				]}
			/>
		);

		toasterComponent.simulate('mouseEnter');
		expect(clearTimeoutsSpy).toHaveBeenCalled();
		toasterComponent.simulate('mouseLeave');
		expect(setTimerSpy).toHaveBeenCalled();
	});

	it('should set dismiss toasts', function(){
		component.instance().setDismissedToast(testToast);

		expect(component.state().toasts).not.toContain(testToast);
	});

	it('should dismiss toasts after specified time', function(){
		expect(component.state().toasts.length).toBe(1);
		setTimeout(() => {
			expect(component.state().toasts.length).toBe(0);
		}, parseInt(DELAY_TIME + 1));
	});

	it('should set a timeout when the component mounts', function(){
		const component = mount(<ToastWithProps />);
		const toasterComponent = component.find(Toaster).getNode();

		expect(toasterComponent.timeouts.length).toBe(1);
	});

	it('should clear timeouts when the component unmounts', function(){
		const clearTimeoutsSpy = spyOn(Toaster.prototype, 'clearTimeouts');
		const component = mount(<ToastWithProps />);

		component.unmount();
		expect(clearTimeoutsSpy).toHaveBeenCalled();
	});

	it('should clear the timeouts when specified', function(){
		const setDismissedToastSpy = spyOn(Toaster.prototype, 'setDismissedToast');
		const component = mount(<ToastWithProps />);
		const toasterComponent = component.find(Toaster).getNode();

		toasterComponent.clearTimeouts();

		setTimeout(() => {
			expect(setDismissedToastSpy).not.toHaveBeenCalled();
		}, parseInt(DELAY_TIME + 1));
	});

});

describe('Toast', function() {
	const testToast = (
		<Toast>
			Your toast is ready
		</Toast>
	);

	const component = shallow(
		<Toaster
			toasts={[
				testToast
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

	it('should call setDismissedToast when the dismiss button is clicked', () => {
		const setDismissedToastSpy = spyOn(Toaster.prototype, 'setDismissedToast');
		const component = mount(<ToastWithProps />);
		const dismissBtn = component.find(`.${TOAST_DISMISS_BTN_CLASS}`);

		expect(setDismissedToastSpy).not.toHaveBeenCalled();
		dismissBtn.simulate('click');
		expect(setDismissedToastSpy).toHaveBeenCalled();
	});

	it('should remove the Toast from the Toaster `toasts` state when the dismiss button is clicked', () => {
		const component = mount(<ToastWithProps />);
		const toasterComponent = component.find(Toaster).getNode();
		const dismissBtn = component.find(`.${TOAST_DISMISS_BTN_CLASS}`);

		expect(toasterComponent.state.toasts.length).toBe(1);
		dismissBtn.simulate('click');
		expect(toasterComponent.state.toasts.length).toBe(0);
	});

	it('should not render a dismiss button if dismissable prop is false', () => {
		const component = mount(<ToastWithProps dismissable={false} />);
		const dismissBtn = component.find(`.${TOAST_DISMISS_BTN_CLASS}`);

		expect(dismissBtn.length).toBe(0);
	});

});
