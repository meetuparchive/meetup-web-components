import React from 'react';
import cx from 'classnames';

import { Section } from './layoutUtils';

/**
 * @module StickyCTA
 */
class StickyCTA extends React.Component {
	render() {
		const {
			children,
			className,
			bordered,
			...other
		} = this.props;

		const classNames = cx(
			'stickyCTA',
			{
				'stickyCTA--bordered': bordered
			},
			className
		);

		return (
			<div
				className={classNames}
				{...other}>
					<div className='stickyCTA-container'>
						{children}
					</div>
			</div>
		);
	}
}

StickyCTA.propTypes = {
	bordered: React.PropTypes.bool
};

export default StickyCTA;
