import React from 'react';
import cx from 'classnames';
import Chunk from './Chunk';
import Flex from './Flex';
import FlexItem from './FlexItem';
import Section from './Section';

export const PAGE_HEAD_CLASS = 'pageHead';
export const PAGE_TITLE_CLASS = 'pageTitle';
export const PAGE_ACTIONS_CLASS = 'pageActions';
export const PAGE_ACTION_CLASS = 'pageAction';

/**
 * @module PageHead
 * @description  Creates a header, and subtitle container for pages,
 * and provides an optional Flex side menu. The side menu can contain
 * any number of items which appropriately adjusts to stacked or column view
 */
class PageHead extends React.Component {
	render() {
		const {
			children,
			className,
			subtitle,
			title,
			menuItems,
			...other
		} = this.props;

		const classNames = cx(
			PAGE_HEAD_CLASS,
			className
		);

		const menuRender = menuItems.map((menuItem, i) => (
			<FlexItem className={PAGE_ACTION_CLASS} key={i} shrink>
				{menuItem}
			</FlexItem>
		));

		return (
			<Section
				className={classNames}
				{...other}
			>
				<Flex
					className={PAGE_TITLE_CLASS}
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
					{Boolean(menuItems.length) &&
						<FlexItem shrink>
							<Flex justify='around' className={PAGE_ACTIONS_CLASS}>
								{menuRender}
							</Flex>
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
	subtitle: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.element
	]),
	menuItems: React.PropTypes.array,
};
PageHead.defaultProps = {
	menuItems: []
};

export default PageHead;
