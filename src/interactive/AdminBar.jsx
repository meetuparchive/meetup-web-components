// @flow
import React from 'react';
import cx from 'classnames';

import Button from '../forms/Button';
import Flex from '../layout/Flex';
import FlexItem from '../layout/FlexItem';
import Icon from '../media/Icon';
import Section from '../layout/Section';
import Tooltip from './Tooltip';
import SelectInput from '../forms/SelectInput';

type DropdownProps = {
	group: Group,
	event?: EventInfo,
	host: string,
};

type Props = {
	group: Group,
	event?: EventInfo,
	isQL: boolean,
	isAdmin: boolean,
	isProdApi: boolean,
	self: Self,
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

	highlightGroup = (host: string) => {
		fetch(`https://admin.${host}/admin_api/index/highlight/`, {
			method: 'POST',
			headers: { 'content-type': 'application/x-www-form-urlencoded' },
			body: `chapter_id=${this.props.group.id}&value=${this.state.highlightValue}`,
			credentials: 'include',
		}).then(() => {
			this.props.group.highlight = this.state.highlightValue;
			this.toggleHighlighter();
		});
	};

	toggleHighlighter = () => {
		this.setState(state => ({ showHighlighter: !state.showHighlighter }));
	};

	render() {
		const { group, event, isQL, isAdmin, self, isProdApi, nodeEnv } = this.props;
		// when not admin we don't want to show admin bar
		if (!isAdmin) {
			return null;
		}
		const host: string = (nodeEnv === 'production' || isProdApi) ? 'meetup.com' : 'dev.meetup.com';
		const savedHighlightValue = group.highlight === '' ? '' : `(${group.highlight})`;
		const highlightOptions = ['1', '2', '3', '4', '5', 'lowlight'].map(h => ({
			label: h,
			value: h,
		}));

		return (
			<Flex
				className={cx('groupAdminLinks', {
					['warning']: isQL || isProdApi,
				})}
			>
				{isQL && (
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
				{isProdApi && (
					<FlexItem className="inverted padding--top-half">
						<p className="text--display4">You are using production data.</p>
					</FlexItem>
				)}
				<FlexItem shrink>
					<Tooltip
						direction="top"
						align="left"
						minWidth="100px"
						withClose
						noPortal
						id="admin-label-btn"
						trigger={
							<Button
								id="admin-label-btn"
								icon={<Icon shape="cog" size="xs" />}
							>
								Admin
							</Button>
						}
						content={
							<DropdownContent host={host} group={group} event={event} />
						}
					/>
				</FlexItem>
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
								Highlight {savedHighlightValue}
							</Button>
						}
						content={
							<Section>
								<SelectInput
									name="highlightValue"
									onChange={this.onHighlightValueChange}
									options={highlightOptions}
									value={group.highlight}
								/>
								<a
									className="button margin--bottom"
									onClick={this.highlightGroup.bind(host)}
								>
									submit
								</a>
							</Section>
						}
					/>
				</FlexItem>
			</Flex>
		);
	}
}

export default AdminBar;
