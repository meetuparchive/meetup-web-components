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
		this.onItemKeyUp = this.onItemKeyUp.bind(this);

		this.state = {
			actualHighlightedIndex: 0
		};
	}

	onItemMouseEnter (i) {
		this.setState({actualHighlightedIndex: i});
	}

	onItemKeyUp(e) {
		switch (e.key) {
			case 'ArrowDown':
				this.setState({
					actualHighlightedIndex:
						parseInt(this.state.actualHighlightedIndex + 1) >= this.props.items.length
							?
								0
							:
								parseInt(this.state.actualHighlightedIndex+1)
				});
				break;
			case 'ArrowUp':
				this.setState({
					actualHighlightedIndex:
						this.state.actualHighlightedIndex < 1
							?
								0
							:
								parseInt(this.state.actualHighlightedIndex-1)
				});
				break;
		}
	}

	render() {
		const {
			inputProps,
			height,
			items,
			...other
		} = this.props;

		return (
			<Downshift {...other}>
				{({
					getInputProps,
					getItemProps,
					isOpen,
				}) =>
				(<div className="typeahead">
					<TextInput
						{...getInputProps({
							...inputProps,
							className: 'typeahead-input',
							onKeyUp: this.onItemKeyUp
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
														'typeahead-item--isActive': this.state.actualHighlightedIndex == i,
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

TextInput.propTypes = {
	inputProps: PropTypes.object,
	items: PropTypes.arrayOf(PropTypes.element),
	height: PropTypes.string
};

export default Typeahead;
