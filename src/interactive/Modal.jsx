import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import FocusTrap from 'focus-trap-react';

import Icon from '../media/Icon';
import Button from '../forms/Button';
import Stripe from '../layout/Stripe';
import withLoading from '../utils/components/withLoading';
import { MEDIA_QUERIES } from '../utils/designConstants';

export const MODAL_CLOSE_BUTTON = 'modal-closeButton';
export const MODAL_CLOSE_AREA_STICKY = 'modal-closeButtonContainer--sticky';
export const MODAL_CLOSE_AREA_STICKYTRANSP =
	'modal-closeButtonContainer--stickyTransparent';
export const DEFAULT_MARGIN_TOP = '10vh';
export const MARGIN_TOP_OFFSET = 36;

/**
 * Gets `margin-top` value for vertically positioning the modal
 *
 * @param {String} scrollPosition window scroll position
 * @param {String} viewportHeight client height
 * @param {Boolean} isFullScreen true if the modal full screen
 * @param {Boolean} isFixedPosition true if the modal is on a fixed position screen
 * @param {Boolean} isMobileSize true if the viewport is below `medium` breakpoint
 *
 * @returns {String} CSS value for setting modal margin-top
 */
export const getModalPosition = (
	scrollPosition,
	viewportHeight,
	isFullScreen,
	isFixedPosition,
	isMobileSize
) => {
	// console.log('scrollPosition', scrollPosition);
	// console.log('viewportHeight', viewportHeight);
	// console.log('isFullScreen', isFullScreen);
	// console.log('isFixedPosition', isFixedPosition);
	// console.log('isMobileSize', isMobileSize);

	// full screen dialogs should be flush with top of the viewport
	if (isFullScreen) {
		return '0px';
	}

	if (isFixedPosition) {
		return isMobileSize ? scrollPosition : DEFAULT_MARGIN_TOP;
	}

	// for mobile-sized viewports, return the scroll position without a gutter
	if (isMobileSize) {
		return scrollPosition;
	}

	// set the margin-top based on scroll position unless user is above fold
	return scrollPosition > viewportHeight
		? scrollPosition + MARGIN_TOP_OFFSET
		: DEFAULT_MARGIN_TOP;
};

/**
 * SQ2 Modal component
 * @see {@link http://meetup.github.io/sassquatch2/views.html#modals}
 * @module ModalComponent
 */
export class ModalComponent extends React.Component {
	constructor(props) {
		super(props);
		this.onDismiss = this.onDismiss.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);

