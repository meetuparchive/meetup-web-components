import React from 'react';
import cx from 'classnames';
import Chunk from './Chunk';
import Flex from './Flex';
import FlexItem from './FlexItem';

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
				align='center'
				className={classNames}
				{...other}
				>
				<FlexItem>
					<Chunk>
						<h2 className='text--display2'>{title}</h2>
					</Chunk>
				</FlexItem>
				{children &&
					<Chunk>
						<FlexItem shrink
							>
							{children}
						</FlexItem>
					</Chunk>
				}
			</Flex>
		);
	}
}

SectionTitle.propTypes = {
};

export default SectionTitle;
