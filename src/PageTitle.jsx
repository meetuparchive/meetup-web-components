import React from 'react';
import cx from 'classnames';
import Chunk from './Chunk';
import Flex from './Flex';
import FlexItem from './FlexItem';

/**
 * @module PageTitle
 */
class PageTitle extends React.Component {
	render() {
		const {
			children,
			className,
			subtitle,
			title,
			...other
		} = this.props;

		const classNames = cx(
			'pageTitle',
			className
		);

		return (
			<Flex
				className={classNames}
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
		);
	}
}

PageTitle.propTypes = {
};

export default PageTitle;
