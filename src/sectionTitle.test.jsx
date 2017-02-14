import React from 'react';
import TestUtils from 'react-addons-test-utils';

import SectionTitle, { SECTIONTITLE_CLASS } from './SectionTitle';

describe('SectionTitle', function() {
	let component;

	beforeEach(() => {
		component = TestUtils.renderIntoDocument(<SectionTitle />);
	});
	afterEach(() => {
		component = null;
	});

	it(`check that default component has '${SECTIONTITLE_CLASS}' class`, function() {
		const topNode = TestUtils.scryRenderedDOMComponentsWithClass(component, SECTIONTITLE_CLASS);
		expect(topNode.length).toBe(1);
	});

});
