import React from 'react';
import { FormattedDate } from 'react-intl';
import cx from 'classnames';

/**
 * SQ2 TearSheet component
 * @see {@link https://github.com/meetup/sassquatch2/blob/develop/sass/ui-components/_tearsheet.scss}
 * @see {@link http://meetup.github.io/sassquatch2/ui_components.html#tearsheet}
 * @module TearSheet
 */
class TearSheet extends React.Component {
	render() {
		const {
			datetime,
			className,
			...other
		} = this.props;

		const classNames = cx('tearsheet', className);

		return (
			<time
				dateTime={datetime}
				className={classNames}
				{...other}>
				<span className='tearsheet-date'>
					<FormattedDate
						value={datetime}
						day='numeric' />
				</span>
				<span className='tearsheet-month'>
					<FormattedDate
						value={datetime}
						month='short' />
				</span>
			</time>
		);
	}
}

TearSheet.propTypes = {
	datetime: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.number,
		React.PropTypes.instanceOf(Date),
	]).isRequired,
};

export default TearSheet;
