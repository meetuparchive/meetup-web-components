import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router';
import Icon from './Icon';

/**
 * @module Modal
 */
class Modal extends React.Component {

	constructor(props){
		super(props);
		this._handleOutClick = this._handleOutClick.bind(this);
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
			closeUrl,
			children,
			fullscreen,
			...other
		} = this.props;

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

				<div className='overlayShim' onClick={this._handleOutClick}>
					<div className='overlayShim-content inverted'>
					</div>
				</div>

				<div className={modalClasses} >
					<div className='modal-close'>
						<Link to={closeUrl}>
							<Icon shape='close' size='s' />
						</Link>
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
