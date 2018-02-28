import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';

import Bounds from './Bounds';
import styles from './bounds.module.scss';

const WIDE_CLASS = styles['bounds--wide'];

describe('Bounds', function() {
	const bounds = TestUtils.renderIntoDocument(<Bounds />);
	const boundsNode = ReactDOM.findDOMNode(bounds);
	const boundsNarrow = TestUtils.renderIntoDocument(<Bounds narrow />);
	const boundsNarrowNode = ReactDOM.findDOMNode(boundsNarrow);

	it('exists', function() {
		expect(boundsNode).not.toBeNull();
	});
	it(`check that default component has '${WIDE_CLASS}' class`, function() {
		expect(boundsNode.classList).toContain(WIDE_CLASS);
	});
	it("check that narrow component does not have the 'bounds--wide' class", function() {
		expect(boundsNarrowNode.classList).not.toContain(WIDE_CLASS);
	});
});
