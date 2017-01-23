import React from 'react';
import cx from 'classnames';
import FlexItem from './FlexItem';

/**
 * @module PageAction
 */
class PageAction extends React.Component {
	render() {
		const {
			children,
			className,
			...other
		} = this.props;


		const classNames = cx(
			'pageAction',
			className
		);

		return (
			<FlexItem
				className={classNames}
				shrink
				{...other}>
					{children}
			</FlexItem>
		);
	}
}

PageAction.propTypes = {
};

export default PageAction;
