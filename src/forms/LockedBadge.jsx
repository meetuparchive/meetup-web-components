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

		this.variants = {
			default: {
				iconColor: '#008294',
				labelColor: '#008294',
				backgroundColor: '#dcebee',
			},
			neutral: {
				iconColor: '#000000',
				labelColor: '#212121',
				backgroundColor: '#f6f7f8',
			},
		};

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
			variant = 'default',
		} = this.props;

		const { iconColor, labelColor, backgroundColor } = this.variants[variant];

		return (
			<Flex>
				<FlexItem
					shrink
					onClick={this.handleClick}
					className="lockedBadge-container"
					style={{ backgroundColor }}
				>
					<div className="lockedBadge-badge">
						<Icon shape="lock" size="xs" color={iconColor} />
						<span className="lockedBadge-label" style={{ color: labelColor }}>
							{label}
						</span>
					</div>
				</FlexItem>
			</Flex>
		);
	}
}

LockedBadge.propTypes = {
	/** Style theme for badge */
	variant: PropTypes.oneOf(['default', 'neutral']),

	/** Label of CTA badge for unlocking the panel */
	label: PropTypes.string.isRequired,

	/** A callback that happens after the locked label has been clicked  */
	onClick: PropTypes.func.isRequired,
};

export default DeprecationWarning(LockedBadge);
