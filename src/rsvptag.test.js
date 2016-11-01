import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import RsvpTag from './RsvpTag';

describe('RsvpTag', function() {
	it('exists', function() {
		const rsvpTag = TestUtils.renderIntoDocument(<RsvpTag status='yes'/>);
		const rsvpTagNode = ReactDOM.findDOMNode(rsvpTag);
		expect(rsvpTagNode).not.toBeNull();
	});

	it('applies rsvpTag class', function() {
		const rsvpTag = TestUtils.renderIntoDocument(<RsvpTag status='yes' />);
		const rsvpTagNode = ReactDOM.findDOMNode(rsvpTag);
		expect(rsvpTagNode.classList.contains('rsvpTag')).toBe(true);
	});

	it('applies variant classes for each rsvp status', function() {
		const variants = [
			'yes',
			'no',
			'waiting',
		];
		variants.forEach(variant => {
			const props = {
				status: variant,
			};
			const rsvpTag = TestUtils.renderIntoDocument(<RsvpTag {...props} />);
			const rsvpTagNode = ReactDOM.findDOMNode(rsvpTag);
			expect(rsvpTagNode.classList.contains(`rsvpTag--${variant}`)).toBe(true);
		});
	});
});

