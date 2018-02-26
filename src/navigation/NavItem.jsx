import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import Button from '../../forms/Button';
import Dropdown from '../../interactive/Dropdown';
import FlexItem from '../../layout/FlexItem';

const NAV_ITEM_CLASS = 'navItemLink';


export const ActionItem = ({ label, action, labelClassNames }) => (
	<Button reset className={cx(NAV_ITEM_CLASS, 'text--secondary')} onClick={action}>
		<span className={labelClassNames}>{label}</span>
	</Button>
);
export const LinkItem = ({ linkTo, navItemContent, className }) => (
	<a href={linkTo} className={cx(NAV_ITEM_CLASS, className)}>
		{navItemContent}
	</a>
);
export const ContentLoaderItem = ({ navItemContent, onClickAction }) => (
	<Button aria-haspopup reset className={NAV_ITEM_CLASS} onClick={onClickAction}>
		{navItemContent}
	</Button>
);
export const DropdownItem = ({ navItemContent, dropdownContent }) => (
	<Dropdown
		noPortal
		align="right"
		maxWidth="544px"
		minWidth="384px"
		trigger={navItemContent}
		content={dropdownContent}
	/>
);

/**
 * NavItem
 *
 * Renders a dropdown if `dropdownContent` prop is passed,
 * otherwise relies on a `linkTo` prop to render a link item.
 *
 * @param {Object} props - React element props
 * @returns {React.element} - navigation segment of header
 */
export const NavItem = props => {
	const {
		linkTo,
		label,
		shrink,
		className,
		labelClassName,
		linkClassName,
		dropdownContent,
		icon,
		hasUpdates,
		onClickAction,
		onAction,
		...other
	} = props;

	const classNames = {
		navItem: cx('navItem', className),
		label: cx('navItem-label', labelClassName),
	};

	const navItemContent = (
		<div>
			{icon}
			{label && <span className={classNames.label}>{label}</span>}
			{hasUpdates && (
				<span className="counterBadge">
					<span className="visibility--a11yHide">
						Updates
					</span>
				</span>
			)}
		</div>
	);

	const trigger = onClickAction ? (
		<ContentLoaderItem
			onClickAction={onClickAction}
			navItemContent={navItemContent}
		/>
	) : (
			navItemContent
		);

	return (
		<FlexItem shrink={shrink} className={classNames.navItem} {...other}>
			{linkTo && (
				<LinkItem
					className={linkClassName}
					linkTo={linkTo}
					navItemContent={navItemContent}
				/>
			)}
			{dropdownContent && (
				<DropdownItem
					dropdownContent={dropdownContent}
					navItemContent={trigger}
				/>
			)}
			{onAction && (
				<ActionItem
					label={label}
					action={onAction}
					labelClassNames={classNames.label}
				/>
			)}
		</FlexItem>
	);
};

NavItem.propTypes = {
	linkTo: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	dropdownContent: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
	onClickAction: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	shrink: PropTypes.bool,
	className: PropTypes.string,
	labelClassName: PropTypes.string,
	linkClassName: PropTypes.string,
	icon: PropTypes.element,
	hasUpdates: PropTypes.bool,
};

export default NavItem;
