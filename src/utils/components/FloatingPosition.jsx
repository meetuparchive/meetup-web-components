import PropTypes from 'prop-types';
import React from 'react';
import { Portal } from 'react-portal';
import rafSchedule from 'raf-schd';

import ConditionalWrap from './ConditionalWrap';

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
			top: "0px"
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

		const {
			left,
			top,
			width,
			height
		} = positionData;

		const scrollTop = window.scrollY || window.pageYOffset;
		const scrollLeft = window.scrollX || window.pageXOffset;

		const getLeftPos = (alignment, noPortal) => {
			if (!noPortal) {
				switch (alignment) {
					case 'left':
						return `${left + scrollLeft}px`;
					case 'center':
						return `${(left + width / 2) + scrollLeft}px`;
					default:
						return `${left + width + scrollLeft}px`;
				}
			}
		};

		const getTopPos = (direction, noPortal) => {
			const triggerTopPosition = scrollTop + top + height;

			if (noPortal) {
				return direction == 'top' ? parseInt(contentHeight * -1) : triggerTopPosition;
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

		// this.props.getContent && this.getContentPosition();
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
						top: this.state.top
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
