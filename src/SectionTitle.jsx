import React from 'react';
import cx from 'classnames';
import {
	Chunk,
	Flex,
	FlexItem,
} from './layoutUtils';

/**
 * @module SectionTitle
 */
class SectionTitle extends React.Component {
	render() {
		const {
			children,
			className,
			title,
			...other
		} = this.props;

		const classNames = cx(
			'sectionTitle',
			className
		);

		return (
			<Flex
				className={classNames}
				{...other}
				>
				<FlexItem>
					<Chunk>
						<h2 className='text--display2'>{title}</h2>
					</Chunk>
				</FlexItem>
				{children &&
					<FlexItem shrink>
						{children}
					</FlexItem>
				}
			</Flex>
		);
	}
}

SectionTitle.propTypes = {
};

export default SectionTitle;
