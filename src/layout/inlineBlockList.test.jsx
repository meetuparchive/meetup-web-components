import React from 'react';
import TestUtils from 'react-dom/test-utils';
import InlineBlockList, {
	INLINEBLOCKLIST_CLASS,
	INLINEBLOCKLIST_SEPERATED_CLASS,
} from './InlineBlockList';

const ITEMS = [
		'English',
		'English (Australian)',
		'Deutsch',
		'Español',
		'Español (España)',
		'Français',
		'Italiano',
		'Nederlands',
		'Português',
		'日本語',
		'한국어',
	],
	SEPARATOR = '☃';

let inlineblockList, inlineblockListSeparated;

describe('InlineBlockList', function() {
	beforeEach(() => {
		inlineblockList = TestUtils.renderIntoDocument(
			<InlineBlockList items={ITEMS} />
		);
		inlineblockListSeparated = TestUtils.renderIntoDocument(
			<InlineBlockList items={ITEMS} separator={SEPARATOR} />
		);
	});
	afterEach(() => {
		inlineblockList = null;
		inlineblockListSeparated = null;
	});

	it('exists', function() {
		expect(() =>
			TestUtils.findRenderedDOMComponentWithClass(
				inlineblockList,
				INLINEBLOCKLIST_CLASS
			)
		).not.toThrow();
	});

	it(`should have a class of '${INLINEBLOCKLIST_SEPERATED_CLASS}' when a separator is defined`, () => {
		const separatedList = TestUtils.scryRenderedDOMComponentsWithClass(
			inlineblockListSeparated,
			INLINEBLOCKLIST_SEPERATED_CLASS
		);
		expect(separatedList.length).toBe(1);
	});

	it('should set the data-separator attribute on item elements when a separator is defined', () => {
		const itemEl = TestUtils.scryRenderedDOMComponentsWithTag(
			inlineblockListSeparated,
			'li'
		);
		expect(itemEl[0].getAttribute('data-separator')).toEqual(SEPARATOR);
	});
});
