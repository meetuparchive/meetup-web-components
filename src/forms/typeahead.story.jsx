import React from "react";
import { storiesOf } from "@storybook/react";
import { decorateWithBasics } from '../utils/decorators';

import Typeahead from './Typeahead';
import TypeaheadItem from './TypeaheadItem';

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
				inputProps={{
					label: 'Labeled typeahead',
					name: 'typeaheadInputName'
				}}
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
						label: 'Labeled typeahead',
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
					label: 'Labeled typeahead',
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
					label: 'Labeled typeahead',
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
					label: 'Labeled typeahead',
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
					label: 'Labeled typeahead',
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
					label: 'Labeled typeahead',
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
	)
	;
