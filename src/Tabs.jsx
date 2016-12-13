import React from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

/**
 * @module TabsTab
 */
export class TabsTab extends React.Component {
	render() {
		const {
			url,
			label,
			isActive,
			...other
		} = this.props;

		const classNames = cx(
			'tabs-tab align--center atMedium_align--left',
			{'tabs-tab--selected': isActive}
		);

		return(
			<li
				className={classNames}
				{...other}>
				<Link
					role='menuitem'
					to={url}>
					{label}
				</Link>
			</li>
		);
	}
}

/**
 * @module Tabs
 */
export class Tabs extends React.Component {
	render() {
		const {
			children,
			className,
			bordered,
			...other
		} = this.props;

		const tabContainerClassNames = cx(
			className,
			'tabs-container',
			{
				'tabs-container--bordered': bordered
			}
		);

		return (
			<nav className={tabContainerClassNames}>
				<ul
					role='menu'
					{...other}>
					{children}
				</ul>
			</nav>
		);
	}
}
Tabs.propTypes = {
	children(props, propName, componentName) {
		const prop = props[propName];
		let error = null;
		React.Children.forEach(prop, child => {
			if (componentName !== 'TabsTab') {
				error = new Error(`Tabs: Expected child of type "TabsTab"; received "${componentName}"`);
			}
		});
		return error;
	}
};
