import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

/* meetup web components */
import Modal from './interactive/Modal';
import Chunk from './layout/Chunk';
import Flex from './layout/Flex';
import FlexItem from './layout/FlexItem';
import Icon from './media/Icon';

import googleLogo from '../assets/svg/logo_google.svg';
import appleLogo from '../assets/svg/logo_apple.svg';

import { C_MEDIUMGRAY } from 'swarm-constants/dist/js/constants';

/* consts */
export const SIGNUP_MODAL_CLASS = 'meetup-signupModal';
export const SIGNUP_MODAL_OR_CLASS = `${SIGNUP_MODAL_CLASS}-or`;
export const SIGNUP_MODAL_WRAPPER_CLASS = `${SIGNUP_MODAL_CLASS}-wrapper`;
export const SIGNUP_MODAL_FACEBOOK_CLASS = `${SIGNUP_MODAL_CLASS}-facebook`;
export const SIGNUP_MODAL_GOOGLE_CLASS = `${SIGNUP_MODAL_CLASS}-google`;
export const SIGNUP_MODAL_APPLE_CLASS = `${SIGNUP_MODAL_CLASS}-apple`;
export const SIGNUP_MODAL_EMAIL_CLASS = `${SIGNUP_MODAL_CLASS}-email`;

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
	const { apple, google, facebook, email, login, title, orLabel } = signupOptions;
	return (
		<Modal className={SIGNUP_MODAL_CLASS} onDismiss={onDismiss} fixed {...other}>
			<div className={SIGNUP_MODAL_WRAPPER_CLASS}>
				<h1 className="text--big tw-mb-2">{title}</h1>
				<Chunk>
					<div className="text--secondary display--inlineBlock marginHalf--right">
						{login.text}
					</div>
					<a
						href={login.link}
						className="padding--halfLeft link display--inlineBlock"
					>
						{login.label}
					</a>
				</Chunk>
				<Chunk className="margin--top">
					<a
						href={facebook.link}
						className={cx(
							SIGNUP_MODAL_FACEBOOK_CLASS,
							'button button--fullWidth button--hasHoverShadow padding--halfLeft text--bold text--white'
						)}
						onClick={facebookOnClick}
					>
						<Flex>
							<FlexItem shrink className="inverted">
								<Icon
									shape="external-facebook"
									size="xs"
									className="align--left"
								/>
							</FlexItem>
							<FlexItem className="flush--left">{facebook.label}</FlexItem>
						</Flex>
					</a>
				</Chunk>
				<Chunk>
					<a
						href={google.link}
						className={cx(
							SIGNUP_MODAL_GOOGLE_CLASS,
							'button button--bordered button--fullWidth padding--halfLeft text--bold'
						)}
						onClick={googleOnClick}
					>
						<Flex>
							<FlexItem shrink>
								<img src={googleLogo} className="align--left" />
							</FlexItem>
							<FlexItem className="flush--left">{google.label}</FlexItem>
						</Flex>
					</a>
				</Chunk>
				{apple &&
					apple.shouldRender && (
						<Chunk>
							<a
								href={apple.link}
								className={cx(
									SIGNUP_MODAL_APPLE_CLASS,
									'button button--bordered button--fullWidth padding--halfLeft text--bold'
								)}
								onClick={appleOnClick}
							>
								<Flex>
									<FlexItem shrink>
										<img src={appleLogo} className="align--left" />
									</FlexItem>
									<FlexItem className="flush--left">
										{apple.label}
									</FlexItem>
								</Flex>
							</a>
						</Chunk>
					)}
				<div
					className={cx(
						SIGNUP_MODAL_OR_CLASS,
						'margin--bottom align--center text--labelSecondary text--normal'
					)}
				>
					{orLabel}
				</div>
				<Chunk>
					<a
						href={email.link}
						className={cx(
							SIGNUP_MODAL_EMAIL_CLASS,
							'button button--bordered button--fullWidth padding--halfLeft text--bold'
						)}
						onClick={emailOnClick}
					>
						<Flex>
							<FlexItem shrink>
								<Icon
									shape="mail"
									size="xs"
									className="align--left"
									color={C_MEDIUMGRAY}
								/>
							</FlexItem>
							<FlexItem className="flush--left">{email.label}</FlexItem>
						</Flex>
					</a>
				</Chunk>
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
