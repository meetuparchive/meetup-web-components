// @flow

import React from 'react';
import cx from 'classnames';

import withLoading from '../utils/components/withLoading';
import ConditionalWrap from '../utils/components/ConditionalWrap';

export const INLINEBLOCKLIST_SEPERATED_CLASS = 'inlineblockList--separated';

type Props = {
	/** Items to render into an inline list */
	items: Array<React$Element<*> | string>,

	/** The glyph that separates each item */
	separator?: string,

	/** Whether the component is in a loading state */
	isLoading?: boolean,

	/** Props to pass to the `<Loading />` component */
	loadingProps?: {
		color?: string,
		scrimColor?: string,
		size?: MediaSizes,
	},

	/** Nearest DOM element's class name */
	className?: string,

	/** The vertical alignment of all items within their container */
	verticalAlign: 'top' | 'middle' | 'bottom',

	/** The child elements of the component */
	children: React$Node,
};
/**
 * @module InlineBlockListComponent
 */
export class InlineBlockListComponent extends React.Component<Props> {
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

const InlineBlockList = withLoading(InlineBlockListComponent);
InlineBlockList.displayName = 'InlineBlockList';
export default InlineBlockList;
