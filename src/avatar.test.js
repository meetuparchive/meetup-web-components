import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Avatar from './Avatar';
import { variantTest } from './utils/testUtils';

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

	it('renders the noPhoto variant only when a `src` is not passed in', function() {
		const avatar = TestUtils.renderIntoDocument(<Avatar />);
		const avatarNode = ReactDOM.findDOMNode(avatar);
		expect(avatarNode.classList.contains('avatar--noPhoto')).toBe(true);

		const avatarWithSrc = TestUtils.renderIntoDocument(<Avatar src={'image.jpg'} />);
		const avatarWithSrcNode = ReactDOM.findDOMNode(avatarWithSrc);
		expect(avatarWithSrcNode.classList.contains('avatar--noPhoto')).toBe(false);
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
	it('renders a span element if `href` passed in', () => {
		const avatar = TestUtils.renderIntoDocument(<Avatar className='test' />);
		const avatarComponent = TestUtils.findRenderedDOMComponentWithClass(avatar, 'test');

		expect(avatarComponent.tagName.toLowerCase()).toBe('span');
	});
});
