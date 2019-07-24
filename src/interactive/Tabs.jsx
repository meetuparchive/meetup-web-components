import PropTypes from 'prop-types';
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
			className,
			isLeftSelectorLayout,
			...other
		} = this.props;
		const selectedClass = isLeftSelectorLayout
			? {
					'tabs-tab--selectedLeft': isSelected,
					'tabs-tab--notSelectedLeft': !isSelected,
			  }
			: { 'tabs-tab--selected': isSelected };

		const classNames = cx('tabs-tab', selectedClass, className);

		return (
			<li className={classNames} {...other}>
				{children}
			</li>
		);
	}
}
TabsTab.propTypes = {
	/** Whether the Tab is selected */
	isSelected: PropTypes.bool,

	/** Whether the Tabs selector is layed on left or right part*/
	isLeftSelectorLayout: PropTypes.bool,
};

/**
 * @module Tabs
 */
export class Tabs extends React.Component {
	render() {
		const {
			children,
			className,
			bordered, // eslint-disable-line no-unused-vars
			noBorder,
			full,
			isVertical,
			...other
		} = this.props;

		const ulClasses = cx('tabs', {
			'tabs--noBorder': noBorder,
			'tabs--full': full,
			'tabs--isVertical': isVertical,
		});

		return (
			<nav className={className}>
				<ul className={ulClasses} {...other}>
					{children}
				</ul>
			</nav>
		);
	}
}
Tabs.propTypes = {
	/** Individual tabs to render */
	children: (props, propName, componentName) => {
		const children = props[propName];

		if (React.Children.count(children) < 2) {
			return new Error('At least two children of type TabsTab required');
		}

		const validChildren = React.Children.map(
			children,
			child => child && child.type.name === 'TabsTab'
		).every(child => child);

		if (!validChildren) {
			return new Error('Children must be React elements of type TabsTab');
		}
	},

	/** Whether the Tabs bar spans the full width of it's container */
	full: PropTypes.bool,

	/** DEPRECATED */
	bordered: PropTypes.bool, // deprecating in favor of bordered being default

	/** Whether the Tabs bar excludes a bottom or right border */
	noBorder: PropTypes.bool,

	/** Whether the Tabs bar is layed out on the Y axis */
	isVertical: PropTypes.bool,
};
