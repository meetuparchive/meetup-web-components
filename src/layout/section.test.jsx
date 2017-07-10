import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import Section, {
	SECTION_CLASS,
	SECTION_NOSEPARATOR_CLASS,
	VALID_BREAKPOINTS,
	SECTION_FLUSH_CLASS
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

	describe('Section noSeparator', () => {
		it(`check that component has '${SECTION_NOSEPARATOR_CLASS}' class`, function() {
			Object.keys(VALID_BREAKPOINTS).forEach(breakpoint => {
				section = TestUtils.renderIntoDocument(<Section noSeparator={breakpoint} />);
				sectionNode = ReactDOM.findDOMNode(section);
				expect(sectionNode.classList).toContain(SECTION_CLASS);
				expect(sectionNode.classList).toContain(`${VALID_BREAKPOINTS[breakpoint]}_${SECTION_NOSEPARATOR_CLASS}`);
			});
		});
	});

	describe('Section flushUntil', () => {
		it(`check that component has '${SECTION_FLUSH_CLASS}' class`, function() {
			Object.keys(VALID_BREAKPOINTS).forEach(breakpoint => {
				section = TestUtils.renderIntoDocument(<Section flushUntil={breakpoint} />);
				sectionNode = ReactDOM.findDOMNode(section);
				expect(sectionNode.classList).toContain(SECTION_CLASS);
				expect(sectionNode.classList).toContain(`${VALID_BREAKPOINTS[breakpoint]}_${SECTION_FLUSH_CLASS}`);
			});
		});
	});

});
