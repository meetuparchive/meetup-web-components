import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import Button from '../forms/Button';
import Flex from '../layout/Flex';
import FlexItem from '../layout/FlexItem';
import Icon from '../media/Icon';

export const TOAST_CLASS = 'toast';
export const TOAST_ACTION_CLASS = `${TOAST_CLASS}-action`;
export const TOAST_DISMISS_BTN_CLASS = `${TOAST_CLASS}-dismissBtn`;
export const SUCCESS_TOAST_CLASS = `${TOAST_CLASS}--success`;
export const ERROR_TOAST_CLASS = `${TOAST_CLASS}--error`;
export const HIDDEN_TOAST_CLASS = `${TOAST_CLASS}--hide`;

/**
 * @module Toast
 */
class Toast extends React.PureComponent {
	constructor(props) {
		super(props);

		this.handleDismiss = this.handleDismiss.bind(this);
	}

	/**
	 * @returns undefined
	 *
	 * tells `Toaster` component which toast was clicked to be dismissed
	 */
	handleDismiss() {
		this.props.dismissToast && this.props.dismissToast(this);
		this.props.onDismiss && this.props.onDismiss(this);
	}

	render() {
		const {
			children,
			className,
			action,
			actionLabel,
			dismissable,
			dismissToast, // eslint-disable-line no-unused-vars
			autodismiss, // eslint-disable-line no-unused-vars
			onDismiss, // eslint-disable-line no-unused-vars
			success,
			error,
			...other
		} = this.props;

		const classNames = cx(
			TOAST_CLASS,
			'inverted',
			{
				[SUCCESS_TOAST_CLASS]: success,
				[ERROR_TOAST_CLASS]: error,
			},
			className
		);

		return (
			<span
				className={classNames}
				role={error ? 'alert' : 'log'}
				aria-relevant="all"
				aria-atomic="true"
				{...other}
			>
				<Flex align="center">
					<FlexItem>{children}</FlexItem>
					{action && (
						<FlexItem shrink>
							<Button reset onClick={action} className={TOAST_ACTION_CLASS}>
								{actionLabel}
							</Button>
						</FlexItem>
					)}
					{dismissable && (
						<FlexItem
							shrink
							className={TOAST_DISMISS_BTN_CLASS}
							onClick={this.handleDismiss}
						>
							<Button reset>
								<Icon shape="cross" size="s" />
							</Button>
						</FlexItem>
					)}
				</Flex>
			</span>
		);
	}
}

Toast.propTypes = {
	action: PropTypes.func,
	actionLabel: PropTypes.node,
	dismissable: PropTypes.bool,
	autodismiss: PropTypes.bool,
	onDismiss: PropTypes.func,
};

Toast.defaultProps = {
	autodismiss: true,
	dismissable: true,
};

export default Toast;
