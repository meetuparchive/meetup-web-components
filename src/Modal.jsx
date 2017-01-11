import React from 'react';
import cx from 'classnames';
<<<<<<< HEAD
import { Link } from 'react-router';
import Icon from './Icon';
/**
 * @module Modal
 */
class Modal extends React.Component {

	static get contextTypes() {
		return {
			router: React.PropTypes.object,
		};
	}

	constructor(props){
		super(props);
		this._handleOutClick = this._handleOutClick.bind(this);
	}

	_handleOutClick(event){
		event.stopPropagation();
		// TODO:
		// detect if this should actually jump back in history instead of pushing forward
		// click should drop you to the underlying layer, but that's not always where you came from
		this.context.router.push(this.props.closeUrl);
=======
import Icon from './Icon';
import Button from './Button';

export const MODAL_CLOSE_BUTTON = 'modal-closeButton';

/**
 * SQ2 Modal component
 * @see {@link http://meetup.github.io/sassquatch2/views.html#modals}
 * @module Modal
 */
class Modal extends React.Component {
	constructor(props){
		super(props);
		this.onDismiss = this.onDismiss.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
	}

	onDismiss(e) {
		e.stopPropagation();

		if (this.props.onDismiss) {
			this.props.onDismiss(e);
		}
	}

	onKeyDown(e) {
		if (e.key === 'Escape') {
			this.onDismiss(e);
		}
>>>>>>> d6275df2c3cc39badacafd377316daf7f1a45f7d
	}

	render() {
		const {
<<<<<<< HEAD
			children,
			className,
			fullScreen,
			...other
		} = this.props;

		const classNames = cx(
			'modal',
			className
=======
			className,
			children,
			fullscreen,
			...other
		} = this.props;

		delete other.onDismiss; // onDismiss is consumed in this.onDismiss - do not pass it along to children

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

		const dismissButtonClasses = cx(
			MODAL_CLOSE_BUTTON,
			'border--none'
>>>>>>> d6275df2c3cc39badacafd377316daf7f1a45f7d
		);

		return (
			<div
<<<<<<< HEAD
				className={classNames}
				{...other}>
				<div className='overlayShim' onClick={this._handleOutClick}>
					<div className='overlayShim-content inverted'>
					</div>
				</div>
				<div
					className={cx(
						'view',
						{
							'view--modalFull': fullScreen,
							'view--modalSnap': !fullScreen
						}
					)}
				>
					<div className='modal-close padding--all'>
						<Link to={this.props.closeUrl}>
							<Icon shape='close' size='s' />
						</Link>
					</div>
=======
				role='dialog'
				tabIndex='0'
				onKeyDown={this.onKeyDown}
				className={classNames}
				{...other}>

				<div className='overlayShim' onClick={this.onDismiss}>
					<div className='inverted'></div>
				</div>

				<div className={modalClasses} >
					<div className='align--right'>
						<Button onClick={this.onDismiss} className={dismissButtonClasses}>
							<Icon shape='cross' size='s' />
						</Button>
					</div>

>>>>>>> d6275df2c3cc39badacafd377316daf7f1a45f7d
					{children}
				</div>
			</div>
		);
	}
}

Modal.propTypes = {
<<<<<<< HEAD
	full: React.PropTypes.bool
=======
	onDismiss: React.PropTypes.func.isRequired,
	fullscreen: React.PropTypes.bool
};

Modal.defaultProps = {
	fullscreen: false
>>>>>>> d6275df2c3cc39badacafd377316daf7f1a45f7d
};

export default Modal;
