import React from 'react';
import cx from 'classnames';
import Icon from './Icon';
import Button from './Button';
import { MEDIA_QUERIES } from './utils/designConstants';

export const MODAL_CLOSE_BUTTON = 'modal-closeButton';
export const DEFAULT_MARGIN_TOP = '10vh';
export const MARGIN_TOP_OFFSET = 36;


/**
 * Gets `margin-top` value for vertically positioning the modal
 *
 * @param {String} scrollPosition window scroll position
 * @param {String} viewportHeight client height
 * @param {Boolean} isFullScreen true if the modal full screen
 * @param {Boolean} isMobileSize true if the viewport is below `medium` breakpoint
 *
 * @returns {String} CSS value for setting modal margin-top
 */
export const getModalPosition = (scrollPosition, viewportHeight, isFullScreen, isMobileSize) => {

	// full screen dialogs should be flush with top of the viewport
	if (isFullScreen) {
		return '0px';
	}

	// for mobile-sized viewports, return the scroll position without a gutter
	if (isMobileSize) {
		return scrollPosition;
	}

	// set the margin-top based on scroll position unless user is above fold
	return scrollPosition > viewportHeight ?
		scrollPosition + MARGIN_TOP_OFFSET :
		DEFAULT_MARGIN_TOP;
};

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
			topPosition: DEFAULT_MARGIN_TOP // matches default margin-top in CSS
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

	componentDidMount() {
		if (!this.props.fullscreen && typeof window.matchMedia != 'undefined') {
			this.mediaQuery = window.matchMedia(MEDIA_QUERIES.medium);

			this.handleMediaChange = () => {
				this.setState({
					topPosition: getModalPosition(
						window.pageYOffset,
						Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
						this.props.fullscreen,
						this.mediaQuery && !this.mediaQuery.matches
					),
				});
			};

			// fire on mount, _then_ listen for matchMedia changes
			this.handleMediaChange();
			this.mqListener = this.mediaQuery.addListener(this.handleMediaChange);
		}
	}

	componentWillUnmount() {
		this.mediaQuery && this.mediaQuery.removeListener(this.handleMediaChange);
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
