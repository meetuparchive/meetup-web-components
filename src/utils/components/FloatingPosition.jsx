import PropTypes from 'prop-types';
import React from 'react';
import { Portal } from 'react-portal';
import rafSchedule from 'raf-schd';

import ConditionalWrap from './ConditionalWrap';

export const getAdjustedAlignment = (
	preferredAlignment,
	triggerPositionData,
	contentWidth,
	viewportWidth
) => {
	const {
		left,
		width,
	} = triggerPositionData;
	const overflowLeft = left + contentWidth > viewportWidth;
	const overflowRight = (left + width) - contentWidth < 0;

	// if overflows viewport on the right side, go left
	if (overflowRight && !overflowLeft) {
		return 'left';
	// if overflows viewport on the left side, go right
	} else if (overflowLeft && !overflowRight) {
		return 'right';
	// but if there's no overflow OR there's overflow on
	// both sides, just use whatever alignment was passed
	} else {
		return preferredAlignment;
	}
};

/**
 * @module FloatingPosition
 */
class FloatingPosition extends React.PureComponent {
	constructor(props) {
		super(props);

		this.scheduleUpdate = rafSchedule(
			triggerClientRect => this.getContentPosition(triggerClientRect)
		);

		this.getContentPosition = this.getContentPosition.bind(this);
		this.scheduleContentPosition = this.scheduleContentPosition.bind(this);

		this.state = {
			left: "0px",
			top: "0px",
			align: "right"
		};

	}

	getContentPosition(triggerClientRect) {
		const {getTrigger, getContent} = this.props;

		if (!getTrigger()) {
			return;
		}

		const positionTarget = getTrigger().offsetParent ? getTrigger().offsetParent : getTrigger();
		const positionData = triggerClientRect || positionTarget.getBoundingClientRect();
		const contentHeight = getContent && getContent().getBoundingClientRect().height;
		const contentWidth = getContent && getContent().getBoundingClientRect().width;
		const scrollTop = window.scrollY || window.pageYOffset;
		const scrollLeft = window.scrollX || window.pageXOffset;
		const {
			left,
			top,
			width,
			height
		} = positionData;

		const getLeftPos = (alignment, noPortal) => {
			const adjustedAlignment = getAdjustedAlignment(alignment, positionData, contentWidth, window.innerWidth);

			if (!noPortal) {

				this.setState(() => ({
					align: adjustedAlignment
				}));

				switch (adjustedAlignment) {
					case 'left':
						return `${left + scrollLeft}px`;
					case 'center':
						return `${(left + width / 2) + scrollLeft}px`;
					case 'right':
						return `${left + width + scrollLeft}px`;
					default:
						return `${left + width + scrollLeft}px`;
				}
			}
		};

		const getTopPos = (direction, noPortal) => {
			const triggerTopPosition = scrollTop + top + height;

			if (noPortal) {
				return direction == 'top' ? parseInt(contentHeight * -1) : null;
			} else {
				return direction == 'top' ? (triggerTopPosition - contentHeight - height) : triggerTopPosition;
			}
		};

		const ddPosition = {
			left: getLeftPos(this.props.align, this.props.noPortal),
			top: getTopPos(this.props.direction, this.props.noPortal)
		};

		this.setState(() => ({
			left: ddPosition.left,
			top: ddPosition.top
		}));
	}

	scheduleContentPosition(triggerClientRect) {
		// When we receive a scroll event, schedule an update.
		// If we receive many updates within a frame, we'll only publish the latest value.
		this.scheduleUpdate(triggerClientRect);
	}

	componentDidMount() {
		const triggerObj = this.props.getTrigger();

		const positionTarget = triggerObj.offsetParent ? triggerObj.offsetParent : triggerObj;

		this.getContentPosition();
		window.addEventListener(
			"resize",
			() => {this.scheduleContentPosition(positionTarget.getBoundingClientRect());}
		);
		document.addEventListener(
			"scroll",
			() => {this.scheduleContentPosition(positionTarget.getBoundingClientRect());},
			true
		);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.getContentPosition);
		document.removeEventListener("scroll", this.getContentPosition);
		this.scheduleUpdate.cancel();
	}

	render() {
		return(
			<ConditionalWrap
				condition={!this.props.noPortal}
				wrap={children => this.props.noPortal ? <div>{children}</div> : <Portal>{children}</Portal>}
			>
				{
					this.props.children({
						left: this.state.left,
						top: this.state.top,
						align: this.state.align
					})
				}
			</ConditionalWrap>
		);
	}

}

FloatingPosition.propTypes = {
	getTrigger: PropTypes.func.isRequired,
	getContent: PropTypes.func,
};

export default FloatingPosition;