		this.state = {
			topPosition: DEFAULT_MARGIN_TOP, // matches default margin-top in CSS
			isMobileSize: true,
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
		const handlePositioning = () => {
			this.setState({
				topPosition: getModalPosition(
					window.pageYOffset,
					Math.max(
						document.documentElement.clientHeight,
						window.innerHeight || 0
					),
					this.props.fullscreen,
					this.props.fixed,
					this.mediaQuery && !this.mediaQuery.matches
				),
				isMobileSize: this.mediaQuery && !this.mediaQuery.matches,
			});
		};

		if (!this.props.fullscreen && typeof window.matchMedia != 'undefined') {
			this.mediaQuery = window.matchMedia(MEDIA_QUERIES.medium);

			this.handleMediaChange = () => {
				handlePositioning();
			};

			// fire on mount, _then_ listen for matchMedia changes
			this.handleMediaChange();
			this.mqListener = this.mediaQuery.addListener(this.handleMediaChange);
		} else if (this.props.fullscreen) {
			handlePositioning();
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
			fixed,
			heroBgColor,
			heroBgImage,
			heroContent,
			hideHeroScrim,
			inverted,
			closeArea,
			stickyCloseArea,
			initialFocus,
			focusTrapActive,
			loadingProps = {}, // eslint-disable-line no-unused-vars
			isLoading,
			...other
		} = this.props;

		delete other.onDismiss; // onDismiss is consumed in this.onDismiss - do not pass it along to children

		const classNames = cx(className, 'modal');

		const modalClasses = cx('view view--modal', {
			'view--modalFull': fullscreen,
			'view--modalFixed': fixed && !this.state.isMobileSize,
			'view--modalSnap': !fullscreen,
			'modal--isLoading component--isLoading': isLoading,
		});

		const overlayClasses = cx('overlayShim', {
			'overlayShim--fixed': fixed && !this.state.isMobileSize,
		});

		const dismissButtonClasses = cx(MODAL_CLOSE_BUTTON, 'button--reset');

		const heroStyles = {
			backgroundColor: heroBgColor || 'transparent',
		};

		const overlayShim = (
			<div className={overlayClasses} onClick={this.onDismiss}>
				<div className="inverted" />
			</div>
		);

		const closeElement = closeArea && (
			<div
				className={cx(
					{
						[MODAL_CLOSE_AREA_STICKY]: stickyCloseArea,
						[MODAL_CLOSE_AREA_STICKYTRANSP]:
							stickyCloseArea &&
							(Boolean(heroBgColor) || Boolean(heroBgImage)),
						'border--none':
							stickyCloseArea &&
							(Boolean(heroBgColor) || Boolean(heroBgImage)),
					},
					'padding--all modal-closeButtonContainer'
				)}
			>
				<Button onClick={this.onDismiss} reset className={dismissButtonClasses}>
					<Icon shape="cross" size="s" />
				</Button>
			</div>
		);

		return (
			<div
				role="dialog"
				tabIndex="0"
				onKeyDown={this.onKeyDown}
				className={classNames}
				{...other}
			>
				<FocusTrap
					focusTrapOptions={{
						initialFocus,
						escapeDeactivates: false,
					}}
					active={focusTrapActive}
				>
					{overlayShim}
					<div
						className={modalClasses}
						style={{
							marginTop: this.state.topPosition,
							maxHeight: fixed
								? `calc(100% - ${this.state.topPosition} * 2)`
								: 'auto',
						}}
					>
						{heroContent ? (
							<Stripe
								backgroundImage={heroBgImage}
								inverted={inverted}
								hideScrim={hideHeroScrim}
								style={heroStyles}
							>
								{closeElement}
								{heroContent}
							</Stripe>
						) : (
							closeElement
						)}

						{children}
					</div>
				</FocusTrap>
			</div>
		);
	}
}

ModalComponent.propTypes = {
	/** Whether the modal should cover the entire screen */
	fullscreen: PropTypes.bool,

	/** Whether the modal should scroll with the document */
	fixed: PropTypes.bool,

	/** Background color for the modal's hero content area */
	heroBgColor: PropTypes.string,

	/** Background image for the modal's hero content area */
	heroBgImage: PropTypes.string,

	/** Content to render in the modal's hero content area */
	heroContent: PropTypes.element,

	/** Whether to shade the modal's hero area with a text protection scrim */
	hideHeroScrim: PropTypes.bool,

	/** Whether the modal's hero area is dark instead of light */
	inverted: PropTypes.bool,

	/** Callback that happens when a user dismisses the modal */
	onDismiss: PropTypes.func.isRequired,

	/** Whether to render the close button in the top corner of the modal */
	closeArea: PropTypes.bool,

	/** Whether the close button should stick to the top of the modal when the modal is scrolled */
	stickyCloseArea: PropTypes.bool,

	/** Which element inside the modal should get focus when the Modal mounts and renders */
	initialFocus: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.func,
		PropTypes.string,
	]),

	/** Whether focus is trapped within the modal */
	focusTrapActive: PropTypes.bool,

	/** Whether the component is in a loading state */
	isLoading: PropTypes.bool,

	/** Props to pass to the `<Loading />` component */
	loadingProps: PropTypes.shape({
		color: PropTypes.string,
		scrimColor: PropTypes.string,
		size: PropTypes.string,
	}),
};

ModalComponent.defaultProps = {
	fullscreen: false,
	closeArea: true,
	focusTrapActive: true,
};

const Modal = withLoading(ModalComponent);
Modal.displayName = 'Modal';
export default Modal;
