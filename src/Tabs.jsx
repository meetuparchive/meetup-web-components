import React from 'react';
import cx from 'classnames';
import TabsTab from './TabsTab';

/**
 * @module Tabs
 */
class Tabs extends React.Component {
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
					role='menu'
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
	full: React.PropTypes.bool,
	bordered: React.PropTypes.bool,
	children(props, propName, componentName) {
		const prop = props[propName];
		let error = null;
		React.Children.forEach(prop, child => {
			if (child.type !== TabsTab) {
				error = new Error(`Tabs: Expected child of type "TabsTab"; received "${child.type.displayName}"`);
			}
		});
		return error;
	}
};

export default Tabs;
