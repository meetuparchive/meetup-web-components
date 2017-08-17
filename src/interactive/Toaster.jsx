import CSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

export const DELAY_TIME = 3000;

/**
 * @module Toaster
 */
class Toaster extends React.PureComponent {
	constructor(props) {
		super(props);

		this.timeouts = [];
		this.dismissedToasts = [];

		this.cloneToast = this.cloneToast.bind(this);
		this.setDismissedToast = this.setDismissedToast.bind(this);
		this.clearTimeouts = this.clearTimeouts.bind(this);
		this.setTimer = this.setTimer.bind(this);

		this.state = {
			toasts: this.props.toasts.map(this.cloneToast)
		};
	}

	/**
	 * @param {Object} dismissedToast - `Toast` components to remove from state
	 * @returns undefined
	 */
	setDismissedToast(dismissedToast) {
		this.setState({
			toasts: this.state.toasts.filter(toast => dismissedToast.props.id !== toast.props.id)
		});
	}

	/**
	 * @returns undefined
	 *
	 * sets timers to delay each toast's dismissal
	 */
	setTimer() {
		const toastsToDismiss = this.state.toasts.filter((toast) => toast.props.autodismiss);

		toastsToDismiss.forEach((toast, i) => {
			this.timeouts.push(setTimeout(() => {
				this.setDismissedToast(toast);
			}, DELAY_TIME*(i+1)));
		});
	}

	/**
	 * @returns undefined
	 *
	 * removes timers in order to prevent toasts from being dismissed
	 */
	clearTimeouts() {
		this.timeouts.forEach(clearTimeout);
	}

	componentWillUnmount() {
		this.clearTimeouts();
	}

	componentDidMount() {
		this.setTimer();
	}

	/**
	 * @param {Object} Toast - `Toast` components to clone
	 * @param {number} i - index of the `toast`
	 * @returns {Array} `Toast` components with props from `Toaster`
	 */
	cloneToast(toast, i) {
		const toastProps = {
			key: i,
			id: toast.props.id || i,
			className: toast.props.className,
			action: toast.props.action,
			actionLabel: toast.props.actionLabel,
			dismissable: toast.props.dismissable,
			autodismiss: toast.props.autodismiss,
			setDismissedToast: this.setDismissedToast
		};
		return React.cloneElement(toast, toastProps);
	}

	/**
	 * @returns {Array} `Toast` components
	 */
	renderToasts() {
		this.state.toasts = this.state.toasts.map(this.cloneToast);
		return this.state.toasts;
	}

	render() {
		const {
			className,
			toasts, // eslint-disable-line no-unused-vars
			...other
		} = this.props;

		const classNames = cx(
			'toaster',
			className
		);

		return (
			<div
				className={classNames}
				onMouseEnter={this.clearTimeouts}
				onMouseLeave={this.setTimer}
				{...other}>
				<CSSTransitionGroup
					transitionAppear
					transitionAppearTimeout={0}
					transitionEnterTimeout={250}
					transitionLeaveTimeout={250}
					transitionName='slide'>
					{
						this.renderToasts().map((toast, i) => (
							toast
						))
					}
				</CSSTransitionGroup>
			</div>
		);
	}
}

Toaster.propTypes = {
	toasts: PropTypes.arrayOf(PropTypes.element).isRequired
};

export default Toaster;
