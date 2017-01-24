import React from 'react';
import cx from 'classnames';
import Chunk from './Chunk';
import Flex from './Flex';
import FlexItem from './FlexItem';
import Section from './Section';

/**
 * @module PageHead
 */
class PageHead extends React.Component {
	render() {
		const {
			children,
			className,
			subtitle,
			title,
			tabs,
			...other
		} = this.props;

		const classNames = cx(
			'pageHead',
			{
				'flush--bottom': tabs
			},
			className
		);

		return (
			<Section
				className={classNames}
				{...other}>
				<Flex
					className='pageTitle'
					direction='column'
					switchDirection='medium'
					{...other}
					>
					<FlexItem>
						<Chunk className='align--center atMedium_align--left'>
							<h1 className='text--display1'>{title}</h1>
							{subtitle &&
								<p className='text--secondary'>{subtitle}</p>
							}
						</Chunk>
					</FlexItem>
					{children &&
						<FlexItem shrink>
							{children}
						</FlexItem>
					}
				</Flex>
				{tabs}
			</Section>
		);
	}
}

PageHead.propTypes = {
	title: React.PropTypes.element.isRequired,
	subtitle: React.PropTypes.element,
};

export default PageHead;
