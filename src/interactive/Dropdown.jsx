import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import Downshift from 'downshift';
import FloatingPosition from '../utils/components/FloatingPosition';
import { C_COOLGRAYLIGHTTRANSP } from 'swarm-constants/dist/js/constants';

import bindAll from '../utils/bindAll';

export const DROPDOWN_MENU_ITEM_CLASS = 'dropdownMenu-item';

/**
 * @module Dropdown
 */
class Dropdown extends React.PureComponent {
	constructor(props) {
		super(props);

		bindAll(
			this,
			'toggleContent',
			'closeContent',
			'onClick',
			'onKeyDown',
			'onBodyClick',
			'onBodyKeyDown'
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
			this.setState(() => ({ isActive: !this.state.isActive }));
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
		if (e.key === 'Enter' && this.state.isActive) {
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
		if (e.key === 'Escape') {
			this.closeContent();
		}
	}

	componentDidMount() {
		document.body.addEventListener('click', this.onBodyClick);
		document.body.addEventListener('keydown', this.onBodyKeyDown);
	}

	componentWillUnmount() {
		document.body.removeEventListener('click', this.onBodyClick);
		document.body.removeEventListener('keydown', this.onBodyKeyDown);
	}

	render() {
		const {
			className,
			trigger,
			content,
			align,
			direction,
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
			dropdown: cx(className, 'popup', {
				'popup--noPortal': noPortal,
			}),
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
			<Downshift menuItems={menuItems} isOpen={isActive} {...downshiftProps}>
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
							className={cx('popup-trigger', {
								'popup-trigger--active': isOpen,
							})}
							onClick={this.onClick}
						>
							{trigger}
						</div>

						{isOpen && (
							<FloatingPosition
								getTrigger={getTrigger}
								getContent={getContent}
								noPortal={noPortal}
								align={align}
								offset={offset}
								direction={direction}
							>
								{({ top, left, align, boundedMaxWidth }) => (
									<div
										ref={el => (this.contentRef = el)}
										className={cx('popup-content', {
											'popup-content--right': align === 'right',
											'popup-content--left': align === 'left',
											'popup-content--center': align === 'center',
											'popup-content--top': direction === 'top',
											'display--none': !isOpen,
											'display--block': isOpen,
											dropdownMenu: Boolean(menuItems),
										})}
										aria-hidden={!isOpen}
										style={{
											left: left,
											top: top,
											minWidth: minWidth,
											maxWidth: maxWidth || boundedMaxWidth,
										}}
									>
										<div
											className={cx('popup-bubble', {
												'popup-bubble--right': align === 'right',
												'popup-bubble--left': align === 'left',
												'popup-bubble--center':
													align === 'center',
												'popup-bubble--top': direction === 'top',
											})}
										>
											{menuItems
												? menuItems.map((item, index) => {
														const {
															className,
															...other
														} = item.props;

														return React.cloneElement(item, {
															...getItemProps({
																item,
																key: `menuItem-${index}`,
																className: cx(
																	className,
																	DROPDOWN_MENU_ITEM_CLASS,
																	'display--flex span--100'
																),
																style: {
																	backgroundColor:
																		highlightedIndex ===
																			index &&
																		C_COOLGRAYLIGHTTRANSP,
																},
																...other,
															}),
														});
												  })
												: content}
										</div>
									</div>
								)}
							</FloatingPosition>
						)}
					</div>
				)}
			</Downshift>
		);
	}
}

Dropdown.defaultProps = {
	direction: 'bottom',
	minWidth: '0px',
	noPortal: false,
};

Dropdown.propTypes = {
	/** The element that opens the dropdown when clicked */
	trigger: PropTypes.element.isRequired,

	/** The content that's rendered inside the dropdown */
	content: PropTypes.element,

	/** An array of elements that are rendered as a menu inside the dropdown */
	menuItems: PropTypes.arrayOf(PropTypes.element),

	/** The horizontal alignment of the dropdown content bubble to the dropdown trigger */
	align: PropTypes.oneOf(['left', 'right', 'center']).isRequired,

	/** Which side of the dropdown trigger the dropdown content bubble renders on */
	direction: PropTypes.oneOf(['top', 'bottom']).isRequired,

	/** How many additional pixels to push the dropdown content bubble */
	offset: PropTypes.shape({
		left: PropTypes.number,
		top: PropTypes.number,
	}),

	/** Class names to add to the wrapper of the dropdown trigger and content */
	className: PropTypes.string,

	/** Whether the dropdown content is being shown */
	isActive: PropTypes.bool,

	/** A function that is used to control the toggling of the dropdown */
	manualToggle: PropTypes.func,

	/** The largest width the dropdown content can be */
	maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

	/** The smallest width the dropdown content can be */
	minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

	/** Whether to render the dropdown content directly in the component instead of bulling it out and attaching to the document root */
	noPortal: PropTypes.bool,

	/** Props to pass to the `Downshift` component */
	downshiftProps: PropTypes.object,
};

export default Dropdown;
