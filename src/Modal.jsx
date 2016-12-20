import React from 'react';
import cx from 'classnames';
// import { Link } from 'react-router';
import Icon from './Icon';

/**
 * @module Modal
 */
class Modal extends React.Component {

	constructor(props){
		super(props);
		this._handleOutClick = this._handleOutClick.bind(this);

		this.onDismiss = this.onDismiss.bind(this);
	}

	onDismiss(e) {
		e.stopPropagation();

		if (this.props.onDismiss) {
			this.props.onDismiss(e);
		}
		console.log('onDismiss - here for testing');
	}

	_handleOutClick(event){
		event.stopPropagation();
		// TODO:
		// detect if this should actually jump back in history instead of pushing forward
		// click should drop you to the underlying layer, but that's not always where you came from
		// this.context.router.push(this.props.closeUrl);
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
					<div className='modal-close'>
						<Icon shape='close' size='s' />
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
