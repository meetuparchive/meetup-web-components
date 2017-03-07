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
	children: (props, propName, componentName) => {
		const expectedName = 'TabsTab';
		React.Children.forEach(props[propName], child => {
			if (typeof child === 'undefined' || child.type.name !== expectedName) {
				return new Error(`Children must be React elements of type ${expectedName}`);
			}
		});
	},
	full: React.PropTypes.bool,
	bordered: React.PropTypes.bool
};
