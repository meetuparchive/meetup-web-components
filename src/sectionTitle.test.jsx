import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import SectionTitle, { SECTIONTITLE_CLASS } from './SectionTitle';

describe('SectionTitle', function() {
	let sectionTitle,
		titleNode;

	beforeEach(() => {
		sectionTitle = TestUtils.renderIntoDocument(<SectionTitle />);
		titleNode = ReactDOM.findDOMNode(sectionTitle);
	});
	afterEach(() => {
		sectionTitle = null;
		titleNode = null;
	});

	it('exists', function() {
		expect(titleNode).not.toBeNull();
	});

	it(`check that default component has '${SECTIONTITLE_CLASS}' class`, function() {
		expect(titleNode.classList).toContain(SECTIONTITLE_CLASS);
	});

});
