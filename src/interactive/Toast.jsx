import React from 'react';
import cx from 'classnames';

import Flex from '../layout/Flex';
import FlexItem from '../layout/FlexItem';
import Icon from '../media/Icon';

/**
 * @module Toast
 */
class Toast extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showToast: false
		};

		this.show = this.show.bind(this);
		this.dismiss = this.dismiss.bind(this);
	}

	dismiss() {
		console.log('dismissed');
		this.setState({
			showToast: false
		});
	}

	show() {
		console.log('show yourself!');
		this.setState({
			showToast: true
		}, () => {
			setTimeout(() =>
				this.setState({ showToast: false }), 3000);
		});
	}

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
			message,
			action,
			actionLabel,
			dismissable,
			...other
		} = this.props;

		const classNames = cx(
			'toast padding--all',
			className
		);

		return (
			<span
				className={classNames}
				{...other}>
					<Flex>
						<FlexItem>{message}</FlexItem>
						{action && (
							<FlexItem shrink>
								<a href='#' onClick={action} className='link'>
									{actionLabel}
								</a>
							</FlexItem>
						)}
						{dismissable && (
							<FlexItem
								shrink
								onClick={this.dismiss}
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
	message: React.PropTypes.oneOfType([
		React.PropTypes.element,
		React.PropTypes.string
	]).isRequired,
	action: React.PropTypes.func,
	actionLabel: React.PropTypes.oneOfType([
		React.PropTypes.element,
		React.PropTypes.string
	]),
	dismissable: React.PropTypes.bool,
	autoDismiss: React.PropTypes.boolean
};

export default Toast;
