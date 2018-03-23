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
					highlightedIndex,
				}) =>
				(<div className="typeahead">
					<TextInput
						className="typeahead-input"
						{...getInputProps({
							...inputProps
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
											})}
											key={`typeaheadItem-${i}`}
											className={cx(
												TA_ITEM_CLASSNAME,
												item.props.className,
												{
													'typeahead-item--isActive': highlightedIndex === i
												}
											)}
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
