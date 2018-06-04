import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

/**
 * @module TabsTab
 */
export class TabsTab extends React.Component {
	render() {
		const { children, isSelected, className, ...other } = this.props;

		const classNames = cx(
			'tabs-tab',
			{ 'tabs-tab--selected': isSelected },
			className
		);

		return (
			<li className={classNames} {...other}>
				{children}
			</li>
		);
	}
}
TabsTab.propTypes = {
	isSelected: PropTypes.bool,
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
	children: (props, propName, componentName) => {
		const children = props[propName];

		if (React.Children.count(children) < 2) {
			return new Error('At least two children of type TabsTab required');
		}

		const validChildren = React.Children
			.map(children, child => child && child.type.name === 'TabsTab')
			.every(child => child);

		if (!validChildren) {
			return new Error('Children must be React elements of type TabsTab');
		}
	},
	full: PropTypes.bool,
	bordered: PropTypes.bool, // deprecating in favor of bordered being default
	noBorder: PropTypes.bool,
};
