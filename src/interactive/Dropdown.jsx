import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import Downshift from 'downshift';
import FloatingPosition from '../utils/components/FloatingPosition';
import {
	C_COOLGRAYLIGHTTRANSP
} from 'swarm-constants/dist/js/colorConstants.js';

import bindAll from "../utils/bindAll";

export const DROPDOWN_MENU_ITEM_CLASS = 'dropdownMenu-item';

/**
 * @module Dropdown
 */
class Dropdown extends React.PureComponent {
	constructor(props) {
		super(props);

		bindAll(
			this,
			"toggleContent",
			"closeContent",
			"onClick",
			"onKeyDown",
			"onBodyClick",
			"onBodyKeyDown"
		);

		this.state = {
			isActive: props.isActive || false,
		};

	}

	closeContent(e) {
		if (this.props.manualToggle && this.props.isActive) {
			this.props.manualToggle(e);
		} else {
			this.setState(() => ({ isActive: false }));
		}
	}

	toggleContent(e) {
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
		document.body.addEventListener("click", this.onBodyClick);
		document.body.addEventListener("keydown", this.onBodyKeyDown);
	}

	componentWillUnmount() {
		document.body.removeEventListener("click", this.onBodyClick);
		document.body.removeEventListener("keydown", this.onBodyKeyDown);
	}

	render() {
		const {
			className,
			trigger,
			content,
			align,
			offset,
			maxWidth,
			minWidth,
			noPortal,
			menuItems,
			downshiftProps,
			...other
		} = this.props;

		// Do not pass along to children
		delete other.manualToggle;
		delete other.isActive;

		const classNames = {
			dropdown: cx(
				className,
				"popup", {
					"popup--noPortal": noPortal
				}
			)
		};

		const isActive = this.props.manualToggle
			? this.props.isActive
			: this.state.isActive;

		const getTrigger = () => {
			return this.triggerRef;
		};

		const getContent = () => {
			return this.contentRef;
		};

		return (
			<Downshift
				menuItems={menuItems}
				isOpen={isActive}
				{...downshiftProps}
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
								className={cx("popup-trigger", {
									"popup-trigger--active": isOpen
								})}
								onClick={this.onClick}
							>
								{trigger}
							</div>

							{ isOpen &&
								<FloatingPosition
									getTrigger={getTrigger}
									getContent={getContent}
									noPortal={noPortal}
									align={align}
									offset={offset}
								>
									{({
										top,
										left,
										align
									}) => (
										<div
											ref={el => (this.contentRef = el)}
											className={cx("popup-content popup-bubble", {
												"popup-content--right popup-bubble--right": align === "right",
												"popup-content--left popup-bubble--left": align === "left",
												"popup-content--center popup-bubble--center": align === "center",
												"display--none": !isOpen,
												"display--block": isOpen,
												dropdownMenu: Boolean(menuItems)
											})}
											aria-hidden={!isOpen}
											style={{
												left: left,
												top: top,
												minWidth: minWidth,
												maxWidth: maxWidth
											}}
										>
											{
												menuItems
												?
													menuItems.map((item, index) => {
														const {className, ...other} = item.props;

														return React.cloneElement(
															item,
															{
																...getItemProps({
																	item,
																	key: `menuItem-${index}`,
																	className: cx(
																		className,
																		DROPDOWN_MENU_ITEM_CLASS,
																		'display--flex span--100'
																	),
																	style: {
																		backgroundColor: highlightedIndex === index && C_COOLGRAYLIGHTTRANSP
																	},
																	...other
																})
															}
														);
													})
												:
													content
											}
										</div>
									)}
								</FloatingPosition>
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
	menuItems: PropTypes.arrayOf(PropTypes.element),
	align: PropTypes.oneOf(["left", "right", "center"]).isRequired,
	offset: PropTypes.shape({
		left: PropTypes.number,
		top: PropTypes.number
	}),
	className: PropTypes.string,
	isActive: PropTypes.bool,
	manualToggle: PropTypes.func,
	maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	noPortal: PropTypes.bool,
	downshiftProps: PropTypes.object,
};

export default Dropdown;
