import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { MOCK_GROUP } from 'meetup-web-mocks/lib/api';
import { GroupCard } from './GroupCard';

describe('GroupCard', function() {

	it('exists', function() {
		const groupCard = TestUtils.renderIntoDocument(<GroupCard group={MOCK_GROUP} />);
		const node = ReactDOM.findDOMNode(groupCard);

		expect(node).not.toBeNull();
	});

	it('renders a photo when one is provided', function() {
		const groupCard = TestUtils.renderIntoDocument(<GroupCard group={MOCK_GROUP} />);
		const cardEl = ReactDOM.findDOMNode(groupCard);

		expect(cardEl.style.backgroundImage.indexOf(MOCK_GROUP.key_photo.thumb_link)).not.toBe(-1);
	});

	it('renders the group info', function() {
		const groupCard = TestUtils.renderIntoDocument(<GroupCard group={MOCK_GROUP} />);
		const node = ReactDOM.findDOMNode(groupCard);

		expect(node.querySelector('.card--group-content-name').textContent.trim()).toBe(MOCK_GROUP.name);
		expect(node.querySelector('.card--group-content-members').textContent.trim())
			.toBe(`${MOCK_GROUP.members} ${MOCK_GROUP.who}`);
	});

});
