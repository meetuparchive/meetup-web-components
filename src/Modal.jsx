import React from 'react';
import cx from 'classnames';
import Icon from './Icon';
import Button from './Button';
import { MEDIA_QUERIES } from './utils/designConstants';

export const MODAL_CLOSE_BUTTON = 'modal-closeButton';
const DEFAULT_MARGIN_TOP = '10vh';


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
		this.getModalPosition = this.getModalPosition.bind(this);

		this.supportsMatchMedia = typeof window.matchMedia != 'undefined';

		this.state = {
			topPosition: DEFAULT_MARGIN_TOP // matches default margin-top in CSS
		};

		if (!this.props.fullscreen && this.supportsMatchMedia) {
			this.mediaQuery = window.matchMedia(MEDIA_QUERIES.medium);

			this.handleMediaChange = mq => {
				this.setState({
					topPosition: this.getModalPosition(window.pageYOffset),
				});
			};
			this.mqListener = this.mediaQuery.addListener(this.handleMediaChange);
		}
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
		const isFullScreen = this.props.fullscreen || this.mediaQuery && !this.mediaQuery.matches;

		// check if user is scrolled below fold before setting a custom offset
		const newTopOffset = scrollPosition > viewportHeight ?
			DEFAULT_MARGIN_TOP :
			scrollPosition + 20;

		return isFullScreen ? '0px' : newTopOffset;
	}

	componentDidMount() {
		this.setState({
			topPosition: this.getModalPosition(window.pageYOffset)
		});
	}

	componentWillUnmount() {
		if (!this.props.fullscreen && this.supportsMatchMedia) {
			this.mediaQuery.removeListener(this.handleMediaChange);
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
