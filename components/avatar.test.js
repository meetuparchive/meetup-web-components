import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Link from 'react-router/lib/Link';
import Avatar from './Avatar';
import { variantTest } from './foundationTestUtils';

describe('Avatar', function() {

	it('exists', function() {
		const avatar = TestUtils.renderIntoDocument(<Avatar />);
		const avatarNode = ReactDOM.findDOMNode(avatar);

		expect(avatarNode).not.toBeNull();
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
		const avatarNode = ReactDOM.findDOMNode(avatar);
		expect(avatarNode.style.backgroundImage.indexOf(src)).not.toBe(-1);
	});

	it('renders a link when passed an `href`', function() {
		const href = 'foo';
		const avatar = TestUtils.renderIntoDocument(<Avatar href={href} />);
		const avatarNode = ReactDOM.findDOMNode(avatar);
		expect(avatarNode.tagName).toEqual('A');
		expect(avatarNode.getAttribute('href')).toEqual(href);
	});

	it('does not render a link when not passed an `href`', function() {
		const avatar = TestUtils.renderIntoDocument(<Avatar />);
		const avatarNode = ReactDOM.findDOMNode(avatar);
		expect(avatarNode.tagName).not.toEqual('A');
	});

	it('renders a Link when passed a `to`', function() {
		const avatar = TestUtils.renderIntoDocument(<Avatar to={'/foo'} />);
		expect(() => TestUtils.findRenderedComponentWithType(avatar, Link)).not.toThrow();
	});

	it('renders the noPhoto variant only when a `src` is not passed in', function() {
		const avatar = TestUtils.renderIntoDocument(<Avatar />);
		const avatarNode = ReactDOM.findDOMNode(avatar);
		expect(avatarNode.classList.contains('avatar--noPhoto')).toBe(true);

		const avatarWithSrc = TestUtils.renderIntoDocument(<Avatar src={'image.jpg'} />);
		const avatarWithSrcNode = ReactDOM.findDOMNode(avatarWithSrc);
		expect(avatarWithSrcNode.classList.contains('avatar--noPhoto')).toBe(false);
	});
});
