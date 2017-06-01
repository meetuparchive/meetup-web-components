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
			...other
		} = this.props;

		const classNames = cx(
			'toast padding--all',
			{
				'toast--hide': !this.state.showToast
			},
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
	autodismiss: React.PropTypes.bool
};

Toast.defaultProps = {
	autodismiss: true
};

export default Toast;
