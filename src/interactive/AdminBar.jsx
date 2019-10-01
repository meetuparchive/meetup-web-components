// @flow
import React from 'react';
import cx from 'classnames';

import { Button } from '@meetup/swarm-components';
import Flex from '../layout/Flex';
import FlexItem from '../layout/FlexItem';
import Section from '../layout/Section';
import Tooltip from './Tooltip';
import { Select } from '@meetup/swarm-components';

type DropdownProps = {
	group: Group,
	event?: EventInfo,
	host: string,
};

type Props = {
	/** The group for which to render the admin bar */
	group?: Group,

	/** The event for which to render the admin bar */
	event?: EventInfo,

	/** Whether the user is QL'ed into somebody else */
	isQL: boolean,

	/** Whether the user is logged into Meetup's admin tools */
	isAdmin: boolean,

	/** Whether the data being rendered is from production */
	isProdApi: boolean,

	/** Info about the current user */
	self: Self,

	/** Environment the component is being rendered in. e.g.: production */
	nodeEnv: string,
};

type State = {
	highlightValue: string,
	showHighlighter: boolean,
};

const DropdownContent = ({ group, event, host }: DropdownProps): React$Node => (
	<ul className="padding--all">
		{group.organizer && (
			<li>
				<a
					href={`https://www.${host}/ql/?qlMemberId=${group.organizer.id}`}
					className="link"
					target="_blank"
					rel="noopener noreferrer"
				>
					QL Org
				</a>
			</li>
		)}
		<li>
			<a
				href={`https://admin.${host}/admin/group.jsp?g=${group.id}&op=search`}
				className="link"
				target="_blank"
				rel="noopener noreferrer"
			>
				Group
			</a>
		</li>
		{group.organizer && (
			<li>
				<a
					href={`https://admin.${host}/admin/member.jsp?m=${
						group.organizer.id
					}`}
					className="link"
					target="_blank"
					rel="noopener noreferrer"
				>
					Org
				</a>
			</li>
		)}
		{event !== undefined &&
			event.id && (
				<li>
					<a
						href={`https://admin.${host}/admin/events.jsp?eventIdOrUrl=${
							event.id
						}`}
						className="link"
						target="_blank"
						rel="noopener noreferrer"
					>
						Event
					</a>
				</li>
			)}
		<li>
			<a
				href={`https://admin.${host}/admin/events.jsp?groupIdOrUrl=${group.id}`}
				className="link"
				target="_blank"
				rel="noopener noreferrer"
			>
				Group Events
			</a>
		</li>
		<li>
			<a
				href={`https://admin.${host}/admin/notifications/chapter/${group.id}`}
				className="link"
				target="_blank"
				rel="noopener noreferrer"
			>
				Notifs
			</a>
		</li>
	</ul>
);

export class AdminBar extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			highlightValue: '1',
			showHighlighter: false,
		};
	}

	onHighlightValueChange = (e: SyntheticInputEvent<EventTarget>) => {
		this.setState({ highlightValue: e.target.value });
	};

	highlightGroup = (host: string, group: Group) => {
		fetch(`https://admin.${host}/admin_api/index/highlight/`, {
			method: 'POST',
			headers: { 'content-type': 'application/x-www-form-urlencoded' },
			body: `chapter_id=${group.id}&value=${this.state.highlightValue}`,
			credentials: 'include',
		}).then(() => {
			this.toggleHighlighter();
		});
	};

	toggleHighlighter = () => {
		this.setState(state => ({ showHighlighter: !state.showHighlighter }));
	};

	render() {
		const { group, event, isQL, isAdmin, self, isProdApi, nodeEnv } = this.props;
		const isProdEnv = nodeEnv === 'production';
		if (!isAdmin && isProdEnv) {
			return null;
		}

		const host: string =
			nodeEnv === 'production' || isProdApi ? 'meetup.com' : 'dev.meetup.com';

		return (
			<Flex
				className={cx('groupAdminLinks', {
					['redbar']: isProdApi,
					['greenbar']: isQL && !isProdApi,
				})}
			>
				{isQL &&
					isAdmin && (
						<FlexItem className="inverted padding--top-half">
							<p className="text--display3">
								QL:{' '}
								<a
									href={`https://admin.${host}/admin/member.jsp?m=${
										self.id
									}`}
									className="link"
									target="_blank"
									rel="noopener noreferrer"
								>
									{self.name}
								</a>
							</p>
						</FlexItem>
					)}
				{isProdApi &&
					!isProdEnv && (
						<FlexItem className="inverted padding--top-half">
							<p className="text--display4">
								You are using production data.
							</p>
						</FlexItem>
					)}
				{group !== undefined &&
					isAdmin && (
						<FlexItem shrink>
							<Tooltip
								direction="top"
								align="left"
								minWidth="100px"
								withClose
								noPortal
								id="admin-label-btn"
								trigger={
									<Button id="admin-label-btn" icon="settings">
										Admin
									</Button>
								}
								content={
									group !== undefined && (
										<DropdownContent
											host={host}
											group={group}
											event={event}
										/>
									)
								}
							/>
						</FlexItem>
					)}
				{group !== undefined &&
					isAdmin && (
						<FlexItem shrink>
							<Tooltip
								direction="top"
								align="left"
								withClose
								noPortal
								id="highlight-label-btn"
								isActive={this.state.showHighlighter}
								trigger={
									<Button id="highlight-label-btn">
										Highlight {`${this.state.highlightValue}`}
									</Button>
								}
								content={
									<Section>
										<Select
											name="highlightValue"
											onChange={this.onHighlightValueChange}
											value={this.state.highlightValue}
										>
											{['1', '2', '3', '4', '5', 'lowlight'].map(
												h => (
													<option value={h} key={h}>
														{h}
													</option>
												)
											)}
										</Select>
										<a
											className="button margin--bottom"
											onClick={this.highlightGroup.bind(
												this,
												host,
												group
											)}
										>
											submit
										</a>
									</Section>
								}
							/>
						</FlexItem>
					)}
			</Flex>
		);
	}
}

export default AdminBar;
