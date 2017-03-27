import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import RichTextEditorContainer from './RichTextEditorContainer';

describe('RichTextEditorContainer', function() {

	it('exists', function() {
		const richTextEditor = TestUtils.renderIntoDocument(<RichTextEditorContainer />);
		const richTextEditorNode = ReactDOM.findDOMNode(richTextEditor);

		expect(richTextEditorNode).not.toBeNull();
	});

});
