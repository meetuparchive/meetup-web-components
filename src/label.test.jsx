import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Label from './Label';

describe('Label', function() {

	it('exists', function() {
		const label = TestUtils.renderIntoDocument(<Label />);
		const labelNode = ReactDOM.findDOMNode(label);

		expect(labelNode).not.toBeNull();
	});

	it('should display a label', function() {
		const label = TestUtils.renderIntoDocument(<Label text='Favorite color' />);
		const labelNode = ReactDOM.findDOMNode(label);
		// console.log(labelNode.querySelector('label'));
		// expect(labelNode.querySelector('label').innerHTML).toEqual('Favorite color');
		expect(labelNode.textContent).toEqual('Favorite color');
	});
});
