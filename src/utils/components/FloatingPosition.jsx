import PropTypes from 'prop-types';
import React from 'react';
import { Portal } from 'react-portal';
import rafSchedule from 'raf-schd';

import ConditionalWrap from './ConditionalWrap';
import withMatchMedia from './withMatchMedia';

export const ARROW_WIDTH = 19.5;

export const calcCenterAlignment = (
	distanceFromLeftEdge,
	width,
	scrollLeft,
	offsetLeft
) => {
	return `${distanceFromLeftEdge + width / 2 + scrollLeft + offsetLeft}px`;
};
export const calcRightAlignment = (
	distanceFromLeftEdge,
	width,
	arrowWidth,
	scrollLeft,
	offsetLeft
) => {
	return `${distanceFromLeftEdge + arrowWidth + width / 2 + scrollLeft + offsetLeft}px`;
};
export const calcLeftAlignment = (
	distanceFromLeftEdge,
	width,
	arrowWidth,
	scrollLeft,
	offsetLeft
) => {
	return `${distanceFromLeftEdge - arrowWidth + width / 2 + scrollLeft + offsetLeft}px`;
};

export const getAdjustedAlignment = (
	preferredAlignment,
	triggerPositionData,
	contentWidth,
	viewportWidth
) => {
	const { left, width } = triggerPositionData;
	const overflowLeft = left + width - contentWidth < 0;
	const overflowRight = left + contentWidth > viewportWidth;

	// if overflows viewport on the right side, right align the content
	if (overflowRight && !overflowLeft) {
		return 'right';
		// if overflows viewport on the left side, left align the content
	} else if (overflowLeft && !overflowRight) {
		return 'left';
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
	direction,
	offset = {},
	align = 'right',
	scrollLeft = 0,
	scrollTop = 0,
}) => {
	if (trigger && content) {
		const positionTarget = trigger().offsetParent
			? trigger().offsetParent
			: trigger();
		const positionData = positionTarget.getBoundingClientRect();
		const { left: leftPosition, top, width, height } = positionData;
		const offsetLeft = offset.left || 0;
		const offsetTop = offset.top || 0;
		const contentHeight = content().getBoundingClientRect().height;
		const contentWidth = content().getBoundingClientRect().width;
		const alignment = getAdjustedAlignment(
			align,
			positionData,
			contentWidth,
			window.innerWidth
		);
		console.log(addPortal);
		if (addPortal === false) {
			if (direction === 'top') {
				return { top: contentHeight * -1, calculatedAlignment: alignment };
			} else {
				const targetElementHeight = positionTarget.getBoundingClientRect().height;
				return {
					top: targetElementHeight + offsetTop,
					calculatedAlignment: alignment,
				};
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

				case 'left':
					left = calcLeftAlignment(
						leftPosition,
						width,
						ARROW_WIDTH,
						scrollLeft,
						offsetLeft
					);
					break;
				case 'right':
				default:
					left = calcRightAlignment(
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
			return { left, top: topPosition, calculatedAlignment: alignment };
		}
	}
};
/**
 * @module FloatingPosition
 */
class FloatingPosition extends React.PureComponent {
	static defaultProps = {
		align: 'right',
	};
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
		const { getTrigger, getContent, noPortal, direction, offset, align } = this.props;

		const scrollTop = window.scrollY || window.pageYOffset;
		const scrollLeft = window.scrollX || window.pageXOffset;

		const { left, top, calculatedAlignment } = calculateContentPosition({
			trigger: getTrigger,
			content: getContent,
			addPortal: !noPortal,
			direction,
			offset,
			align,
			scrollLeft,
			scrollTop,
		});

		this.setState(() => ({
			left,
			top,
			align: calculatedAlignment,
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
