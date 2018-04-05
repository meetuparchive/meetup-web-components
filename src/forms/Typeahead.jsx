import PropTypes from 'prop-types';
import React from 'react';
import Downshift from 'downshift';
import cx from 'classnames';

import TextInput from './TextInput';

export const TA_DROPDOWN_CLASSNAME = 'typeahead-dropdown';
export const TA_ITEM_CLASSNAME = 'typeahead-item';

/**
 * @module Typeahead
 */
class Typeahead extends React.PureComponent {
	constructor(props) {
		super(props);
		this.onItemMouseEnter = this.onItemMouseEnter.bind(this);
		this.stateReducer = this.stateReducer.bind(this);

		this.state = {
			highlightedIndex: -1
		};
	}

	onItemMouseEnter (i) {
		this.setState({highlightedIndex: i});
	}

	stateReducer(state, changes) {
		let highlightedIndexState;

		switch (changes.type) {
			case Downshift.stateChangeTypes.keyDownArrowDown:
				highlightedIndexState =
					parseInt(this.state.highlightedIndex + 1) >= this.props.items.length
						?
							0
						:
							parseInt(this.state.highlightedIndex+1);
					this.setState({
						highlightedIndex: highlightedIndexState
					});
				break;
			case Downshift.stateChangeTypes.keyDownArrowUp:
				highlightedIndexState =
					this.state.highlightedIndex < 1
						?
							parseInt(this.props.items.length-1)
						:
							parseInt(this.state.highlightedIndex-1);
					this.setState({
						highlightedIndex: highlightedIndexState
					});
				break;
		}

		return {
			...changes,
			highlightedIndex: highlightedIndexState
		};

	}

	render() {
		const {
			inputProps,
			height,
			items,
			...other
		} = this.props;

		return (
			<Downshift
				stateReducer={this.stateReducer}
				{...other}
			>
				{({
					getInputProps,
					getItemProps,
					isOpen,
				}) =>
				(<div className="typeahead">
					<TextInput
						{...getInputProps({
							...inputProps,
							className: 'typeahead-input'
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
									items.map((item, i) => (
										<div
											{...getItemProps({
												item: item.props.value,
												i,
												key: `typeaheadItem-${i}-${Date.now()}`,
												id: `typeaheadItem-${i}-${Date.now()}`,
												onMouseMove: () => {this.onItemMouseEnter(i);},
												className: cx(
													TA_ITEM_CLASSNAME,
													item.props.className,
													{
														'typeahead-item--isActive': this.state.highlightedIndex == i,
													}
												)
											})}
										>
											{item.props.children}
										</div>
									))
								}
							</div>
					}
				</div>)}
			</Downshift>
		);
	}
}

Typeahead.propTypes = {
	inputProps: PropTypes.object,
	items: PropTypes.arrayOf(PropTypes.element),
	height: PropTypes.string
};

export default Typeahead;
