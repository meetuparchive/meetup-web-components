import React from 'react';
import cx from 'classnames';

/**
 * @module TabsTab
 */
export class TabsTab extends React.Component {
	render() {
		const {
			isSelected,
			children,
			className,
			...other
		} = this.props;

		const classNames = cx(
			className,
			'tabs-tab align--center atMedium_align--left',
			{'tabs-tab--selected': isSelected}
		);

		return (
			<li
				className={classNames}
				{...other}
			>
				{children}
			</li>
		);
	}
}
TabsTab.propTypes = {
	isSelected: React.PropTypes.bool
};

/**
 * @module Tabs
 */
export class Tabs extends React.Component {
	renderTabs(tabs) {
		return tabs.map((tab, i) => {
			return (
				<TabsTab
					key={i}
					isSelected={tab.props.isSelected}
				>
				{tab.props.children}
				</TabsTab>
			);
		});
	}
	render() {
		const {
			tabs,
			className,
			bordered,
			full,
			...other
		} = this.props;

		const ulClasses = cx(
			'tabs',
			{
				'tabs--bordered': bordered,
				'tabs--full': full,
			}
		);

		return (
			<nav className={className}>
				<ul
					className={ulClasses}
					{...other}
				>
					{this.renderTabs(tabs)}
				</ul>
			</nav>
		);
	}
}
Tabs.propTypes = {
	tabs: React.PropTypes.arrayOf(
		React.PropTypes.element
	).isRequired,
	full: React.PropTypes.bool,
	bordered: React.PropTypes.bool,
};
