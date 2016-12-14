import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { IntlProvider } from 'react-intl'
import SectionContainer from './SectionContainer';

function intlRender(component) {
	return TestUtils.renderIntoDocument(
		<IntlProvider locale='en-US'>
			{component}
		</IntlProvider>
	);
}

describe('SectionContainer', function() {

	it('exists', function() {
		const section = intlRender(<SectionContainer />);
		const sectionNode = ReactDOM.findDOMNode(section);

		expect(sectionNode).not.toBeNull();
	});

});
