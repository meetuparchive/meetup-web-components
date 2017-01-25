import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import AvatarStack from './AvatarStack';
import { variantTest } from './utils/testUtils';

describe('AvatarStack', function() {

	it('exists', function() {
		const avatarStack = TestUtils.renderIntoDocument(<AvatarStack />);
		const avatarStackNode = ReactDOM.findDOMNode(avatarStack);

		expect(avatarStackNode).not.toBeNull();
	});

	it('applies variant classes for each variant prop', function() {
		const variants = [
			'small',
			'big',
		];
		variantTest(AvatarStack, 'avatarStack', variants);
	});

});
