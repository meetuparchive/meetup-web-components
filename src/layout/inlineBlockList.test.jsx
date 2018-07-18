import React from 'react';
import { shallow } from 'enzyme';
import {
	InlineBlockListComponent,
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
		inlineblockList = shallow(<InlineBlockListComponent items={ITEMS} />);
		inlineblockListSeparated = shallow(
			<InlineBlockListComponent items={ITEMS} separator={SEPARATOR} />
		);
	});
	afterEach(() => {
		inlineblockList = null;
		inlineblockListSeparated = null;
	});

	it('exists', function() {
		expect(inlineblockList).toMatchSnapshot();
	});

	it(`should have a class of '${INLINEBLOCKLIST_SEPERATED_CLASS}' when a separator is defined`, () => {
		expect(
			inlineblockListSeparated
				.find('ul')
				.hasClass(INLINEBLOCKLIST_SEPERATED_CLASS)
		).toBe(true);
	});

	it('should set the data-separator attribute on item elements when a separator is defined', () => {
		const itemEl = inlineblockListSeparated.find('li').first();
		expect(itemEl.prop('data-separator')).toEqual(SEPARATOR);
	});
});
