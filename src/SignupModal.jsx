import React from 'react';
import PropTypes from 'prop-types';

/* meetup web components */
import Modal from './interactive/Modal';

/* images */
import swarmLogo from '../assets/svg/logo--mSwarm--2color.svg';
import facebookIcon from '../assets/svg/facebook.svg';
import googleIcon from '../assets/svg/google.svg';
import appleIcon from '../assets/svg/apple.svg';
import emailIcon from '../assets/svg/email.svg';

/* consts */
export const SIGNUP_MODAL_CLASS = 'meetup-signupModal';
export const SIGNUP_MODAL_WRAPPER_CLASS = `${SIGNUP_MODAL_CLASS}-wrapper`;

/**
 * @param {Object} props component properties
 * @returns {React.element} SignupModal
 */
export const SignupModal = ({
	onDismiss,
	signupOptions,
	googleOnClick,
	appleOnClick,
	facebookOnClick,
	emailOnClick,
	...other
}) => {
	const { apple, google, facebook, email, login, title } = signupOptions;
	const btnClassName =
		'tw-font-normal tw-box-border tw-border tw-border-gray2 tw-border-solid tw-p-4 tw-mb-4 tw-rounded-lg tw-flex tw-flex-row';

	return (
		<Modal className={SIGNUP_MODAL_CLASS} onDismiss={onDismiss} fixed {...other}>
			<div className={SIGNUP_MODAL_WRAPPER_CLASS}>
				<div className="tw-flex tw-flex-col tw-items-center tw-mb-8">
					<img
						alt="Meetup logo"
						src={swarmLogo}
						className="tw-mb-2"
						height="48"
						width="48"
					/>
					<h1 className="text--big tw-mb-2">{title}</h1>
					<div>
						{login.text}
						<a href={login.link} className="tw-text-viridian tw-ml-1">
							{login.label}
						</a>
					</div>
				</div>
				<a
					href={facebook.link}
					className={btnClassName}
					onClick={facebookOnClick}
				>
					<img src={facebookIcon} />
					<div className="tw-flex-grow tw-text-center">{facebook.label} </div>
				</a>
				<a href={google.link} className={btnClassName} onClick={googleOnClick}>
					<img src={googleIcon} />
					<div className="tw-flex-grow tw-text-center">{google.label} </div>
				</a>
				{apple &&
					apple.shouldRender && (
						<a
							href={apple.link}
							className={btnClassName}
							onClick={appleOnClick}
						>
							<img src={appleIcon} />
							<div className="tw-flex-grow tw-text-center">
								{apple.label}
							</div>
						</a>
					)}
				<a href={email.link} className={btnClassName} onClick={emailOnClick}>
					<img src={emailIcon} />
					<div className="tw-flex-grow tw-text-center">{email.label} </div>
				</a>
			</div>
		</Modal>
	);
};

SignupModal.propTypes = {
	/** Callback that happens when a user dismisses the modal */
	onDismiss: PropTypes.func,

	/** Ways a user can sign into Meetup (or sign up for Meetup) */
	signupOptions: PropTypes.object,
};

export default SignupModal;
