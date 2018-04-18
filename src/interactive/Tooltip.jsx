import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

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

		this.state = {
			isActive: props.isActive || false,
		};

	}

	closeContent(e) {
		this.setState(() => ({ isActive: false }));

		if (this.props.onBlur) {
			this.props.onBlur(e);
		}
		if (this.props.onMouseLeave) {
			this.props.onMouseLeave(e);
		}
	}

	openContent(e) {
		this.setState(() => ({isActive: true}));

		if (this.props.onFocus) {
			this.props.onFocus(e);
		}
		if (this.props.onMouseEnter) {
			this.props.onMouseEnter(e);
		}
	}

	onBlur(e) {
		setTimeout(() => {
			if (!this.contentRef.contains(document.activeElement)) {
				this.closeContent(e);
			}
		}, 1);
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
			id,
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

		const getTrigger = () => {
			return this.triggerRef;
		};

		return(
			<div
				className={classNames.dropdown}
				onMouseLeave={this.closeContent}
				{...other}
			>
				<div
					ref={el => (this.triggerRef = el)}
					className="dropdown-trigger"
					onFocus={this.openContent}
					onBlur={this.onBlur}
					onMouseEnter={this.openContent}
					aria-labelledby={id}
				>
					{trigger}
				</div>
				{ isActive &&
					<FloatingPosition
						getTrigger={getTrigger}
						noPortal={noPortal}
						align={align}
					>
						{({
							top,
							left
						}) => (
							<div
								ref={el => (this.contentRef = el)}
								className={cx(
									"dropdown-content dropdown-content--tooltip",
									{
										"dropdown-content--right": align === "right",
										"dropdown-content--left": align === "left",
										"dropdown-content--center": align === "center",
										"display--none": !isActive,
										"display--block": isActive,
									}
								)}
								aria-hidden={!isActive}
								id={id}
								role="tooltip"
								style={{
									left: left,
									top: top,
									minWidth: minWidth,
									maxWidth: maxWidth
								}}
							>
								<div
									className={cx(
										"dropdown-bubble dropdown-bubble--tooltip inverted",
										{
											"dropdown-bubble--active": isActive,
											"dropdown-bubble--right": align === "right",
											"dropdown-bubble--left": align === "left",
											"dropdown-bubble--center": align === "center"
										}
									)}
								>
									{content}
								</div>
							</div>
						)}
					</FloatingPosition>
				}
			</div>
		);
	}

}

Tooltip.defaultProps = {
	maxWidth: "384px",
	minWidth: "0px",
	noPortal: false
};

Tooltip.propTypes = {
	id: PropTypes.string.isRequired,
	trigger: PropTypes.element.isRequired,
	content: PropTypes.element,
	align: PropTypes.oneOf(["left", "right", "center"]).isRequired,
	className: PropTypes.string,
	isActive: PropTypes.bool,
	manualToggle: PropTypes.func,
	maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	noPortal: PropTypes.bool,
};


export default Tooltip;
