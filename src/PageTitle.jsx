import React from 'react';
import cx from 'classnames';
import {
	Chunk,
	Flex,
	FlexItem,
} from './layoutUtils';

/**
 * @module PageTitle
 */
class PageTitle extends React.Component {
	render() {
		const {
			children,
			className,
			subTitle,
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
				switchDirection='atMedium'
				{...other}
				>
				<FlexItem>
					<Chunk className='align--center atMedium_align--left'>
						<h1 className='text--display1'>{title}</h1>
						{subTitle &&
							<p className='text--secondary'>{subTitle}</p>
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
