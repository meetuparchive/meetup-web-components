import React from 'react';
import PropTypes from 'prop-types';

import Flex from '../../../layout/Flex';
import FlexItem from '../../../layout/FlexItem';
import Modal from '../../../interactive/Modal';

export const PROFILE_CLASS = 'profileDropdown-content';
export const PROFILE_GROUP_LIST_ITEM_CLASS = 'profileDropdown-content-group';

/**
 * Creates dashboard dropdown used in navbar mobile implementation,
 * contains links to Pro Admin pages.
 * @param  {Object} labels and links to useful pages
 * @return {React.element} composed component
 */
export const DashboardDropdownComponent = ({ mobileTabs, dismissAction }) => {
	const {
		help,
		profile,
		logout,
		analytics,
		members,
		groups,
		events = {},
		templates,
		publicProfile,
		contact,
	} = mobileTabs;
	return (
		<Modal onDismiss={dismissAction}>
			<Flex justify="spaceBetween" className="align--left padding--all">
				<FlexItem growFactor={1} className="text--secondary margin--left">
					<ul className="list">
						<li className="list-item padding--bottom">
							<a href={analytics.link}>{analytics.label}</a>
						</li>
						<li className="list-item padding--bottom">
							<a href={members.link}>{members.label}</a>
						</li>
						<li className="list-item padding--bottom">
							<a href={groups.link}>{groups.label}</a>
						</li>
						{events.show && (
							<li className="list-item padding--bottom">
								<a href={events.link}>{events.label}</a>
							</li>
						)}
						<li className="list-item padding--bottom">
							<a href={templates.link}>{templates.label}</a>
						</li>
						<li className="list-item padding--bottom">
							<a href={publicProfile.link}>{publicProfile.label}</a>
						</li>
						<li className="list-item">
							<a href={profile.link}>{profile.label}</a>
						</li>
						<li className="padding--top">
							<a href={contact.link}>{contact.label}</a>
						</li>
						<li className="padding--top">
							<a href={help.link}>{help.label}</a>
						</li>
						<li className="padding--top">
							<a href={logout.link}>{logout.label}</a>
						</li>
					</ul>
				</FlexItem>
			</Flex>
		</Modal>
	);
};

DashboardDropdownComponent.propTypes = {
	mobileTabs: PropTypes.shape({
		analytics: PropTypes.shape({
			link: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
		}),
		members: PropTypes.shape({
			link: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
		}),
		groups: PropTypes.shape({
			link: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
		}),
		events: PropTypes.shape({
			link: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
			show: PropTypes.bool.isRequired,
		}),
		templates: PropTypes.shape({
			link: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
		}),
		publicProfile: PropTypes.shape({
			link: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
		}),
		profile: PropTypes.shape({
			link: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
		}),
		contact: PropTypes.shape({
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
	}),
	dismissAction: PropTypes.func,
};

export default DashboardDropdownComponent;
