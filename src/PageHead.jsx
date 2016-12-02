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
	getChildContext() {
		const { children } = this.props;
		const checkForTabs = (element) => {
			return element.type.name === 'Tabs';
		};

		return {
			pageHeadTabs: children.some(checkForTabs)
		};
	}

	renderTabs() {
		let tabs;
		React.Children.forEach(this.props.children, function(child){
			if (child.type.name === 'Tabs') {
				tabs = React.cloneElement(child);
			}
		}.bind(this));
		return tabs;
	}

	renderTitle() {
		let title;
		React.Children.forEach(this.props.children, function(child){
			if (child.type.name === 'PageTitle') {
				title = React.cloneElement(child);
			}
		}.bind(this));
		return title;
	}

	renderActions() {
		let actions;
		React.Children.forEach(this.props.children, function(child){
			if (child.type.name === 'PageActions') {
				actions = React.cloneElement(child);
			}
		}.bind(this));
		return actions;
	}

	render() {
		const {
			children,
			className,
			...other
		} = this.props;

		const checkForTabs = (element) => {
			return element.type.name === 'Tabs';
		};

		const classNames = cx(
			'pageHead',
			{
				'flush--bottom': children.some(checkForTabs)
			},
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
						{this.renderTitle()}
						{this.renderActions()}
					</Flex>
					{this.renderTabs()}
			</Section>
		);
	}
}

PageHead.childContextTypes = {
	pageHeadTabs: React.PropTypes.bool,
};

PageHead.propTypes = {
};

export default PageHead;
