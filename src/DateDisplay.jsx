import PropTypes from 'prop-types';
import React from 'react';
import { FormattedDate } from 'react-intl';
import cx from 'classnames';

/**
 * SQ2 DateDisplay component
 * @see {@link https://github.com/meetup/sassquatch2/blob/develop/sass/ui-components/_dateDisplay.scss}
 * @see {@link http://meetup.github.io/sassquatch2/ui_components.html#dateDisplay}
 * @module DateDisplay
 */
class DateDisplay extends React.Component {
	render() {
		const {
			datetime,
			className,
			...other
		} = this.props;

		const classNames = cx('dateDisplay', className);

		return (
			<time
				dateTime={datetime}
				className={classNames}
				{...other}>
				<span className='dateDisplay-day'>
					<FormattedDate
						value={datetime}
						day='numeric' />
				</span>
				<span className='dateDisplay-month'>
					<FormattedDate
						value={datetime}
						month='short' />
				</span>
			</time>
		);
	}
}

DateDisplay.propTypes = {
	datetime: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.instanceOf(Date),
	]).isRequired,
};

export default DateDisplay;
