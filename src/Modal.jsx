import React from 'react';
import cx from 'classnames';
import Icon from './Icon';
import Button from './Button';

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
	}

	render() {
		const {
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

		return (
			<div
				tabIndex='0'
				onKeyDown={this.onKeyDown}
				className={classNames}
				{...other}>

				<div className='overlayShim' onClick={this.onDismiss}>
					<div className='overlayShim-content inverted'>
					</div>
				</div>

				<div className={modalClasses} >
					<div className='align--right'>
						<Button onClick={this.onDismiss} className='modal-close border--none'>
							<Icon shape='cross' size='s' />
						</Button>
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
