import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import Flex from '../layout/Flex';
import FlexItem from '../layout/FlexItem';
import Icon from '../media/Icon';

export const TOAST_CLASS = 'toast';
export const SUCCESS_TOAST_CLASS = `${TOAST_CLASS}--success`;
export const ERROR_TOAST_CLASS = `${TOAST_CLASS}--error`;
export const HIDDEN_TOAST_CLASS = `${TOAST_CLASS}--hide`;

/**
 * @module Toast
 */
class Toast extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showToast: true
		};

		this._handleDismiss = this._handleDismiss.bind(this);
	}

	_handleDismiss() {
		if (this.props.setDismissedToast) {
			this.props.setDismissedToast(this);
		}

		this.setState({
			showToast: false
		});
	}

	render() {
		const {
			children,
			className,
			message,
			action,
			actionLabel,
			dismissable,
			setDismissedToast, // eslint-disable-line no-unused-vars
			autodismiss, // eslint-disable-line no-unused-vars
			success,
			error,
			...other
		} = this.props;

		const classNames = cx(
			TOAST_CLASS,
			'inverted padding--left padding--right',
			{
				[HIDDEN_TOAST_CLASS]: !this.state.showToast,
				[SUCCESS_TOAST_CLASS]: success,
				[ERROR_TOAST_CLASS]: error
			},
			className
		);

		return (
			<span
				className={classNames}
				{...other}>
				<Flex align='center'>
					<FlexItem>{message}</FlexItem>
					{action && (
						<FlexItem shrink>
							<a href='#' onClick={action} className='toast-action'>
								{actionLabel}
							</a>
						</FlexItem>
					)}
					{dismissable && (
						<FlexItem
							shrink
							onClick={this._handleDismiss}
						>
							<Icon shape='cross' size='s' />
						</FlexItem>
					)}

				</Flex>
				{children}
			</span>
		);
	}
}

Toast.propTypes = {
	message: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.string
	]).isRequired,
	action: PropTypes.func,
	actionLabel: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.string
	]),
	dismissable: PropTypes.bool,
	autodismiss: PropTypes.bool
};

Toast.defaultProps = {
	autodismiss: true
};

export default Toast;
