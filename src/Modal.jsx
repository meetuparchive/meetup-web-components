import React from 'react';
import cx from 'classnames';
import Icon from './Icon';

/**
 * @module Modal
 */
class Modal extends React.Component {

	constructor(props){
		super(props);

		this.onDismiss = this.onDismiss.bind(this);
	}

	onDismiss(e) {
		e.stopPropagation();

		if (this.props.onDismiss) {
			this.props.onDismiss(e);
		}
		console.log('onDismiss - here for testing');
	}

	render() {
		const {
			className,
			children,
			fullscreen,
			...other
		} = this.props;

		delete other.onDismiss;

		const classNames = cx(
			className,
			'modal'
		);

		const modalClasses = cx(
			'view',
			'padding--all',
			{
				'view--modalFull': fullscreen,
				'view--modalSnap': !fullscreen
			}
		);

		return (
			<div
				className={classNames}
				{...other}>

				<div className='overlayShim' onClick={this.onDismiss}>
					<div className='overlayShim-content inverted'>
					</div>
				</div>

				<div className={modalClasses} >
					<div className='modal-close align--right'>
						<Icon onClick={this.onDismiss} shape='cross' size='s' />
					</div>

					{children}
				</div>

			</div>
		);
	}
}

Modal.propTypes = {
	fullscreen: React.PropTypes.bool
};

export default Modal;
