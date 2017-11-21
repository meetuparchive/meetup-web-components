import React from 'react';
import TestUtils from 'react-dom/test-utils';
import Avatar from './Avatar';
import { variantTest } from '../utils/testUtils';

describe('Avatar', function() {
	it('exists', function() {
		const avatar = TestUtils.renderIntoDocument(<Avatar />);
		expect(() =>
			TestUtils.findRenderedComponentWithType(avatar, Avatar)
		).not.toThrow();
	});

	it('applies variant classes for each variant prop', function() {
		const variants = ['small', 'large', 'xxlarge'];
		variantTest(Avatar, 'avatar', variants);
	});

	it('renders an img element when provided `src`', function() {
		const src = 'image.jpg';
		const avatar = TestUtils.renderIntoDocument(<Avatar src={src} />);

		expect(() =>
			TestUtils.findRenderedDOMComponentWithTag(
				avatar,
				'IMG'
			)
		).not.toThrow();
	});

	it('should not render an img element when no `src` provided', function() {
		const avatar = TestUtils.renderIntoDocument(<Avatar />);
		expect(() =>
			TestUtils.findRenderedDOMComponentWithTag(
				avatar,
				'IMG'
			)
		).toThrow();
	});

	it('renders a link element if `href` passed in', () => {
		const avatar = TestUtils.renderIntoDocument(
			<Avatar className="test" href="/" />
		);
		const avatarComponent = TestUtils.findRenderedDOMComponentWithClass(
			avatar,
			'test'
		);

		expect(avatarComponent.tagName.toLowerCase()).toBe('a');
	});
	it('renders a link element if `to` passed in', () => {
		const avatar = TestUtils.renderIntoDocument(
			<Avatar className="test" to="/" />
		);
		const avatarComponent = TestUtils.findRenderedDOMComponentWithClass(
			avatar,
			'test'
		);

		expect(avatarComponent.tagName.toLowerCase()).toBe('a');
	});
	it('renders a span element if no `href` or `to` prop passed in', () => {
		const avatar = TestUtils.renderIntoDocument(<Avatar className="test" />);
		const avatarComponent = TestUtils.findRenderedDOMComponentWithClass(
			avatar,
			'test'
		);

		expect(avatarComponent.tagName.toLowerCase()).toBe('span');
	});
});
