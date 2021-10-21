import React from 'react';
import { shallow } from 'enzyme';

import { SignupModal } from './SignupModal';
import { signupOptions } from './signupModal.story';

describe('SignupModal', () => {
	const MOCK_PROPS = {
		signupOptions,
		onDismiss: jest.fn(),
	};
	const getWrapper = (props = {}) =>
		shallow(<SignupModal {...MOCK_PROPS} {...props} />);

	it('should match the snapshot', () => {
		expect(getWrapper()).toMatchSnapshot();
	});

	describe('apple signin', () => {
		describe('if apple.shouldRender is false', () => {
			it('should not show apple signin', () => {
				const props = {
					...MOCK_PROPS,
					signupOptions: {
						...MOCK_PROPS.signupOptions,
						apple: { ...MOCK_PROPS.signupOptions.apple, shouldRender: false },
					},
				};
				const wrapper = getWrapper(props);
				const appleUrl = wrapper.find({ 'data-testid': 'apple' });
				expect(appleUrl.length).toBe(0);
			});
		});
		describe('if apple.shouldRender is true', () => {
			it('should show apple signin', () => {
				const props = {
					...MOCK_PROPS,
					signupOptions: {
						...MOCK_PROPS.signupOptions,
						apple: { ...MOCK_PROPS.signupOptions.apple, shouldRender: true },
					},
				};
				const wrapper = getWrapper(props);
				const appleUrl = wrapper.find({ 'data-testid': 'apple' });
				expect(appleUrl.length).toBe(1);
			});
		});
	});
});
