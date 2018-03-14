import React from 'react';
import { shallow, mount } from 'enzyme';

import Typeahead, {
	TA_DROPDOWN_CLASSNAME,
	TA_ITEM_CLASSNAME
} from './Typeahead';

import TypeaheadItem from './TypeaheadItem';

const HEIGHT_LIMIT = '100px';
const INPUT_NAME = 'testName';
const TA_ITEMS = [
	<TypeaheadItem value="Item One">
		<div>
			<h3 className="text--bold">Item One</h3>
			<p>Is super cool</p>
		</div>
	</TypeaheadItem>,
	<TypeaheadItem value="Item Two">
		<div>
			<h3 className="text--bold">Item Two</h3>
			<p>Is super cool</p>
		</div>
	</TypeaheadItem>,
	<TypeaheadItem value="Item Three">
		<div>
			<h3 className="text--bold">Item Three</h3>
			<p>Is super cool</p>
		</div>
	</TypeaheadItem>,
	<TypeaheadItem value="Item Four">
		<div>
			<h3 className="text--bold">Item Four</h3>
			<p>Is super cool</p>
		</div>
	</TypeaheadItem>
];

describe('Typeahead', () => {
	const closedComponent = mount(
		<Typeahead inputProps={{name: INPUT_NAME}} />);

	const openComponent = mount(
		<Typeahead
			isOpen
			items={TA_ITEMS}
			height={HEIGHT_LIMIT}
			inputProps={{name: INPUT_NAME}}
		/>);

	const dropdownArea = openComponent.find(`.${TA_DROPDOWN_CLASSNAME}`);

	it('should hide dropdown area by default', () => {
		const dropdownArea = closedComponent.find(`.${TA_DROPDOWN_CLASSNAME}`);
		expect(dropdownArea.length).toBe(0);
	});

	it('should show dropdown area when isOpen is true', () => {
		expect(dropdownArea.length).toBe(1);
	});

	it('should crop dropdown area content when a height is provided', () => {
		expect(dropdownArea.prop('style').height).toBe(HEIGHT_LIMIT);
	});

	it('should pass props to the TextInput component', () => {
		const textInput = closedComponent.find('input');
		expect(textInput.prop('name')).toBe(INPUT_NAME);
	});

	it('should render `items` passed in', () => {
		expect(dropdownArea.find(`.${TA_ITEM_CLASSNAME}`).length).toBe(TA_ITEMS.length);
	});
});

describe('TypeaheadItem', () => {
	it('exists', () => {
		const taItem = shallow(
			<TypeaheadItem
				value="lolnothing"
			>
				<p>matters</p>
			</TypeaheadItem>
		);
		expect(taItem).toMatchSnapshot();
	});
});
