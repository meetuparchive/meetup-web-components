import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import withLoading from '../utils/components/withLoading';
import ConditionalWrap from '../utils/components/ConditionalWrap';

export const INLINEBLOCKLIST_SEPERATED_CLASS = 'inlineblockList--separated';

/**
 * @module InlineBlockList
 */
export class InlineBlockList extends React.Component {
	render() {
		const {
			className,
			items,
			separator,
			loadingProps = {}, // eslint-disable-line no-unused-vars
			isLoading,
			loadingComponent,
			verticalAlign,
			...other
		} = this.props;

		const classNames = cx(
			'inlineblockList',
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
			<ConditionalWrap
				condition={isLoading}
				wrap={children => <div className={isLoading && 'component--isLoading'}>{children}</div>}
			>
				<ul
					className={classNames}
					{...other}
				>
					{items.map((item, key) =>
						<li key={key} {...itemProps}>{item}</li>
					)}
				</ul>
				{loadingComponent}
			</ConditionalWrap>
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
	isLoading: PropTypes.bool,
	loadingProps: PropTypes.shape({
		color: PropTypes.string,
		scrimColor: PropTypes.string,
		size: PropTypes.string
	}),
	verticalAlign: PropTypes.oneOf(['top', 'middle', 'bottom']),
};

export default withLoading(InlineBlockList);
