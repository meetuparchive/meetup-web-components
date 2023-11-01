import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import Button from '../forms/Button';
import Icon from '../media/Icon';
import FloatingPosition from '../utils/components/FloatingPosition';

/**
 * @module Tooltip
 */
class Tooltip extends React.PureComponent {
	constructor(props) {
		super(props);

		this.onBlur = this.onBlur.bind(this);
		this.closeContent = this.closeContent.bind(this);
		this.openContent = this.openContent.bind(this);
		this.handleClose = this.handleClose.bind(this);

		this.state = {
			isActive: props.isActive || false,
		};
	}

	static getDerivedStateFromProps(nextProps, state) {
		if (nextProps.manualToggle && state.isActive !== nextProps.isActive) {
			return { isActive: nextProps.isActive };
		}
		return null;
	}

	closeContent(e) {
		if (this.props.manualToggle) {
			if (this.props.onClick) {
				this.props.onClick(e);
				return;
			}
			this.props.onClose && this.props.onClose(e);
			return;
		}

		this.setState(() => ({ isActive: false }));

		if (this.props.onBlur) {
			this.props.onBlur(e);
		}
		if (this.props.onMouseLeave) {
			this.props.onMouseLeave(e);
		}
	}

	openContent(e) {
		this.setState(() => ({ isActive: true }));

		if (this.props.onFocus) {
			this.props.onFocus(e);
		}
		if (this.props.onMouseEnter) {
			this.props.onMouseEnter(e);
		}
	}

	onBlur(e) {
		if (!this.contentRef) return;

		setTimeout(() => {
			if (!this.contentRef.contains(document.activeElement)) {
				this.closeContent(e);
			}
		}, 0);
	}

	handleClose(e) {
		if (e.key === 'Escape') {
			this.props.onClose && this.props.onClose(e);
			this.setState(() => ({ isActive: false }));
		}
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
			id,
			direction,
			manualToggle,
			withClose,
			...other
		} = this.props;

		const { isActive } = this.state;

		// Do not pass along to children
		delete other.isActive;
		delete other.onClick;

		const classNames = {
			dropdown: cx(className, 'popup', {
				'popup--noPortal': noPortal,
			}),
		};

		const getTrigger = () => {
			return this.triggerRef;
		};

		const getContent = () => {
			return this.contentRef;
		};

		return (
			<div
				className={classNames.dropdown}
				onMouseLeave={manualToggle ? undefined : this.closeContent}
				{...other}
			>
				<div
					ref={el => (this.triggerRef = el)}
					className="popup-trigger"
					onFocus={manualToggle ? undefined : this.openContent}
					onBlur={manualToggle ? undefined : this.onBlur}
					onMouseEnter={manualToggle ? undefined : this.openContent}
					aria-labelledby={isActive ? id : undefined}
					role={isActive ? 'button' : undefined}
				>
					{trigger}
				</div>
				{isActive && (
					<FloatingPosition
						getTrigger={getTrigger}
						getContent={getContent}
						noPortal={noPortal}
						align={align}
						offset={offset}
						direction={direction}
						handleClose={this.handleClose}
					>
						{({ top, left, align, boundedMaxWidth }) => (
							<div
								ref={el => (this.contentRef = el)}
								className={cx('popup-content tooltip-content', {
									'popup-content--right': align === 'right',
									'popup-content--left': align === 'left',
									'popup-content--center': align === 'center',
									'popup-content--top': direction === 'top',
									'display--none': !isActive,
									'display--block': isActive,
								})}
								aria-hidden={!isActive}
								id={id}
								role="tooltip"
								style={{
									left,
									top,
									minWidth,
									maxWidth: maxWidth || boundedMaxWidth,
								}}
							>
								<div
									className={cx(
										'popup-bubble tooltip-bubble inverted',
										{
											'popup-bubble--active': isActive,
											'popup-bubble--right': align === 'right',
											'popup-bubble--left': align === 'left',
											'popup-bubble--center': align === 'center',
											'popup-bubble--top': direction === 'top',
										}
									)}
								>
									{withClose && (
										<Button
											className="tooltip-closeBtn"
											onClick={this.closeContent}
											icon={
												<Icon
													shape="cross"
													className="text--secondary"
												/>
											}
											reset
											aria-label="Close"
											role="button"
										/>
									)}
									{content}
								</div>
							</div>
						)}
					</FloatingPosition>
				)}
			</div>
		);
	}
}

Tooltip.defaultProps = {
	direction: 'bottom',
	minWidth: '0px',
	noPortal: false,
};

Tooltip.propTypes = {
	/** The unique identifier for the Tooltip */
	id: PropTypes.string.isRequired,

	/** The element that opens the tooltip when hovered or focused */
	trigger: PropTypes.element.isRequired,

	/** The content that's rendered inside the tooltip */
	content: PropTypes.element,

	/** The horizontal alignment of the tooltip content bubble to the dropdown trigger (defaults to right) */
	align: PropTypes.oneOf(['left', 'right', 'center']),

	/** How many additional pixels to push the tooltip content bubble */
	offset: PropTypes.shape({
		left: PropTypes.number,
		top: PropTypes.number,
	}),

	/** Which side of the tooltip trigger the dropdown content bubble renders on */
	direction: PropTypes.oneOf(['top', 'bottom']).isRequired,

	/** Class names to add to the wrapper of the tooltip trigger and content */
	className: PropTypes.string,

	/** Whether the tooltip content is being shown */
	isActive: PropTypes.bool,

	/** Whether the Tooltip is a controlled component, relying on `isActive` prop for toggling */
	manualToggle: PropTypes.bool,

	/** The largest width the tooltip content can be */
	maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

	/** The smallest width the tooltip content can be */
	minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

	/** Whether to render the dropdown content directly in the component instead of bulling it out and attaching to the document root */
	noPortal: PropTypes.bool,
	/** Required function to close the dropdown when working with a manually toggled tooltip */
	onClose: (props, propName, componentName) => {
		if (
			props.manualToggle === true &&
			(props[propName] === undefined || typeof props[propName] !== 'function')
		) {
			return new Error(
				`The ${propName} function is required when manualToggle is true in this component!`
			);
		}
	},
};

export default Tooltip;
