import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import withLoading from '../utils/components/withLoading';
import ConditionalWrap from '../utils/components/ConditionalWrap';

export const INLINEBLOCKLIST_SEPERATED_CLASS = 'inlineblockList--separated';

/**
 * @module InlineBlockListComponent
 */
export class InlineBlockListComponent extends React.Component {
	render() {
		const {
			className,
			items,
			separator,
			loadingProps = {}, // eslint-disable-line no-unused-vars
			isLoading,
			verticalAlign,
			...other
		} = this.props;

		const classNames = cx(
			'inlineblockList',
			{
				[INLINEBLOCKLIST_SEPERATED_CLASS]: separator,
			},
			className
		);

		const itemProps = {
			'data-separator': separator,
			style: { verticalAlign },
		};

		return (
			<ConditionalWrap
				condition={this.props.children && isLoading}
				wrap={children => (
					<div className="component--isLoading">
						{[children, this.props.children]}
					</div>
				)}
			>
				<ul className={classNames} {...other}>
					{items.map((item, key) => (
						<li key={key} {...itemProps}>
							{item}
						</li>
					))}
				</ul>
			</ConditionalWrap>
		);
	}
}

InlineBlockListComponent.propTypes = {
	/** Items to render into an inline list */
	items: PropTypes.arrayOf(
		PropTypes.oneOfType([PropTypes.element, PropTypes.string])
	).isRequired,

	/** The glyph that separates each item */
	separator: PropTypes.string,

	/** Whether the component is in a loading state */
	isLoading: PropTypes.bool,

	/** Props to pass to the `<Loading />` component */
	loadingProps: PropTypes.shape({
		color: PropTypes.string,
		scrimColor: PropTypes.string,
		size: PropTypes.string,
	}),

	/** The vertical alignment of all items within their container */
	verticalAlign: PropTypes.oneOf(['top', 'middle', 'bottom']),
};

export default withLoading(InlineBlockListComponent);
