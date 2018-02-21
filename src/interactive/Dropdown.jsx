import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { Portal } from 'react-portal';
import rafSchedule from 'raf-schd';
import Downshift from 'downshift';
import {
	C_COOLGRAYLIGHTTRANSP
} from 'swarm-constants/dist/js/colorConstants.js';

import bindAll from "../utils/bindAll";

const ConditionalWrap = ({condition, wrap, children}) => condition ? wrap(children) : children;

export const Item = ({isActive, isSelected, children}) => (
	<div
		className="dropdownMenu-item"
		style={{
			backgroundColor: isActive && C_COOLGRAYLIGHTTRANSP
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
			"scheduleContentPosition",
			"toggleContent",
			"closeContent",
			"onClick",
			"onKeyDown",
			"onBodyClick",
			"onBodyKeyDown"
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

	closeContent(e) {
		if (this.props.manualToggle && this.props.isActive) {
			this.props.manualToggle(e);
		} else {
			this.setState(() => ({ isActive: false }));
		}
	}

	toggleContent(e) {
		this.getContentPosition();

		if (this.props.manualToggle) {
			this.props.manualToggle(e);
		} else {
			this.setState(() => ({isActive: !this.state.isActive}));
		}
	}

	onClick(e) {
		e.preventDefault();
		this.toggleContent(e);

		if (this.props.onClick) {
			this.props.onClick(e);
		}
	}

	onKeyDown(e) {
		if (e.key === "Enter" && this.state.isActive) {
			this.closeContent();
		}
	}

	onBodyClick(e) {
		if (!this.contentRef || !this.triggerRef) {
			return;
		}

		const isNotDropdownClick = [this.contentRef, this.triggerRef].every(
			ref => !ref.contains(e.target)
		);

		if (isNotDropdownClick) {
			this.closeContent(e);
		}
	}

	onBodyKeyDown(e) {
		if (e.key === "Escape") {
			this.closeContent();
		}
	}

	componentDidMount() {
		const positionTarget = this.triggerRef.offsetParent ? this.triggerRef.offsetParent : this.triggerRef;

		document.body.addEventListener("click", this.onBodyClick);
		document.body.addEventListener("keydown", this.onBodyKeyDown);
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
		document.body.removeEventListener("click", this.onBodyClick);
		document.body.removeEventListener("keydown", this.onBodyKeyDown);
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

		const isActive = this.props.manualToggle
			? this.props.isActive
			: this.state.isActive;

		return (
			<Downshift
				menuItems={menuItems}
				isOpen={isActive}
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
							onKeyDown={this.onKeyDown}
							{...other}
						>
							<div
								{...getButtonProps()}
								ref={el => (this.triggerRef = el)}
								className={cx("dropdown-trigger", {
									"dropdown-trigger--active": isOpen
								})}
								onClick={this.onClick}
							>
								{trigger}
							</div>
							{ isOpen &&
								<ConditionalWrap
									condition={!noPortal}
									wrap={children => noPortal ? <div>{children}</div> : <Portal>{children}</Portal>}
								>
									<div
										ref={el => (this.contentRef = el)}
										className={cx("dropdown-content", {
											"dropdown-content--right": align === "right",
											"dropdown-content--left": align === "left",
											"dropdown-content--center": align === "center",
											"display--none": !isOpen,
											"display--block": isOpen,
											dropdownMenu: Boolean(menuItems)
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
