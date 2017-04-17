import React from 'react';
import cx from 'classnames';

const statusToContent = {
	yes: 'Going',
	no: 'Not going',
	waiting: 'Waiting',
};


/**
 * SQ2 RSVP Tag component
 *
 *
 * @see {@link https://github.com/meetup/sassquatch2/blob/develop/sass/ui-components/_rsvpTag.scss}
 * @see {@link http://meetup.github.io/sassquatch2/ui_components.html#tag}
 * @module RsvpTag
 */
class RsvpTag extends React.Component {
	render() {
		const {
			status,
			className,
			...other
		} = this.props;

		const content = statusToContent[status];

		const classNames = cx(
			'rsvpTag',
			`rsvpTag--${status}`,
			className
		);

		return (
			<div className={classNames} {...other}>
				{content}
			</div>
		);
	}
}

RsvpTag.propTypes = {
	status: React.PropTypes.oneOf(['yes', 'no', 'waiting']).isRequired
};

export default RsvpTag;
