import React from 'react';
import cx from 'classnames';
import Chunk from './Chunk';
import Flex from './Flex';
import FlexItem from './FlexItem';

export const SECTIONTITLE_CLASS = 'sectionTitle';
/**
 * @module SectionTitle
 */
class SectionTitle extends React.Component {
	render() {
		const {
			action,
			className,
			title,
			...other
		} = this.props;

		const classNames = cx(
			SECTIONTITLE_CLASS,
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
				{action &&
					<FlexItem shrink>
						<Chunk>
							{action}
						</Chunk>
					</FlexItem>
				}
			</Flex>
		);
	}
}
SectionTitle.propTypes = {
	title: React.PropTypes.oneOfType([
		React.PropTypes.element,
		React.PropTypes.string
	]).isRequired,
	action: React.PropTypes.element
};

export default SectionTitle;
