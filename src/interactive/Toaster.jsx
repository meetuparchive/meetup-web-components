import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

/**
 * @module Toaster
 */
class Toaster extends React.Component {
	constructor(props) {
		super(props);

		this.timeouts = [];
		this.dismissedToasts = [];

		this.cloneToast = this.cloneToast.bind(this);
		this.setDismissedToast = this.setDismissedToast.bind(this);
		this.clearTimeouts = this.clearTimeouts.bind(this);
		this.mouseEnter = this.mouseEnter.bind(this);
		this.mouseLeave = this.mouseLeave.bind(this);

		this.state = {
			toasts: this.props.toasts.map(this.cloneToast),
			isHovered: false
		};
	}

	setDismissedToast(dismissedToast) {
		this.setState({
			toasts: this.state.toasts.filter(toast => dismissedToast.props.id !== toast.props.id)
		});
	}

	mouseEnter() {
		this.timeouts.forEach(clearTimeout);
	}

	mouseLeave() {
		this.setTimer();
	}

	setTimer() {
		const toastsToDismiss = this.state.toasts.filter((toast) => toast.props.autodismiss);

		toastsToDismiss.forEach((toast, i) => {
			this.timeouts.push(setTimeout(() => {
				this.setDismissedToast(toast);
			}, 1000*(i+1)));
		});
	}
	// end

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
			message: toast.props.message,
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
			{
				['hoveringggggg']: this.state.isHovered
			},
			className
		);

		return (
			<div
				className={classNames}
				onMouseEnter={this.mouseEnter}
				onMouseLeave={this.mouseLeave}
				{...other}>
				{
					this.renderToasts().map((toast, i) => (
						toast
					))
				}
			</div>
		);
	}
}

Toaster.propTypes = {
	toasts: PropTypes.arrayOf(PropTypes.element).isRequired
};

export default Toaster;
