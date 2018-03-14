import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Flex from '../../../layout/Flex';
import FlexItem from '../../../layout/FlexItem';
import Avatar from '../../../media/Avatar';
import Icon from '../../../media/Icon';

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
			formattedTimeSince,
			photoUrl,
			link,
			dangerouslySetInnerHTML,
			className,
			localeCode,
			generateClassicUrl,
		} = this.props;

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
								{formattedTimeSince}
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
	isRead: PropTypes.bool,
	onMarkReadAction: PropTypes.func.isRequired,
	link: PropTypes.string,
	dangerouslySetInnerHTML: PropTypes.shape({
		__html: PropTypes.string,
	}),
	photoUrl: PropTypes.string,
	formattedTimeSince: PropTypes.string,
	localeCode: PropTypes.string.isRequired,
	className: PropTypes.string,
	notifUrlWithTracking: PropTypes.string,
	generateClassicUrl: PropTypes.func.isRequired,
};

export default Notification;
