import React from 'react';
import cx from 'classnames';

/**
 * @module TabsTab
 */
export class TabsTab extends React.Component {
	render() {
		const {
			children,
			isSelected,
			...other
		} = this.props;

		const classNames = cx(
			'tabs-tab align--center',
			{'tabs-tab--selected': isSelected}
		);

		return (
			<li className={classNames} {...other}>
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
	render() {
		const {
			children,
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
					{children}
				</ul>
			</nav>
		);
	}
}
Tabs.propTypes = {
	children: React.PropTypes.arrayOf(
		React.PropTypes.instanceOf(TabsTab)
	).isRequired,
	full: React.PropTypes.bool,
	bordered: React.PropTypes.bool,
};
