import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import Section, {
	SECTION_CLASS,
	SECTION_PADDED_CLASS,
} from './Section';

describe('Section', function() {
	let section,
		sectionNode;

	beforeEach(() => {
		section = TestUtils.renderIntoDocument(<Section />);
		sectionNode = ReactDOM.findDOMNode(section);
	});
	afterEach(() => {
		section = null;
		sectionNode = null;
	});
	it('exists', function() {
		expect(sectionNode).not.toBeNull();
	});
	it(`check that default component has '${SECTION_CLASS}' class`, function() {
		expect(sectionNode.classList).toContain(SECTION_CLASS);
	});

	describe('padded', () => {
		beforeEach(() => {
			section = TestUtils.renderIntoDocument(<Section padded/>);
			sectionNode = ReactDOM.findDOMNode(section);
		});
		it(`check that default component has '${SECTION_PADDED_CLASS}' class`, function() {
			expect(sectionNode.classList).toContain(SECTION_PADDED_CLASS);
		});
	})
});
