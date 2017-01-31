import React from 'react';
import cx from 'classnames';

/**
 * @module Tabs
 */
class Tabs extends React.Component {
	renderTabs() {
		const tabs = this.props.tabs.map((tab, i) => {
			const classNames = cx(
				'tabs-tab align--center atMedium_align--left',
				{'tabs-tab--selected': tab.props.isSelected}
			);

			// remove prop that is not standard DOM
			// before rendering
			delete tab.props.isSelected;

			return (
				<li
					key={i}
					className={classNames}>
					{tab}
				</li>
			);
		});
		return tabs;
	}
	render() {
		const {
			tabs, // eslint-disable-line no-unused-vars
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
					{this.renderTabs()}
				</ul>
			</nav>
		);
	}
}
Tabs.propTypes = {
	tabs: React.PropTypes.arrayOf(React.PropTypes.element).isRequired,
	full: React.PropTypes.bool,
	bordered: React.PropTypes.bool,
};

export default Tabs;
