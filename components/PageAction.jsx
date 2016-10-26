import React from 'react';
import cx from 'classnames';
import Icon from './Icon';
import {
	// Chunk,
	// Flex,
	FlexItem,
	// Section,
} from './layoutUtils';

/**
 * @module PageAction
 */
class PageAction extends React.Component {
	render() {
		const {
			children,
			className,
			icon,
			label,
			...other
		} = this.props;

		const classNames = cx(
			'pageAction',
			className,
			'align--center'
		);

		return (
			<FlexItem
				className={classNames}
				{...other}>
					{icon &&
						<Icon shape={icon} />
					}
					{label &&
						<div className='text--small text--secondary'>{label}</div>
					}
					{children}
			</FlexItem>
		);
	}
}

PageAction.propTypes = {
};

export default PageAction;
