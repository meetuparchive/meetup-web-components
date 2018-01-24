import PropTypes from "prop-types";
import React from "react";
import cx from "classnames";
import { Portal } from "react-portal";
import rafSchedule from 'raf-schd';
import Downshift from 'downshift';

import bindAll from "../utils/bindAll";

const ConditionalWrap = ({condition, wrap, children}) => {
	return(condition ? wrap(children) : children);
};

const Item = ({isActive, isSelected, children}) => (
	<div
		className="dropdown-menuItem"
		style={{
			backgroundColor: isActive ? 'lightgrey' : 'white'
		}}
	>
		{children}
	</div>
);

/**
 * @module Dropdown
 */
class Dropdown extends React.PureComponent {
	constructor(props) {
		super(props);

		bindAll(
			this,
			"getContentPosition",
			"onDropshiftStateChange",
			"scheduleContentPosition"
		);

		this.scheduleUpdate = rafSchedule(
			triggerClientRect => this.getContentPosition(triggerClientRect)
		);

		this.state = {
			isActive: props.isActive || false,
			left: "0px",
			top: "0px"
		};

	}

	getContentPosition(triggerClientRect) {
		if (!this.triggerRef) {
			return;
		}

		const positionTarget = this.triggerRef.offsetParent ? this.triggerRef.offsetParent : this.triggerRef;
		const positionData = triggerClientRect || positionTarget.getBoundingClientRect();

		const {
			left,
			top,
			width,
			height
		} = positionData;

		const scrollTop = window.scrollY || window.pageYOffset;
		const scrollLeft = window.scrollX || window.pageXOffset;

		const getLeftPos = alignment => {
			switch (alignment) {
				case 'left':
					return `${left + scrollLeft}px`;
				case 'center':
					return `${(left + width / 2) + scrollLeft}px`;
				default:
					return `${left + width + scrollLeft}px`;
			}
		};

		const ddPosition = {
			left: !this.props.noPortal && getLeftPos(this.props.align),
			top: !this.props.noPortal && (scrollTop + top + height)
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

	onDropshiftStateChange(changes) {
		if (changes.isOpen) {
			this.getContentPosition();
		}
	}

	componentDidMount() {
		const positionTarget = this.triggerRef.offsetParent ? this.triggerRef.offsetParent : this.triggerRef;

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
		const {
			className,
			trigger,
			content,
			align, // eslint-disable-line no-unused-vars
			maxWidth,
			minWidth,
			noPortal,
			menuItems,
			...other
		} = this.props;

		// Do not pass along to children
		delete other.manualToggle;
		delete other.isActive;

		const classNames = {
			dropdown: cx(
				className,
				"dropdown", {
					"dropdown--noPortal": noPortal
				}
			)
		};

		return (
			<Downshift
				menuItems={menuItems}
				onStateChange={this.onDropshiftStateChange}
			>
				{({
					isOpen,
					getButtonProps,
					getItemProps,
					highlightedIndex,
					openMenu,
				}) => (
						<div
							className={classNames.dropdown}
							aria-haspopup="true"
							{...other}
						>
							<div
								ref={el => (this.triggerRef = el)}
								className={cx("dropdown-trigger", {
									"dropdown-trigger--active": isOpen
								})}
								{
									...getButtonProps({
										onClick() { () => openMenu(); }
									})
								}
							>
								{trigger}
							</div>

							{ isOpen &&
								<ConditionalWrap
									condition={!noPortal}
									wrap={children => <Portal>{children}</Portal>}
								>
									<div
										ref={el => (this.contentRef = el)}
										className={cx("dropdown-content", {
											"dropdown-content--right": align === "right",
											"dropdown-content--left": align === "left",
											"dropdown-content--center": align === "center",
											"display--none": !isOpen,
											"display--block": isOpen
										})}
										aria-hidden={!isOpen}
										style={{
											left: this.state.left,
											top: this.state.top,
											minWidth: minWidth,
											maxWidth: maxWidth
										}}
									>

										{
											menuItems
											?
												menuItems.map((item, index) => (
													<Item
														{...getItemProps({
															item,
															isActive: highlightedIndex === index,
														})}
														key={`menuItem-${index}`}
													>
														{item}
													</Item>
												))
											:
												content
										}
									</div>
								</ConditionalWrap>
							}
						</div>
					)
				}
			</Downshift>
		);
	}
}

Dropdown.defaultProps = {
	maxWidth: "384px",
	minWidth: "0px",
	noPortal: false
};

Dropdown.propTypes = {
	trigger: PropTypes.element.isRequired,
	content: PropTypes.element,
	menuItems: PropTypes.array,
	align: PropTypes.oneOf(["left", "right", "center"]).isRequired,
	className: PropTypes.string,
	isActive: PropTypes.bool,
	manualToggle: PropTypes.func,
	maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	noPortal: PropTypes.bool,
};

export default Dropdown;
