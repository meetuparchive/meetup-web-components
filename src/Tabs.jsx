import React from 'react';
import cx from 'classnames';

/**
 * @module TabsListTab
 *
 * Direct child of `TabsList`.
 * Renders individual tab control.
 * Accepts a `selected` prop.
 */
export const TabsListTab = React.createClass({
	propTypes: {
		selected: React.PropTypes.bool,
		onClick: React.PropTypes.func,
	},
	defaultProps: {
		selected: false
	},
	render() {
		const {
			children,
			className,
			selected,
			onClick,
			tabsRef,
			tabsIndex,
			...other
		} = this.props;

		const classNames = cx(
			'tabs-tab',
			{
				'tabs-tab--selected': selected
			},
			className
		);

		return (
			<li
				role='tab'
				id={`${tabsRef}_tab_${tabsIndex}`}
				aria-controls={`${tabsRef}_panel_${tabsIndex}`}
				onClick={onClick}
				className={classNames} {...other}>
				{children}
			</li>
		);
	}
});

/**
 * @module TabsList
 * Direct child of `Tabs`.
 * Renders a `nav` and `ul` to contain tab conrols
 */
export const TabsList = React.createClass({
	propTypes: {
		full: React.PropTypes.bool
	},
	defaultProps: {
		full: false
	},
	renderChildren() {
		const { tabsRef, children } = this.props;

		return React.Children.map(children, (kid, index) => {
			// pass `tabsRef` prop to list and panel children
			if (kid.type === TabsListTab) {
				return React.cloneElement(kid, { tabsRef: tabsRef, tabsIndex: index });
			} else {
				return new Error('Children of TabsList must be of type: "TabsListTab"');
			}
		});
	},
	render() {
		const {
			className,
			full,
			...other
		} = this.props;

		const classNames = cx(
			'tabs',
			{
				'tabs--full': full
			},
			className
		);

		return (
			<nav className='chunk'>
				<ul role='tablist' className={classNames} {...other}>
					{this.renderChildren()}
				</ul>
			</nav>
		);
	}
});

/**
 * @module TabsPanel
 * Direct child of `Tabs`.
 * Contains panel content rendered under `TabsList`.
 * a `TabsPanel` is visible when the `selected` prop is passed.
 */
export const TabsPanel = React.createClass({
	propTypes: {
		id: React.PropTypes.string.isRequired,
		ariaLabelledBy: React.PropTypes.string.isRequired,
		selected: React.PropTypes.bool
	},
	defaultProps: {
		selected: false
	},
	render() {
		const {
			children,
			className,
			selected,
			tabsRef,
			tabsIndex,
			...other
		} = this.props;

		const classNames = cx(
			'tabs-panel',
			{
				'display--none': !selected
			},
			className
		);

		return (
			<div
				role='tabpanel'
				id={`${tabsRef}_panel_${tabsIndex}`}
				aria-lablledby={`${tabsRef}_tab_${tabsIndex}`}
				className={classNames} {...other}>
				{children}
			</div>
		);
	}
});

/**
 * @module Tabs
 * @see {@link http://meetup.github.io/sassquatch2/ui_components.html#tabs}
 * Parent for composite Tabs component
 *
 * The `tabsRef` prop provides a unique identifier for providing aria attributes
 */
export const Tabs = React.createClass({
	propTypes: {
		tabsRef: React.PropTypes.string.isRequired,
	},
	renderChildren() {
		const { tabsRef, children } = this.props;

		return React.Children.map(children, (kid, index) => {
			// pass `tabsRef` prop to list and panel children
			if (kid.type === TabsList || kid.type === TabsPanel) {
				return React.cloneElement(kid, { tabsRef: tabsRef, tabsIndex: index });
			} else {
				return kid;
			}
		});
	},
	render() {
		const {
			className,
			...other
		} = this.props;

		return (
			<div className={className} {...other}>
				{this.renderChildren()}
			</div>
		);
	}
});
