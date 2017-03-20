import React from 'react';
import cx from 'classnames';
import Chunk from './Chunk';
import Flex from './Flex';
import FlexItem from './FlexItem';
import Section from './Section';

export const PAGE_HEAD_CLASS = 'pageHead';
export const PAGE_TITLE_CLASS = 'pageTitle';
export const PAGE_TITLELABEL_CLASS = 'pageTitleLabel';
export const PAGE_SUBTITLE_CLASS = 'pageSubtitle';
export const PAGE_ACTIONS_CLASS = 'pageActions';
export const PAGE_ACTION_CLASS = 'pageAction';

/**
 * @description   Design System Component: `PageHead` creates a
 * header, and subtitle container for pages, and provides an optional Flex
 * side menu. The side menu can contain any number of items which
 * appropriately adjusts to stacked or column view.
 * @module PageHead
 */
class PageHead extends React.Component {
	render() {
		const {
			children,
			className,
			subtitle,
			title,
			titleLabel,
			titleLabelClass,
			menuItems,
			...other
		} = this.props;

		const classNames = cx(
			PAGE_HEAD_CLASS,
			className
		);

		const titleLabelClassNames = cx(
			PAGE_TITLELABEL_CLASS,
			titleLabelClass
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
					switchDirection='large'
				>
					<FlexItem>
						<Chunk className='align--center atMedium_align--left'>
							{titleLabel &&
								<p className={`${titleLabelClassNames} text--label`}>{titleLabel}</p>
							}
							<h1 className='text--display1'>{title}</h1>
							{subtitle &&
								<p className={`${PAGE_SUBTITLE_CLASS} text--secondary`}>{subtitle}</p>
							}
						</Chunk>
					</FlexItem>
					{menuItems.length > 0 &&
						<FlexItem shrink>
							<Flex justify='center' className={PAGE_ACTIONS_CLASS}>
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
	titleLabel: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.element
	]),
	titleLabelClass: React.PropTypes.string,
	menuItems: React.PropTypes.array,
};
PageHead.defaultProps = {
	menuItems: []
};

export default PageHead;
