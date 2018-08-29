import PropTypes from 'prop-types';
import React from 'react';
import { Portal } from 'react-portal';
import rafSchedule from 'raf-schd';

import ConditionalWrap from './ConditionalWrap';
import withMatchMedia from './withMatchMedia';

export const ARROW_WIDTH = 19.5;

export const calcCenterAlignment = (left, width, scrollLeft, offsetLeft) => {
	return `${left + width / 2 + scrollLeft + offsetLeft}px`;
};
export const calcRightAlignment = (left, width, arrowWidth, scrollLeft, offsetLeft) => {
	return `${left + arrowWidth + width / 2 + scrollLeft + offsetLeft}px`;
};
export const calcLeftAlignment = (left, width, arrowWidth, scrollLeft, offsetLeft) => {
	return `${left - arrowWidth / 2 + width / 2 + scrollLeft + offsetLeft}px`;
};

export const getAdjustedAlignment = (
	preferredAlignment,
	triggerPositionData,
	contentWidth,
	viewportWidth
) => {
	const { left, width } = triggerPositionData;
	const overflowLeft = left + contentWidth > viewportWidth;
	const overflowRight = left + width - contentWidth < 0;

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

export const calculateContentPosition = ({
	trigger,
	content,
	addPortal,
	contentHeight,
	direction,
	offset = {},
	alignment,
	scrollLeft = 0,
	scrollTop = 0
}) => {
	if (trigger && content) {
		const positionTarget = trigger().offsetParent
			? trigger().offsetParent
			: trigger();
		const positionData = positionTarget.getBoundingClientRect();
		const { left: leftPosition, top, width, height } = positionData;
		const offsetLeft = offset.left || 0;
		const offsetTop = offset.top || 0;
		if (addPortal === false) {
			if (direction === 'top') {
				const top = contentHeight ? contentHeight * -1 : 0;
				return { top };
			} else {
				const offsetTop = offset.top || 0;
				const targetElementHeight = positionTarget.getBoundingClientRect().height;
				return { top: targetElementHeight + offsetTop };
			}
		} else {
			let left = 0;
			const triggerTopPosition = scrollTop + top + height + offsetTop;
			switch (alignment) {
				case 'center':
					left = calcCenterAlignment(
						leftPosition,
						width,
						scrollLeft,
						offsetLeft
					);
					break;
				case 'right':
					left = calcRightAlignment(
						leftPosition,
						width,
						ARROW_WIDTH,
						scrollLeft,
						offsetLeft
					);
					break;
				case 'left':
				default:
					left = calcLeftAlignment(
						leftPosition,
						width,
						ARROW_WIDTH,
						scrollLeft,
						offsetLeft
					);
					break;
			}
			const topPosition =
				direction === 'top'
					? triggerTopPosition - contentHeight - height
					: triggerTopPosition;
			return { left, top: topPosition };
		}
	}
};
/**
 * @module FloatingPosition
 */
class FloatingPosition extends React.PureComponent {
	constructor(props) {
		super(props);

		this.getContentPosition = this.getContentPosition.bind(this);
		this.scheduleUpdate = rafSchedule(this.getContentPosition);

		this.state = {
			left: '0px',
			top: '0px',
			align: this.props.align,
		};
	}

	getContentPosition() {
		const { getTrigger, getContent } = this.props;

		if (!getTrigger() || !getContent()) {
			return;
		}

		const positionTarget = getTrigger().offsetParent
			? getTrigger().offsetParent
			: getTrigger();
		const positionData = positionTarget.getBoundingClientRect();
		const contentHeight = getContent && getContent().getBoundingClientRect().height;
		const contentWidth = getContent && getContent().getBoundingClientRect().width;
		const scrollTop = window.scrollY || window.pageYOffset;
		const scrollLeft = window.scrollX || window.pageXOffset;
		const { offset = {} } = this.props;
		const { left, top, width, height } = positionData;

		const getLeftPos = (alignment, noPortal) => {
			if (!noPortal) {
				const adjustedAlignment = getAdjustedAlignment(
					alignment,
					positionData,
					contentWidth,
					window.innerWidth
				);
				const offsetLeft = offset.left || 0;

				this.setState(() => ({
					align: adjustedAlignment,
				}));

				switch (adjustedAlignment) {
					case 'center':
						return calcCenterAlignment(left, width, scrollLeft, offsetLeft);
					case 'right':
						return calcRightAlignment(
							left,
							width,
							ARROW_WIDTH,
							scrollLeft,
							offsetLeft
						);
					case 'left':
					default:
						return calcLeftAlignment(
							left,
							width,
							ARROW_WIDTH,
							scrollLeft,
							offsetLeft
						);
				}
			}
		};

		const getTopPos = (direction, noPortal) => {
			const offsetTop = offset.top || 0;
			const triggerTopPosition = scrollTop + top + height + offsetTop;

			if (noPortal) {
				return direction == 'top'
					? parseInt(contentHeight * -1)
					: height + offsetTop;
			} else {
				return direction == 'top'
					? triggerTopPosition - contentHeight - height
					: triggerTopPosition;
			}
		};

		const ddPosition = {
			left: getLeftPos(this.props.align, this.props.noPortal),
			top: getTopPos(this.props.direction, this.props.noPortal),
		};

		this.setState(() => ({
			left: ddPosition.left,
			top: ddPosition.top,
		}));
	}

	componentDidMount() {
		this.scheduleUpdate();
		window.addEventListener('resize', this.scheduleUpdate);
		document.addEventListener('scroll', this.scheduleUpdate, true);
	}

	componentWillUnmount() {
		this.scheduleUpdate.cancel();
		window.removeEventListener('resize', this.scheduleUpdate);
		document.removeEventListener('scroll', this.scheduleUpdate, true);
	}

	render() {
		const boundedMaxWidth = this.props.media.isAtSmallUp ? '350px' : '200px';

		return (
			<ConditionalWrap
				condition={!this.props.noPortal}
				wrap={children =>
					this.props.noPortal ? (
						<div>{children}</div>
					) : (
						<Portal>{children}</Portal>
					)
				}
			>
				{this.props.children({
					left: this.state.left,
					top: this.state.top,
					align: this.state.align,
					boundedMaxWidth,
				})}
			</ConditionalWrap>
		);
	}
}

FloatingPosition.propTypes = {
	getTrigger: PropTypes.func.isRequired,
	getContent: PropTypes.func.isRequired,
};

export default withMatchMedia(FloatingPosition);
