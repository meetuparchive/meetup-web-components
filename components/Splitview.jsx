import React from 'react';
import cx from 'classnames';
import {
	//Chunk,
	Flex,
	FlexItem,
	//Section,
} from './layoutUtils';

/**
 * @module Splitview
 */
class Splitview extends React.Component {
	render() {
		const {
			children,
			className,
			list,
			detail,
			focus,
			...other
		} = this.props;

		const classNames = cx(
			'splitview',
			{
				[`splitview--focus-${focus}`]: typeof focus === 'string',
			},
			className
		);

		return (
			<Flex
				noGutters
				className={classNames}
				{...other}>
					<FlexItem shrink className="splitview-list">
						<div className="splitview-listwrap">
							{list}
						</div>
					</FlexItem>
					<FlexItem className="splitview-detail">
						{detail}
					</FlexItem>
					{children}
			</Flex>
		);
	}
}

Splitview.propTypes = {
};

export default Splitview;
