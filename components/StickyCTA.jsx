import React from 'react';
import cx from 'classnames';

import { Section } from 'foundation-react/layoutUtils';

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
			<Section
				className={classNames}
				{...other}>
					<div className='stickyCTA-container'>
						{children}
					</div>
			</Section>
		);
	}
}

StickyCTA.propTypes = {
	bordered: React.PropTypes.bool
};

export default StickyCTA;
