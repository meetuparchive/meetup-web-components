import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { IntlProvider } from 'react-intl'
import AlbumGridContainer from './AlbumGridContainer';

function intlRender(component) {
	return TestUtils.renderIntoDocument(
		<IntlProvider locale='en-US'>
			{component}
		</IntlProvider>
	);
}

describe('AlbumGridContainer', function() {

	it('exists', function() {
		const albumGrid = intlRender(<AlbumGridContainer />);
		const albumGridNode = ReactDOM.findDOMNode(albumGrid);

		expect(albumGridNode).not.toBeNull();
	});

});
