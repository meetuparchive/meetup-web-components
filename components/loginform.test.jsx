import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import LoginForm from './LoginForm';
import { hasAttribute, hasRoleAttribute } from './foundationTestUtils';

describe('LoginForm', () => {
	it('exists', () => {
		const loginForm = TestUtils.renderIntoDocument(<LoginForm loginAction={() => {}} />);
		const loginFormNode = ReactDOM.findDOMNode(loginForm);
		expect(loginFormNode).not.toBeNull();
	});

	it('applies role="textbox" attributes to all inputs', () => {
		const loginForm = TestUtils.renderIntoDocument(<LoginForm loginAction={() => {}} />);
		const loginFormNode = ReactDOM.findDOMNode(loginForm);
		const loginFormInputArray = Array.prototype.slice.call(loginFormNode.getElementsByTagName('INPUT'));
		loginFormInputArray.forEach(input => hasRoleAttribute(input, 'textbox'));
	});

	it('applies aria-readonly attribute to all inputs when disabled', () => {
		const loginForm = TestUtils.renderIntoDocument(<LoginForm loginAction={() => {}} disabled />);
		const loginFormNode = ReactDOM.findDOMNode(loginForm);
		const loginFormInputArray = Array.prototype.slice.call(loginFormNode.getElementsByTagName('INPUT'));
		loginFormInputArray.forEach(input => hasAttribute(input, 'aria-readonly'));
	});


	it('calls loginAction with email and password values when submit button is clicked', () => {
		const spyable = {
			loginAction: () => {}
		};
		const EMAIL = 'a@b.com';
		const PASSWORD = '1234';

		spyOn(spyable, 'loginAction');
		const loginForm = TestUtils.renderIntoDocument(<LoginForm loginAction={spyable.loginAction} />);
		const loginFormEl = ReactDOM.findDOMNode(loginForm);
		const emailInput = loginFormEl.querySelector('.loginForm-email');
		const passwordInput = loginFormEl.querySelector('.loginForm-password');
		emailInput.value = EMAIL;
		TestUtils.Simulate.change(emailInput);
		passwordInput.value = PASSWORD;
		TestUtils.Simulate.change(passwordInput);

		TestUtils.Simulate.click(loginFormEl.querySelector('.loginForm-submit'));
		expect(spyable.loginAction).toHaveBeenCalledWith({ email: EMAIL, password: PASSWORD });
	});
});

