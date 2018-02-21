import React from 'react';
import cx from 'classnames';
import { C_TEXT_PRIMARYINVERTED } from 'swarm-constants/dist/js/colorConstants';


import Chunk from '../../layout/Chunk';
import Flex from '../../layout/Flex';
import FlexItem from '../../layout/FlexItem';
import Icon from '../../media/Icon';

// import { generateGroupUrl } from 'src/app/group/groupLinksHelper';

export const PROFILE_CLASS = 'header-profileDropdown-content';
export const PROFILE_GROUP_LIST_ITEM_CLASS = 'profileDropdown-content-group';

/**
 * Creates profile dropdown used in header have,
 * contains members groups + key links for user profile
 * @param  {Array} options.groups list of groups user is member of
 * @return {React.element} composed component
 */
export const ProfileDropdownComponent = ({ profileUrl, groups }) => {
	const groupsContent = groups.map(group => (
		<li
			key={group.urlname}
			className={cx(PROFILE_GROUP_LIST_ITEM_CLASS, 'list-item')}
		>
			{group.name}
		</li>
	));

	const showGroups = Boolean(groups && groups.length);

	return (
		<Flex
			justify="spaceBetween"
			className={cx(PROFILE_CLASS, 'align--left', 'padding--all')}
		>
			{showGroups && (
				<FlexItem growFactor={6}>
					<Chunk>
						<ul className="list">{groupsContent}</ul>
					</Chunk>
					<a href="/find" className="button button--small text--small">
						See All Groups
						<Icon
							className="margin--left"
							shape="chevron-right"
							size="xs"
							color={C_TEXT_PRIMARYINVERTED}
						/>
					</a>
				</FlexItem>
			)}
			<FlexItem
				growFactor={2}
				className={cx('text--secondary', { 'margin--left': showGroups })}
			>
				<ul className="list">
					<li className="list-item">
						<a href={profileUrl}>
							Profile
						</a>
					</li>
					<li className="list-item">
						<a href="/account">
							Settings
						</a>
					</li>
					<li className="list-item">
						Logout
					</li>
				</ul>
			</FlexItem>
		</Flex>
	);
};

export default ProfileDropdownComponent;
