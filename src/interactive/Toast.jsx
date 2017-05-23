import React from 'react';
import cx from 'classnames';

/**
 * @module Toast
 */
class Toast extends React.Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		showToast: false
	// 	};

	// 	this.showToast = this.showToast.bind(this);
	// }


	// componentWillReceiveProps (nextProps) {
	// 	if (this.props.showToast !== nextProps.showToast) {
	// 		this.setState({
	// 			showToast: nextProps.showToast
	// 		});
	// 	}
	// }

	// showToast() {
	// 	this.setState({
	// 		showToast: true
	// 	}, () => {
	// 		setTimeout(() =>
	// 			this.setState({ showToast: false }), 3000);
	// 	});
	// }

	render() {
		const {
			children,
			className,
			...other
		} = this.props;

		const classNames = cx(
			'toast',
			className
		);

		return (
			<span
				className={classNames}
				{...other}>
					Hello from Toast
					{children}
			</span>
		);
	}
}

Toast.propTypes = {
};

export default Toast;
