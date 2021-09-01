import PropTypes from 'prop-types';
import React from 'react';

import Icon from '../media/Icon';
import Flex from '../layout/Flex';
import FlexItem from '../layout/FlexItem';

import DeprecationWarning from '../utils/components/DeprecationWarning';
/**
 * @module LockedBadge
 */
export class LockedBadge extends React.PureComponent {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	componentDidCatch(error, info) {
		console.log(`${error}: \n ${info.componentStack}`);
	}

	handleClick(e) {
		e.preventDefault();

		this.props.onClick(e);
	}

	render() {
		const {
			label,
			onClick, // eslint-disable-line no-unused-vars
		} = this.props;

		return (
			<Flex>
				<FlexItem
					shrink
					onClick={this.handleClick}
					className="lockedBadge-container"
				>
					<div className="lockedBadge-badge">
						<Icon shape="lock" size="xs" color="#008294" />
						<span className="lockedBadge-label">{label}</span>
					</div>
				</FlexItem>
			</Flex>
		);
	}
}

LockedBadge.propTypes = {
	/** Label of CTA badge for unlocking the panel */
	label: PropTypes.string,

	/** A callback that happens after the locked label has been clicked  */
	onClick: PropTypes.func,
};

export default DeprecationWarning(LockedBadge);
