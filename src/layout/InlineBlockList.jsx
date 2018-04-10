import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

export const INLINEBLOCKLIST_CLASS = 'inlineblockList';
export const INLINEBLOCKLIST_SEPERATED_CLASS = 'inlineblockList--separated';

/**
 * @module InlineBlockList
 */
class InlineBlockList extends React.Component {
	render() {
		const {
			className,
			items,
			separator,
			verticalAlign,
			...other
		} = this.props;

		const classNames = cx(
			INLINEBLOCKLIST_CLASS,
			{
				[INLINEBLOCKLIST_SEPERATED_CLASS]: separator
			},
			className
		);

		const itemProps = {
			'data-separator': separator,
			style: {verticalAlign},
		};

		return (
			<ul
				className={classNames}
				{...other}
			>
				{items.map((item, key) =>
					<li key={key} {...itemProps}>{item}</li>
				)}
			</ul>
		);
	}
}

InlineBlockList.propTypes = {
	items: PropTypes.arrayOf(
		PropTypes.oneOfType([
			PropTypes.element,
			PropTypes.string
		])
	).isRequired,
	separator: PropTypes.string,
	verticalAlign: PropTypes.oneOf(['top', 'middle', 'bottom']),
};

export default InlineBlockList;
