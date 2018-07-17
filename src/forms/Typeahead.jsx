import PropTypes from 'prop-types';
import React from 'react';
import Downshift from 'downshift';
import cx from 'classnames';

import TextInput from './TextInput';

export const TA_DROPDOWN_CLASSNAME = 'typeahead-dropdown';
export const TA_ITEM_CLASSNAME = 'typeahead-item';

const defaultItemToString = itemValue => (typeof itemValue === 'string' ? itemValue : '');

/**
 * @module typeahead
 */
class Typeahead extends React.PureComponent {
	constructor(props) {
		super(props);

		this.handleSelection = this.handleSelection.bind(this);
		this.stateReducer = this.stateReducer.bind(this);
	}

	/**
	 * @description calls onSelect prop, but passes a selectedItem along with the
	 * value of the `multiSelectValue` prop for multiselection
	 * @parm {(object|string|array)} selectedItem - the previously selected item
	 * @parm {object} stateAndHelpers - Downshift's internal state
	 * @returns undefined
	 */
	handleSelection(selectedItem, stateAndHelpers) {
		if (this.props.multiSelect) {
			this.props.onSelect(selectedItem, [
				...this.props.multiSelectValues,
				selectedItem,
			]);
		} else {
			this.props.onSelect && this.props.onSelect(selectedItem, stateAndHelpers);
		}
	}

	/**
	 * @parm {object} state - Downshift's internal state
	 * @parm {object} changes - Changes in Downshift's internal state
	 * @returns {object} changes - Changes being passed to Downshift's internal state
	 */
	stateReducer(state, changes) {
		switch (changes.type) {
			case Downshift.stateChangeTypes.keyDownEnter:
			case Downshift.stateChangeTypes.clickItem:
				this.handleSelection(changes.selectedItem);

				return {
					...changes,
					selectedItem: this.props.multiSelectValues
						? this.props.multiSelectValues
						: changes.selectedItem,
					isOpen: this.props.openOnSelect,
				};

			case Downshift.stateChangeTypes.blurInput:
				return {
					...changes,
					isOpen: this.props.openOnSelect,
				};

			default:
				return changes;
		}
	}

	render() {
		const {
			inputProps,
			height,
			items,
			multiSelect,
			multiSelectValues,
			openOnFocus,
			openOnSelect,
			openInline,
			itemToString,
			onSelect, // eslint-disable-line no-unused-vars
			...other
		} = this.props;

		return (
			<Downshift
				onSelect={this.handleSelection}
				selectedItem={multiSelectValues}
				stateReducer={openOnSelect && this.stateReducer}
				itemToString={itemToString}
				{...other}
			>
				{({
					getInputProps,
					getItemProps,
					isOpen,
					highlightedIndex,
					selectedItem,
					openMenu,
				}) => (
					<div className="typeahead">
						<TextInput
							{...getInputProps({
								...inputProps,
								className: 'typeahead-input',
								onFocus: openOnFocus && openMenu,
							})}
						/>
						{Boolean(isOpen && items && items.length) && (
							<ul
								className={cx(TA_DROPDOWN_CLASSNAME, {
									[`${TA_DROPDOWN_CLASSNAME}--inline`]: openInline,
								})}
								role="list"
								style={
									height && {
										height: height,
										overflowY: 'scroll',
									}
								}
							>
								{items &&
									items.map((item, i) => {
										const selected =
											multiSelect &&
											selectedItem &&
											selectedItem.includes(item.props.value);

										return (
											<li
												role="listitem"
												{...getItemProps({
													item: item.props.value,
													i,
													key: `typeaheadItem-${i}`,
													id: `typeaheadItem-${i}`,
													className: cx(
														TA_ITEM_CLASSNAME,
														item.props.className,
														{
															'typeahead-item--isActive':
																highlightedIndex == i,
														}
													),
													...item.props,
												})}
											>
												{typeof item.props.children === 'function'
													? item.props.children({
															isSelected: selected,
													  })
													: item.props.children}
											</li>
										);
									})}
							</ul>
						)}
					</div>
				)}
			</Downshift>
		);
	}
}

Typeahead.defaultProps = {
	itemToString: defaultItemToString,
};

Typeahead.propTypes = {
	/** Props to pass to the TextInput */
	inputProps: PropTypes.object,

	/** List of items to render into the dropdown menu area */
	items: PropTypes.arrayOf(PropTypes.element),

	/** A function to pass to Typeahead to make sure all item values are strings */
	itemToString: PropTypes.func,

	/** Height of the dropdown menu of selectable items */
	height: PropTypes.string,

	/** Whether there can be more than one selected value */
	multiSelect: PropTypes.bool,

	/** Whether the dropdown menu shows when the TextInput is focused */
	openOnFocus: PropTypes.bool,

	/** Whether the dropdown menu remains open after an item is selected */
	openOnSelect: PropTypes.bool,

	/** Whether the dropdown menu opens in document flow */
	openInline: PropTypes.bool,

	/** A callback that happens when an item is selected from the dropdown menu */
	onSelect: (props, propName, componentName) => {
		if (props['multiSelect'] && !props[propName]) {
			return new Error(
				`${propName} handler must be passed to ${componentName} when 'multiSelect' is passed`
			);
		}
	},
};

export default Typeahead;
