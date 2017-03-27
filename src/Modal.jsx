import React from 'react';
import cx from 'classnames';
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

		this.state = {
			topPosition: '10vh' // matches default margin-top in CSS
		};
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

	/**
	 * @param {String} scrollPosition window scroll position
	 * @returns {String} CSS value for setting modal margin-top
	 */
	getModalPosition(scrollPosition) {
		const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

		if (scrollPosition < viewportHeight) {
			return this.state.topPosition;
		} else {
			return this.props.fullscreen ?
				'0px' :
				scrollPosition + 20;
		}
	}

	componentDidMount() {
		this.setState({
			topPosition: this.getModalPosition(window.pageYOffset)
		});
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

		const dismissButtonClasses = cx(
			MODAL_CLOSE_BUTTON,
			'border--none'
		);

		const overlayShim = (
			<div className='overlayShim' onClick={this.onDismiss}>
				<div className='inverted'></div>
			</div>
		);

		return (
			<div
				role='dialog'
				tabIndex='0'
				onKeyDown={this.onKeyDown}
				className={classNames}
				{...other}
			>

				{!fullscreen && overlayShim}

				<div
					className={modalClasses}
					style={{marginTop: this.state.topPosition}}
				>
					<div className='align--right'>
						<Button onClick={this.onDismiss} className={dismissButtonClasses}>
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
	onDismiss: React.PropTypes.func.isRequired,
	fullscreen: React.PropTypes.bool
};

Modal.defaultProps = {
	fullscreen: false
};

export default Modal;
