import React from 'react';

import cx from 'classnames';
import PropTypes from 'prop-types';

import Button from '../../../forms/Button';
import Chunk from '../../../layout/Chunk';
import Flex from '../../../layout/Flex';
import FlexItem from '../../../layout/FlexItem';
import Icon from '../../../media/Icon';
import GroupDraftItem from '../groupDraftItem/GroupDraftItem';

export const PROFILE_CLASS = 'profileDropdown-content';
export const PROFILE_GROUP_LIST_ITEM_CLASS = 'profileDropdown-content-group';

/**
 * Creates profile dropdown used in navbar have,
 * contains members groups + key links for user profile
 * @param  {Array} options.groups list of groups user is member of
 * @return {React.element} composed component
 */
export const ProfileDropdownComponent = ({
	settings,
	help,
	profile,
	logout,
	groups,
	groupDraft,
	groupHome,
	allGroupsLabel,
	allGroupsLink,
}) => {
	const groupsContent = groups.map(group => (
		<li
			key={group.urlname}
			className={cx(PROFILE_GROUP_LIST_ITEM_CLASS, 'list-item')}
		>
			<a href={groupHome(group.urlname)}>{group.name}</a>
		</li>
	));

	const showGroups = Boolean((groups && groups.length) || groupDraft);

	return (
		<Flex
			justify="spaceBetween"
			className={cx(PROFILE_CLASS, 'align--left', 'padding--all')}
		>
			{showGroups && (
				<FlexItem growFactor={2}>
					<Chunk>
						<ul className="list">
							{groupDraft && <GroupDraftItem groupDraft={groupDraft} />}
							{groupsContent}
						</ul>
					</Chunk>
					<Button small href={allGroupsLink} component="a">
						{allGroupsLabel}
						<Icon className="margin--left" shape="chevron-right" size="xs" />
					</Button>
				</FlexItem>
			)}
			<FlexItem
				growFactor={1}
				className={cx('text--secondary', { 'margin--left': showGroups })}
			>
				<ul className="list">
					<li className="list-item">
						<a href={profile.link}>{profile.label}</a>
					</li>
					<li className="list-item">
						<a href={settings.link}>{settings.label}</a>
					</li>
					<li className="list-item">
						<a href={help.link}>{help.label}</a>
					</li>
					<li className="list-item">
						<a href={logout.link}>{logout.label}</a>
					</li>
				</ul>
			</FlexItem>
		</Flex>
	);
};

ProfileDropdownComponent.propTypes = {
	profile: PropTypes.shape({
		link: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
	}),
	settings: PropTypes.shape({
		link: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
	}),
	help: PropTypes.shape({
		link: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
	}),
	logout: PropTypes.shape({
		link: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
	}),
	groups: PropTypes.arrayOf(PropTypes.object),
	groupHome: PropTypes.func.isRequired,
	allGroupsLabel: PropTypes.string.isRequired,
	allGroupsLink: PropTypes.string.isRequired,
};

export default ProfileDropdownComponent;
