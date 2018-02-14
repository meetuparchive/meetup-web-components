import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { FormattedRelative } from 'react-intl';

import Flex from '../../layout/Flex';
import FlexItem from '../../layout/FlexItem';
import Avatar from '../../media/Avatar';
import Icon from '../../media/Icon';



import { generateClassicUrl } from 'src/util/linksHelper';

const MEMBER_NOTIF_TYPES = ['mug_comm', 'convo', 'comment'];

/**
 * gets icon shape based on the "kind" of notification
 *
 * @param {String} notifKind - `kind` field of notification
 * @returns {String} - icon shape for notification
 */
export const getIconShape = notifKind => {
	let shape = 'meetup-m';

	const notifKindToShape = {
		convo: 'messages',
		mug_comm: 'messages',
		comment: 'messages',
		event: 'calendar',
		dues: 'creditcard',
		like: 'heart',
	};

	Object.keys(notifKindToShape).forEach(kind => {
		if (notifKind.startsWith(kind)) {
			shape = notifKindToShape[kind];
		}
	});

	return shape;
};

/**
 * @module Notification
 */
class Notification extends React.PureComponent {
	/**
	 * @constructor
	 * @param {Object} props passed in from parent
	 */
	constructor(props) {
		super(props);

		this.state = {
			isRead: props.isRead,
		};

		this.onClick = this.onClick.bind(this);
	}

	/**
	 * Marks notification read in internal state,
	 * calls fn to make POST to 'notifications/read' endpoint
	 *
	 * @return {undefined}
	 */
	onClick() {
		const { id, isRead, onMarkReadAction } = this.props;

		if (!isRead) {
			this.setState(() => ({ isRead: true }));
			onMarkReadAction(id);
		}
	}

	/**
	 * @return {React.element} rendered single notification
	 */
	render() {
		const {
			memberId,
			kind,
			updated,
			photoUrl,
			link,
			dangerouslySetInnerHTML,
			className,
			localeCode,
		} = this.props;

		const timeSince = new Date(updated);
		const isMemberRelated = MEMBER_NOTIF_TYPES.some(t => kind.startsWith(t));

		const classNames = cx(
			'list-item',
			'notification',
			{ 'notification--read': this.state.isRead },
			className
		);

		const avatarClassNames = cx('notification-image', {
			'avatar--person': isMemberRelated,
		});

		const notifUrlWithTracking = generateClassicUrl(
			localeCode,
			`/r/site/${kind}/${memberId}/notification/${link}`
		);

		return (
			<a href={notifUrlWithTracking} className={classNames} onClick={this.onClick}>
				<Flex>
					{photoUrl && (
						<FlexItem shrink className="valignChildren--center">
							<Avatar className={avatarClassNames} src={photoUrl} />
						</FlexItem>
					)}
					<FlexItem className="valignChildren--center">
						<h4
							className="text--small"
							dangerouslySetInnerHTML={dangerouslySetInnerHTML}
						/>
						<p className="text--hint text--small">
							<Icon shape={getIconShape(kind)} size="xs" />
							<time className="notification-time text--small">
								<FormattedRelative value={timeSince} />
							</time>
						</p>
					</FlexItem>
				</Flex>
			</a>
		);
	}
}

Notification.propTypes = {
	id: PropTypes.string,
	memberId: PropTypes.string,
	kind: PropTypes.string,
	isRead: PropTypes.bool.isRequired,
	onMarkReadAction: PropTypes.func.isRequired,
	link: PropTypes.string.isRequired,
	dangerouslySetInnerHTML: PropTypes.shape({
		__html: PropTypes.string,
	}).isRequired,
	photoUrl: PropTypes.string,
	updated: PropTypes.number,
	localeCode: PropTypes.number,
};

export default Notification;
