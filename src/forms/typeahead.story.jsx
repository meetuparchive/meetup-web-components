import React from "react";
import { storiesOf } from "@storybook/react";
import { decorateWithBasics } from '../utils/decorators';

import Typeahead from './Typeahead';
import TypeaheadItem from './TypeaheadItem';
import Checkbox from './Checkbox';

const typeaheadItems = [
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

const typeaheadCheckboxes = [
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
 * @module MultiselectTypeahead
 */
class MultiselectTypeahead extends React.PureComponent {
	constructor(props) {
		super(props);

		this.selectHandler = this.selectHandler.bind(this);

		this.state = {
			selectedItems: []
		};
	}

	selectHandler(prevSelection, selectedItems) {
		const filteredItems = this.state.selectedItems.includes(prevSelection)
			? this.state.selectedItems.filter(item => item !== prevSelection)
			: selectedItems;

		this.setState(() => ({
			selectedItems: filteredItems
		}));
	}

	render() {
		const {items, ...other} = this.props;

		return (
			<div>
				<div className="chunk">
					<h5 className="text--bold display--inline">Selections: </h5>
					{this.state.selectedItems.map(item => (<span>{item}, </span>))}
				</div>
				<Typeahead
					multiSelect
					openOnFocus
					openOnSelect
					multiSelectValues={this.state.selectedItems}
					items={items}
					onSelect={this.selectHandler}
					{...other}
				/>
			</div>
		);
	}
}

const typeaheadItemsObjValues = [
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

storiesOf("Typeahead", module)
	.addDecorator(decorateWithBasics)
	.addWithInfo(
		"default",
		() => (
			<Typeahead
				items={typeaheadItems}
				inputProps={{name: 'typeaheadInputName'}}
			/>
		)
	)
	.addWithInfo(
		"scrolling with max height",
		() => (
			<div>
				<Typeahead
					items={typeaheadItems}
					height="100px"
					inputProps={{
						label: 'Menu scrolls at 100px',
						name: 'typeaheadInputName'
					}}
				/>
			</div>
		)
	)
	.addWithInfo(
		"with value",
		() => (
			<Typeahead
				items={typeaheadItems}
				defaultSelectedItem={typeaheadItems[0].props.value}
				inputProps={{
					label: 'Has a default selected item',
					name: 'typeaheadInputName'
				}}
			/>
		)
	)
	.addWithInfo(
		"with placeholder",
		() => (
			<Typeahead
				items={typeaheadItems}
				inputProps={{
					placeholder: 'Placeholder text',
					label: 'Labeled typeahead',
					name: 'typeaheadInputName'
				}}
			/>
		)
	)
	.addWithInfo(
		"with helperText",
		() => (
			<Typeahead
				items={typeaheadItems}
				inputProps={{
					helperText: 'Some helper info',
					label: 'Labeled typeahead',
					name: 'typeaheadInputName'
				}}
			/>
		)
	)
	.addWithInfo(
		"disabled",
		() => (
			<Typeahead
				items={typeaheadItems}
				inputProps={{
					disabled: true,
					label: 'Disabled typeahead',
					name: 'typeaheadInputName'
				}}
			/>
		)
	)
	.addWithInfo(
		"error",
		() => (
			<Typeahead
				items={typeaheadItems}
				inputProps={{
					error: 'Not so fast. You have an error.',
					label: 'Typeahead with error',
					name: 'typeaheadInputName'
				}}
			/>
		)
	)
	.addWithInfo(
		"required",
		() => (
			<Typeahead
				items={typeaheadItems}
				inputProps={{
					required: true,
					label: 'Required typeahead',
					name: 'typeaheadInputName'
				}}
			/>
		)
	)
	.addWithInfo(
		"search",
		() => (
			<Typeahead
				items={typeaheadItems}
				inputProps={{
					isSearch: true,
					label: 'Search-y typeahead',
					name: 'typeaheadInputName'
				}}
			/>
		)
	)
	.addWithInfo(
		"with icon",
		() => (
			<Typeahead
				items={typeaheadItems}
				inputProps={{
					iconShape: 'search',
					label: 'Typeahead with icon',
					name: 'typeaheadInputName'
				}}
			/>
		)
	)
	.addWithInfo(
		"multiple values",
		() => (
			<MultiselectTypeahead
				items={typeaheadCheckboxes}
				inputProps={{
					label: 'Multiselect typeahead',
					name: 'typeaheadInputName'
				}}
			/>
		)
	)
	.addWithInfo(
		"openOnFocus",
		() => (
			<Typeahead
				openOnFocus
				items={typeaheadItems}
				inputProps={{
					label: 'Labeled typeahead',
					name: 'typeaheadInputName'
				}}
			/>
		)
	)
	.addWithInfo(
		"openOnSelect",
		() => (
			<Typeahead
				openOnSelect
				items={typeaheadItems}
				inputProps={{
					label: 'Labeled typeahead',
					name: 'typeaheadInputName'
				}}
			/>
		)
	)
	.addWithInfo(
		"using itemToString (useful for value as Object)",
		() => (
			<Typeahead
				items={typeaheadItemsObjValues}
				itemToString={i => i ? i.name : ''}
				inputProps={{
					label: 'Labeled typeahead',
					name: 'typeaheadInputName'
				}}
			/>
		)
	);
