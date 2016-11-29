import React from 'react';
import cx from 'classnames';
import {
	// Chunk,
	// Flex,
	FlexItem,
	// Section,
} from './layoutUtils';

/**
 * @module PageAction
 */
class PageAction extends React.Component {
	render() {
		const {
			children,
			className,
			...other
		} = this.props;


		const classNames = cx(
			'pageAction',
			className,
		);

		return (
			<FlexItem
				className={classNames}
				shrink
				{...other}>
					{children}
			</FlexItem>
		);
	}
}

PageAction.propTypes = {
};

export default PageAction;
