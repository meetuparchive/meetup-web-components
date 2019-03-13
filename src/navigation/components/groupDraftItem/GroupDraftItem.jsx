import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import Icon from '../../../media/Icon';

export const PROFILE_GROUP_DRAFT_LIST_ITEM_CLASS = 'profileDropdown-draft-group';

export const GroupDraftItem = ({ groupDraft }) => {
	return (
		<li
			key={groupDraft.urlname}
			className={cx(PROFILE_GROUP_DRAFT_LIST_ITEM_CLASS, 'list-item')}
		>
			<p>{groupDraft.name}</p>
			<div>
				<span>{groupDraft.status}</span>
				<a className="draftprofiledropdown" href={groupDraft.urlname}>
					<strong>{groupDraft.actionTitle}</strong>{' '}
					<Icon className="text--blue" shape="arrow-right" size="xs" />
				</a>
			</div>
		</li>
	);
};

export default GroupDraftItem;

GroupDraftItem.propTypes = {
	groupDraft: PropTypes.shape({
		urlname: PropTypes.string,
		name: PropTypes.string,
		status: PropTypes.string, // translated 'In progress' string
		actionTitle: PropTypes.string,
	}),
};
