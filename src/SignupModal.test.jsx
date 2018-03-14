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
});
