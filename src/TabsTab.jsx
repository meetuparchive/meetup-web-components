import React from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

/**
 * @module TabsTab
 */
class TabsTab extends React.Component {
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
TabsTab.propTypes = {
	url: React.PropTypes.string.isRequired,
	label: React.PropTypes.string.isRequired,
	isActive: React.PropTypes.bool,
};

export default TabsTab;
