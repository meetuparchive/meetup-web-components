import React from 'react';
import { shallow, mount } from 'enzyme';
import Downshift from 'downshift';

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
	<TypeaheadItem value={[{text: "Item Three"}]}>
		<div>
			<h3 className="text--bold">Item Three</h3>
			<p>Is super cool</p>
		</div>
	</TypeaheadItem>,
	<TypeaheadItem value={{text: "Item Four"}}>
		<div>
			<h3 className="text--bold">Item Four</h3>
			<p>Is super cool</p>
		</div>
	</TypeaheadItem>
];

const TA_ITEMS_OBJ_VALUES = [
	<TypeaheadItem value={{name: "Item One", id: 0}}>
		<div>
			<h3 className="text--bold">Item One</h3>
			<p>Is super cool</p>
		</div>
	</TypeaheadItem>,
	<TypeaheadItem value={{name: "Item Two", id: 1}}>
		<div>
			<h3 className="text--bold">Item Two</h3>
			<p>Is super cool</p>
		</div>
	</TypeaheadItem>,
	<TypeaheadItem value={{name: "Item Three", id: 2}}>
		<div>
			<h3 className="text--bold">Item Three</h3>
			<p>Is super cool</p>
		</div>
	</TypeaheadItem>,
	<TypeaheadItem value={{name: "Item Four", id: 3}}>
		<div>
			<h3 className="text--bold">Item Four</h3>
			<p>Is super cool</p>
		</div>
	</TypeaheadItem>
];

const TA_ITEMS_CHECKBOXES = [
	<TypeaheadItem value="Item One">
		{({isSelected}) => (
			<Checkbox controlled={false} label="Item One" checked={isSelected} name="taItems" value="item1" />
		)}
	</TypeaheadItem>,
	<TypeaheadItem value="Item Two">
		{({isSelected}) => (
			<Checkbox controlled={false} label="Item Two" checked={isSelected} name="taItems" value="item2" />
		)}
	</TypeaheadItem>,
	<TypeaheadItem value="Item Three">
		{({isSelected}) => (
			<Checkbox controlled={false} label="Item Three" checked={isSelected} name="taItems" value="item3" />
		)}
	</TypeaheadItem>,
	<TypeaheadItem value="Item Four">
		{({isSelected}) => (
			<Checkbox controlled={false} label="Item Four" checked={isSelected} name="taItems" value="item4" />
		)}
	</TypeaheadItem>
];

/**
 * @module TestMultiselectTypeahead
 */
class TestMultiselectTypeahead extends React.PureComponent {
	constructor(props) {
		super(props);

		this.selectHandler = this.selectHandler.bind(this);

		this.state = {
			selectedItems: []
		};
	}

	selectHandler(prevSelection, selectedItems) {
		this.setState(() => ({selectedItems}));
	}

	render() {
		const {items, ...other} = this.props;

		return (
			<div>
				<div className="chunk">
					{this.state.selectedItems}
				</div>
				<Typeahead
					multiSelect
					openOnFocus
					multiSelectValues={this.state.selectedItems}
					items={items}
					onSelect={this.selectHandler}
					{...other}
				/>
			</div>
		);
	}
}

describe('Typeahead', () => {
	const closedComponent = mount(
		<Typeahead items={TA_ITEMS} inputProps={{name: INPUT_NAME}} />);

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

	it('should set value to empty string if value passed is not a string and no itemToString prop is provided', () => {
		const openComponentObjValues = mount(
			<Typeahead
				isOpen
				items={TA_ITEMS_OBJ_VALUES}
				inputProps={{name: INPUT_NAME}}
			/>
		);
		const dropdownArea = openComponentObjValues.find(`.${TA_DROPDOWN_CLASSNAME}`);

		dropdownArea.find(`.${TA_ITEM_CLASSNAME}`).first().simulate('click');
		expect(openComponentObjValues.find(Downshift).instance().state.inputValue.length).toBe(0);
	});

	it('should set correct value if itemToString prop is provided', () => {
		const openComponentObjValues = mount(
			<Typeahead
				isOpen
				items={TA_ITEMS_OBJ_VALUES}
				itemToString={i => i ? i.name : ''}
				inputProps={{name: INPUT_NAME}}
			/>
		);
		const dropdownArea = openComponentObjValues.find(`.${TA_DROPDOWN_CLASSNAME}`);
		const firstItem = dropdownArea.find(`.${TA_ITEM_CLASSNAME}`).first();
		const firstItemVal = TA_ITEMS_OBJ_VALUES[0].props.value;

		firstItem.simulate('click');
		expect(openComponentObjValues.find(Downshift).instance().state.inputValue).toBe(firstItemVal.name);
	});

	it('should open the Typeahead menu on focus when `openOnFocus` is passed', () => {
		const openComponentCheckboxItems = mount(
			<TestMultiselectTypeahead
				items={TA_ITEMS_CHECKBOXES}
				inputProps={{
					name: INPUT_NAME,
				}}
			/>
		);

		expect(openComponentCheckboxItems).toMatchSnapshot();

	});

	it('should set multiple values when `multiSelect` and `multiSelectValues` are passed', () => {
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
