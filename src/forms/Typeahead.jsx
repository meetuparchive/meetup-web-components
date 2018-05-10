import PropTypes from 'prop-types';
import React from 'react';
import Downshift from 'downshift';
import cx from 'classnames';

import TextInput from './TextInput';

export const TA_DROPDOWN_CLASSNAME = 'typeahead-dropdown';
export const TA_ITEM_CLASSNAME = 'typeahead-item';

const defaultItemToString = itemValue => (typeof itemValue === 'string' ? itemValue : '');

/**
 * @module Typeahead
 */
class Typeahead extends React.PureComponent {
	constructor(props) {
		super(props);

		this.handleSelection = this.handleSelection.bind(this);
		// this.handleSingleSelection = this.handleSingleSelection.bind(this);
		// this.handleMultiselectSelect = this.handleMultiselectSelect.bind(this);
		this.stateReducer = this.stateReducer.bind(this);
	}

	// handleMultiselectSelect(item) {
	// 	this.props.onSelect(item, [...this.props.multiSelectValues, item]);
	// }

	// handleSingleSelection(selectedItem, stateAndHelpers) {
	// 	!this.props.multiSelect && this.props.onSelect && this.props.onSelect(selectedItem, stateAndHelpers);
	// }

	handleSelection(selectedItem, stateAndHelpers) {
		if(this.props.multiSelect) {
			this.props.onSelect(selectedItem, [...this.props.multiSelectValues, selectedItem]);
		} else {
			this.props.onSelect && this.props.onSelect(selectedItem, stateAndHelpers);
		}
	}

	stateReducer(state, changes) {
		switch (changes.type) {
			case Downshift.stateChangeTypes.keyDownEnter:
			case Downshift.stateChangeTypes.clickItem:
				this.handleSelection(changes.selectedItem);

				return {
					...changes,
					selectedItem: this.props.multiSelectValues ? this.props.multiSelectValues : changes.selectedItem,
					isOpen: this.props.openOnFocus,
				};

			case Downshift.stateChangeTypes.blurInput:
				return {
					...changes,
					isOpen: this.props.openOnFocus,
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
			itemToString,
			...other
		} = this.props;

		delete other.onSelect;

		return (
			<Downshift
				onSelect={this.handleSelection}
				selectedItem={multiSelectValues}
				stateReducer={openOnFocus && this.stateReducer}
				itemToString={itemToString}
				{...other}
			>
				{({
					getInputProps,
					getItemProps,
					isOpen,
					highlightedIndex,
					selectedItem,
					openMenu
				}) =>
				(<div className="typeahead">
					<TextInput
						{...getInputProps({
							...inputProps,
							className: 'typeahead-input',
							onFocus: openOnFocus && openMenu
						})}
					/>
					{Boolean(isOpen && items && items.length)
						&&
							<div
								className={TA_DROPDOWN_CLASSNAME}
								style={height && {
									height: height,
									overflowY: 'scroll'
								}}
								>
								{items &&
									items.map((item, i) => {
										const selected = multiSelect && selectedItem && selectedItem.includes(item.props.value);

										return (
											<div
												{...getItemProps({
													item: item.props.value,
													i,
													key: `typeaheadItem-${i}`,
													id: `typeaheadItem-${i}`,
													className: cx(
														TA_ITEM_CLASSNAME,
														item.props.className,
														{
															'typeahead-item--isActive': highlightedIndex == i,
														}
													),
													...item.props
												})}
											>
												{
													typeof item.props.children === 'function'
														? item.props.children({ isSelected: selected })
														: item.props.children
												}
											</div>
										);}
									)
								}
							</div>
					}
				</div>)}
			</Downshift>
		);
	}
}

Typeahead.defaultProps = {
	itemToString: defaultItemToString
};

Typeahead.propTypes = {
	inputProps: PropTypes.object,
	items: PropTypes.arrayOf(PropTypes.element),
	itemToString: PropTypes.func,
	height: PropTypes.string
	// add multiselect and openOnFocus proptypes
	// add something for onSelect that makes it required if multiSelect is true
};

export default Typeahead;
