import PropTypes from 'prop-types';
import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import cx from 'classnames';
import Toast from './Toast';

export const DELAY_TIME = 3000;
const MARGINAL_DELAY = 1000; // each additional toast will wait this much longer than the previous one

/**
 * @module Toaster
 */
class Toaster extends React.PureComponent {
	constructor(props) {
		super(props);

		this.timeouts = [];

		this.cloneToast = this.cloneToast.bind(this);
		this.dismissToast = this.dismissToast.bind(this);
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
	dismissToast(dismissedToast) {
		this.setState({
			toasts: this.state.toasts.filter(toast => dismissedToast.props.id !== toast.props.id)
		});
	}

	/**
	 * @returns undefined
	 *
	 * sets timers to delay a toast's dismissal
	 */
	setTimer(toast) {

		this.timeouts.push(setTimeout(() => {
			this.dismissToast(toast);
		}, DELAY_TIME + (MARGINAL_DELAY * toast.key)));
	}

	/**
	 * @returns undefined
	 *
	 * removes timers in order to prevent toasts from being automatically dismissed
	 */
	clearTimeouts() {
		this.timeouts.forEach(clearTimeout);
	}

	componentWillUnmount() {
		this.clearTimeouts();
	}

	componentDidMount() {
		this.state.toasts && this.state.toasts.filter(t => t.props.autodismiss).map(this.setTimer);
	}

	componentWillReceiveProps(nextProps) {
		console.log(nextProps);
	}

	/**
	 * @param {Object} Toast - `Toast` components to clone
	 * @param {number} i - index of the `toast`
	 * @returns {Array} `Toast` components with props from `Toaster`
	 */
	cloneToast(toast, i) {
		const toastProps = {
			key: i,
			id: toast.props.id || `toast-${i}`,
			dismissToast: this.dismissToast
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
				<TransitionGroup>
					{
						this.renderToasts().map((toast, i) => (
							<CSSTransition
								key={i}
								appear
								timeout={250}
								classNames="slide">
								{toast}
							</CSSTransition>
						))
					}
				</TransitionGroup>
			</div>
		);
	}
}

Toaster.propTypes = {
	toasts: PropTypes.arrayOf(Toast).isRequired
};

export default Toaster;
