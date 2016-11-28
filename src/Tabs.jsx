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
		id: React.PropTypes.string.isRequired,
		ariaControls: React.PropTypes.string.isRequired,
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
			id,
			ariaControls,
			selected,
			onClick,
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
				id={id}
				aria-controls={ariaControls}
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
	render() {
		const {
			children,
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
					{children}
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
			id,
			ariaLabelledBy,
			selected,
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
				id={id}
				aria-lablledby={ariaLabelledBy}
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
 */
export const Tabs = React.createClass({
	render() {
		const {
			children,
			className,
			...other
		} = this.props;

		return (
			<div className={className} {...other}>
				{children}
			</div>
		);
	}
});
