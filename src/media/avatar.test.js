import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Avatar, { AVATAR_CLASS } from './Avatar';
import { variantTest } from '../utils/testUtils';

describe('Avatar', function() {

	it('exists', function() {
		const avatar = TestUtils.renderIntoDocument(<Avatar />);
		expect(() => TestUtils.findRenderedComponentWithType(avatar, Avatar)).not.toThrow();
	});

	it('applies variant classes for each variant prop', function() {
		const variants = [
			'small',
			'big',
		];
		variantTest(Avatar, 'avatar', variants);
	});

	it('applies a background image when provided `src`', function() {
		const src = 'image.jpg';
		const avatar = TestUtils.renderIntoDocument(<Avatar src={src} />);
		const avatarNode = TestUtils.findRenderedDOMComponentWithClass(avatar, AVATAR_CLASS);
		expect(avatarNode.style.backgroundImage).toContain(src);
	});

	it('should not apply a background image when no `src` provided', function() {
		const avatar = TestUtils.renderIntoDocument(<Avatar />);
		const avatarNode = TestUtils.findRenderedDOMComponentWithClass(avatar, AVATAR_CLASS);
		expect(avatarNode.style.backgroundImage).toBe('');
	});

	it('renders a link element if `href` passed in', () => {
		const avatar = TestUtils.renderIntoDocument(<Avatar className='test' href='/' />);
		const avatarComponent = TestUtils.findRenderedDOMComponentWithClass(avatar, 'test');

		expect(avatarComponent.tagName.toLowerCase()).toBe('a');
	});
	it('renders a link element if `to` passed in', () => {
		const avatar = TestUtils.renderIntoDocument(<Avatar className='test' to='/' />);
		const avatarComponent = TestUtils.findRenderedDOMComponentWithClass(avatar, 'test');

		expect(avatarComponent.tagName.toLowerCase()).toBe('a');
	});
	it('renders a span element if no `href` or `to` prop passed in', () => {
		const avatar = TestUtils.renderIntoDocument(<Avatar className='test' />);
		const avatarComponent = TestUtils.findRenderedDOMComponentWithClass(avatar, 'test');

		expect(avatarComponent.tagName.toLowerCase()).toBe('span');
	});
});
