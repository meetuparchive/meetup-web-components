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
			menu,
			flushBottom,
			...other
		} = this.props;

		const classNames = cx(
			'pageHead',
			{
				'flush--bottom': flushBottom
			},
			className
		);

		return (
			<Section
				className={classNames}
				{...other}
			>
				<Flex
					className='pageTitle'
					direction='column'
					switchDirection='medium'
				>
					<FlexItem>
						<Chunk className='align--center atMedium_align--left'>
							<h1 className='text--display1'>{title}</h1>
							{subtitle &&
								<p className='text--secondary'>{subtitle}</p>
							}
						</Chunk>
					</FlexItem>
					{menu &&
						<FlexItem shrink>
							{menu}
						</FlexItem>
					}
				</Flex>
				{children}
			</Section>
		);
	}
}

PageHead.propTypes = {
	title: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.element
	]).isRequired,
	subtitle: React.PropTypes.element,
	menu: React.PropTypes.element,
	flushBottom: React.PropTypes.bool,
};

export default PageHead;
