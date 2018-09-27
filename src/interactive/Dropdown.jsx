// @flow
import React from 'react';
import cx from 'classnames';
import Downshift from 'downshift';
import FloatingPosition from '../utils/components/FloatingPosition';
import { C_COOLGRAYLIGHTTRANSP } from 'swarm-constants/dist/js/constants.js';

export const DROPDOWN_MENU_ITEM_CLASS = 'dropdownMenu-item';

type Props = {
	/** The element that opens the dropdown when clicked */
	trigger: React$Node,

	/** The content that's rendered inside the dropdown */
	content?: React$Node,

	/** An array of elements that are rendered as a menu inside the dropdown */
	menuItems?: Array<React$Element<*>>,

	/** The horizontal alignment of the dropdown content bubble to the dropdown trigger */
	align: 'left' | 'right' | 'center',

	/** Which side of the dropdown trigger the dropdown content bubble renders on */
	direction: 'top' | 'bottom',

	/** How many additional pixels to push the dropdown content bubble */
	offset?: {
		left: number,
		top: number,
	},

	/** Class names to add to the wrapper of the dropdown trigger and content */
	className?: string,

	/** Whether the dropdown content is being shown */
	isActive?: boolean,

	/** A function that is used to control the toggling of the dropdown */
	manualToggle?: (e: SyntheticKeyboardEvent<*> | SyntheticMouseEvent<*>) => void,

	/** The largest width the dropdown content can be */
	maxWidth?: string | number,

	/** The smallest width the dropdown content can be */
	minWidth?: string | number,

	/** Whether to render the dropdown content directly in the component instead of bulling it out and attaching to the document root */
	noPortal?: boolean,

	/** Props to pass to the `Downshift` component */
	downshiftProps?: Object,

	/** Whether the dropdown should close when a click on the body is registered */
	closeOnBodyClick?: boolean,

	/**  */
	onClick?: (e: SyntheticMouseEvent<*>) => void,
};

type State = {
	isActive: boolean,
};

class Dropdown extends React.PureComponent<Props, State> {
	state = {
		isActive: this.props.isActive || false,
	};

	static defaultProps = {
		direction: 'bottom',
		minWidth: '0px',
		noPortal: false,
		closeOnBodyClick: false,
	};

	closeContent = (e: SyntheticKeyboardEvent<*> | SyntheticMouseEvent<*>) => {
		if (this.props.manualToggle && this.props.isActive) {
			this.props.manualToggle(e);
		} else {
			this.setState(() => ({ isActive: false }));
		}
	};

	toggleContent = (e: SyntheticMouseEvent<*>) => {
		if (this.props.manualToggle) {
			this.props.manualToggle(e);
		} else {
			this.setState(() => ({ isActive: !this.state.isActive }));
		}
	};

	onClick = (e: SyntheticMouseEvent<*>) => {
		e.preventDefault();
		this.toggleContent(e);

		if (this.props.onClick) {
			this.props.onClick(e);
		}
	};

	onKeyDown = (e: SyntheticKeyboardEvent<*>) => {
		if (e.key === 'Enter' && this.state.isActive) {
			this.closeContent(e);
		}
	};

	onBodyClick = (e: SyntheticMouseEvent<*>) => {
		if (!this.contentRef || !this.triggerRef) {
			return;
		}

		const isNotDropdownClick = [this.contentRef, this.triggerRef].every(
			ref => !ref.contains(e.target)
		);

		if (isNotDropdownClick || (!isNotDropdownClick && this.props.closeOnBodyClick)) {
			this.closeContent(e);
		}
	};

	onBodyKeyDown = (e: SyntheticKeyboardEvent<*>) => {
		if (e.key === 'Escape') {
			this.closeContent(e);
		}
	};

	componentDidMount() {
		if (document.body) {
			document.body.addEventListener('click', this.onBodyClick);
		}
		if (document.body) {
			document.body.addEventListener('keydown', this.onBodyKeyDown);
		}
	}

	componentWillUnmount() {
		if (document.body) {
			document.body.removeEventListener('click', this.onBodyClick);
		}
		if (document.body) {
			document.body.removeEventListener('keydown', this.onBodyKeyDown);
		}
	}

	triggerRef: ?HTMLDivElement;
	contentRef: ?HTMLDivElement;

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
		delete other.closeOnBodyClick;

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
												? menuItems.map(
														(
															item: React$Element<*>,
															index
														) => {
															const {
																className,
																...other
															} = item.props;

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
																			backgroundColor:
																				highlightedIndex ===
																					index &&
																				C_COOLGRAYLIGHTTRANSP,
																		},
																		...other,
																	}),
																}
															);
														}
												  )
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

export default Dropdown;
