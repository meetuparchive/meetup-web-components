import React from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

/**
 * @module Tab
 */
class Tab extends React.Component {
	render() {
		const {
			url,
			name,
			isCurrent,
			...other
		} = this.props;

		const classNames = cx(
			'tabs-tab align--center atMedium_align--left',
			{'tabs-tab--selected': isCurrent}
		);

		return(
			<li
				className={classNames}
				{...other}
			>
				<Link to={url}>
					{name}
				</Link>
			</li>
		);
	}
}

/**
 * @module Tabs
 */
class Tabs extends React.Component {
	render() {
		const {
			className,
			tabList,
			bordered,
			...other
		} = this.props;

		const tabListClassNames = cx(
			'tabs',
			className
		);

		const tabContainerClassNames = cx(
			'tabs-container',
			{
				'tabs-container--bordered': bordered
			}
		);

		return (
			<div>
				<p className='debug'>{location.pathname}</p>
				<nav className={tabContainerClassNames}>
					<ul className={tabListClassNames} {...other}>
						{tabList.map((tab,i)=>{
							const isCurrent = this.context.router.isActive(tab.url, true);
							return (
								<Tab
									isCurrent={isCurrent}
									key={i}
									url={tab.url}
									name={tab.name}
								/>
							);
						})}
					</ul>
				</nav>
			</div>
		);
	}
}



Tabs.contextTypes = {
	router: React.PropTypes.func.isRequired
};


Tabs.propTypes = {
	tabList: React.PropTypes.array
};

export default Tabs;
