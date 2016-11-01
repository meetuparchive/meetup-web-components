import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { IntlProvider } from 'react-intl'
import Image from './Image';

function intlRender(component) {
	return TestUtils.renderIntoDocument(
		<IntlProvider locale='en'>
			{component}
		</IntlProvider>
	);
}

describe('Image', function() {

	it('exists', function() {
		const image = intlRender(<Image />);
		const imageNode = ReactDOM.findDOMNode(image);

		expect(imageNode).not.toBeNull();
	});

});
