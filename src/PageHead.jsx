import React from 'react';
import cx from 'classnames';
import {
	// Chunk,
	Flex,
	// FlexItem,
	Section,
} from './layoutUtils';

/**
 * @module PageHead
 */
class PageHead extends React.Component {
	render() {
		const {
			children,
			className,
			...other
		} = this.props;

		const classNames = cx(
			'pageHead',
			className
		);

		return (
			<Section
				className={classNames}
				{...other}>
					<Flex
						direction='column'
						switchDirection='atMedium'
						>
						{children}
					</Flex>
			</Section>
		);
	}
}

PageHead.propTypes = {
};

export default PageHead;
