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
			full,
			...other
		} = this.props;

		const classNames = cx(
			className,
			'tabs',
			{
				'tabs--bordered': bordered
			},
			{
				'tabs--full': full
			}
		);

		return (
			<nav className={classNames}>
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
	full: React.PropTypes.bool,
	bordered: React.PropTypes.bool,
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
