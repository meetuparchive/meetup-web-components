import React from 'react';
import cx from 'classnames';

/**
 * @module Toaster
 */
class Toaster extends React.Component {
	constructor(props) {
		super(props);

		this.dismissedToasts = [];
		this.cloneToast = this.cloneToast.bind(this);
		this.setDismissedToast = this.setDismissedToast.bind(this);

		this.toasts = this.props.toasts.map(this.cloneToast);
	}

	setDismissedToast(dismissedToast) {
		if (this.dismissedToasts.includes(dismissedToast)) return;
		this.dismissedToasts.push(dismissedToast);

		console.log(this.toasts);
		console.log(dismissedToast.props.id);

		// console.log(this.dismissedToasts);
		// this.setState({ dismissedToast });
	}

	/**
	 * @param {Object} accordionPanel - `AccordionPanel` components to clone
	 * @param {number} i - index of the `AccordionPanel`
	 * @param {boolean} isOpen - whether the `AccordionPanel` is open or not
	 * @returns {Array} `AccordionPanel` components with props from `AccordionPanelGroup`
	 */
	cloneToast(toast, key, isOpen) {
		const toastProps = {
			key,
			id: key,
			className: toast.props.className,
			message: toast.props.message,
			action: toast.props.action,
			actionLabel: toast.props.actionLabel,
			dismissable: toast.props.dismissable,
			setDismissedToast: this.setDismissedToast
		};
		return React.cloneElement(toast, toastProps);
	}

	/**
	 * @returns {Array} `AccordionPanel` components with the correct value for `isOpen` prop
	 */
	renderToasts() {
		this.toasts = this.toasts.map(this.cloneToast);
		return this.toasts;
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

};

export default Toaster;
