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
		const mouseEnterSpy = spyOn(Toaster.prototype, 'mouseEnter');
		const mouseLeaveSpy = spyOn(Toaster.prototype, 'mouseLeave');
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
		expect(mouseEnterSpy).toHaveBeenCalled();
		toasterComponent.simulate('mouseLeave');
		expect(mouseLeaveSpy).toHaveBeenCalled();
	});

	it('should set dismiss toasts', function(){
		component.instance().setDismissedToast(testToast);

		expect(component.state().toasts).not.toContain(testToast);
	});

	it('should dismiss toasts after specified time', function(){
		expect(component.state().toasts.length).toBe(1);
		setTimeout(() => {
			expect(component.state().toasts.length).toBe(0);
		}, 3000);
	});

	it('should set a timeout when the component mounts', function(){
		// mount component
		// check that length of `this.timeouts` is > 0
	});

	it('should clear the timeouts when specified', function(){
		// mount component
		// call `this.clearTimeouts()`
		// check that length of `this.timeouts` is 0
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

	it('should remove the Toast from the Toaster `toasts` state when the dismiss button is clicked', () => {
		// gotta figure this one out

		// const mountedComponent = mount(<ToastWithProps />);
		// const dismissBtn = mountedComponent.find(`.${TOAST_DISMISS_BTN_CLASS}`);

		// console.log(component.state('toasts').length);

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
